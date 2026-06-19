from fastapi import HTTPException, status
from app.schemas.project import ProjectCreate, ProjectUpdate
from app.services.supabase_service import SupabaseService


class ProjectService(SupabaseService):
    def create_project(self, user_id: str, project: ProjectCreate):
        data = project.model_dump()
        data["developer_id"] = user_id
        # Ensure no None values are sent for required NOT NULL columns
        res = self.db.table("projects").insert(data).execute()
        if not res.data:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Project creation failed"
            )
        return res.data[0]

    def get_project(self, project_id: str):
        proj_res = self.db.table("projects").select("*").eq("id", project_id).execute()
        if not proj_res.data:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found")
        project = proj_res.data[0]

        # Increment visits_count atomically
        self.db.table("projects").update(
            {"visits_count": project["visits_count"] + 1}
        ).eq("id", project_id).execute()

        # Fetch developer profile
        dev_res = self.db.table("profiles").select("*").eq("id", project["developer_id"]).execute()
        developer = dev_res.data[0] if dev_res.data else None

        # Fetch screenshots
        img_res = self.db.table("project_images").select("*").eq("project_id", project_id).execute()

        return {
            "project": project,
            "developer": developer,
            "screenshots": img_res.data,
        }

    def update_project(self, project_id: str, user_id: str, update_data: ProjectUpdate):
        # Verify ownership
        proj = self.db.table("projects").select("developer_id").eq("id", project_id).execute()
        if not proj.data:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found")
        if proj.data[0]["developer_id"] != user_id:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized to update this project")

        data = update_data.model_dump(exclude_unset=True, exclude_none=True)
        if not data:
            # Nothing to update – return current state
            return self.get_project(project_id)

        res = self.db.table("projects").update(data).eq("id", project_id).execute()
        if not res.data:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Project update failed")
        return res.data[0]

    def delete_project(self, project_id: str, user_id: str):
        proj = self.db.table("projects").select("developer_id").eq("id", project_id).execute()
        if not proj.data:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found")
        if proj.data[0]["developer_id"] != user_id:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized to delete this project")

        self.db.table("projects").delete().eq("id", project_id).execute()
        return {"detail": "Project deleted successfully"}

    def get_user_projects(self, user_id: str):
        res = self.db.table("projects").select("*, profiles(username)").eq("developer_id", user_id).order("created_at", desc=True).execute()
        return res.data

    def get_all_projects(self):
        res = self.db.table("projects").select("*, profiles(username)").order("created_at", desc=True).execute()
        return res.data

    def search_projects(self, query: str = None, category: str = None, technology: str = None):
        q = self.db.table("projects").select("*, profiles(username)")
        if query:
            q = q.ilike("title", f"%{query}%")
        if category:
            q = q.eq("category", category)
        if technology:
            q = q.contains("tech_stack", [technology])
        res = q.order("created_at", desc=True).execute()
        return res.data

