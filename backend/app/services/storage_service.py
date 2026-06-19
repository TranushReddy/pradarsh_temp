import uuid
from fastapi import UploadFile, HTTPException
from app.services.supabase_service import SupabaseService

class StorageService(SupabaseService):
    def upload_thumbnail(self, project_id: str, file: UploadFile):
        try:
            file_ext = file.filename.split('.')[-1]
            file_path = f"{project_id}/thumbnail_{uuid.uuid4().hex}.{file_ext}"
            file_bytes = file.file.read()
            
            res = self.db.storage.from_("project-thumbnails").upload(
                path=file_path,
                file=file_bytes,
                file_options={"content-type": file.content_type}
            )
            
            # Get public URL
            public_url = self.db.storage.from_("project-thumbnails").get_public_url(file_path)
            
            # Update project with new thumbnail url
            self.db.table('projects').update({'thumbnail_url': public_url}).eq('id', project_id).execute()
            
            return public_url
        except Exception as e:
            raise HTTPException(status_code=400, detail=str(e))

    def upload_screenshot(self, project_id: str, file: UploadFile):
        try:
            file_ext = file.filename.split('.')[-1]
            file_path = f"{project_id}/screenshot_{uuid.uuid4().hex}.{file_ext}"
            file_bytes = file.file.read()
            
            res = self.db.storage.from_("project-screenshots").upload(
                path=file_path,
                file=file_bytes,
                file_options={"content-type": file.content_type}
            )
            
            public_url = self.db.storage.from_("project-screenshots").get_public_url(file_path)
            
            # Save to project_images
            img_data = {
                "project_id": project_id,
                "image_url": public_url
            }
            img_res = self.db.table('project_images').insert(img_data).execute()
            
            return img_res.data[0]
        except Exception as e:
            raise HTTPException(status_code=400, detail=str(e))

    def delete_screenshot(self, image_id: str):
        # Fetch the image to get URL/Path
        img_res = self.db.table('project_images').select('*').eq('id', image_id).execute()
        if not img_res.data:
            raise HTTPException(status_code=404, detail="Image not found")
        
        image_url = img_res.data[0]['image_url']
        # Extract path from URL - this is a simplification. Usually we'd store the path or parse it.
        # URL structure: https://[project_ref].supabase.co/storage/v1/object/public/project-screenshots/[path]
        try:
            path_part = image_url.split('/project-screenshots/')[-1]
            self.db.storage.from_("project-screenshots").remove([path_part])
            
            # Delete from DB
            self.db.table('project_images').delete().eq('id', image_id).execute()
            return {"detail": "Screenshot deleted"}
        except Exception as e:
            raise HTTPException(status_code=400, detail=str(e))
