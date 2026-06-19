from fastapi import HTTPException, status
from app.schemas.auth import RegisterRequest, LoginRequest
from app.services.supabase_service import SupabaseService
from supabase import create_client
from app.core.config import settings


class AuthService(SupabaseService):
    def register_user(self, req: RegisterRequest):
        """
        Create a new Supabase auth user, then update the auto-created profile
        row (via the on_auth_user_created trigger) with the chosen username.
        """
        auth_client = create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)
        try:
            res = auth_client.auth.sign_up({
                "email": req.email,
                "password": req.password,
                # Pass username via user_metadata so the DB trigger or a
                # follow-up UPDATE can persist it in public.profiles.
                "options": {
                    "data": {"username": req.username}
                }
            })
        except Exception as e:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))

        if not res.user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Registration failed – no user returned from Supabase"
            )

        # Upsert the username into public.profiles (the trigger may or may not
        # have populated it depending on your handle_new_user() function).
        try:
            self.db.table("profiles").update(
                {"username": req.username}
            ).eq("id", res.user.id).execute()
        except Exception:
            # Non-fatal: profile row may not exist yet if trigger is async.
            pass

        return res

    def login_user(self, req: LoginRequest):
        auth_client = create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)
        try:
            res = auth_client.auth.sign_in_with_password({
                "email": req.email,
                "password": req.password,
            })
        except Exception as e:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=str(e))

        if not res.session:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid credentials"
            )
        return res.session

