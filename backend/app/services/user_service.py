from fastapi import HTTPException, status
from app.schemas.user import UserProfileUpdate
from app.services.supabase_service import SupabaseService

class UserService(SupabaseService):
    def get_profile(self, user_id: str):
        res = self.db.table('profiles').select('*').eq('id', user_id).execute()
        if not res.data:
            raise HTTPException(status_code=404, detail="Profile not found")
        return res.data[0]

    def update_profile(self, user_id: str, profile_update: UserProfileUpdate):
        update_data = profile_update.model_dump(exclude_unset=True)
        if not update_data:
            return self.get_profile(user_id)
        
        res = self.db.table('profiles').update(update_data).eq('id', user_id).execute()
        if not res.data:
            raise HTTPException(status_code=400, detail="Profile update failed")
        return res.data[0]
