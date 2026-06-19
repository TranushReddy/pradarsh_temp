from app.database.supabase import supabase_client as supabase

class SupabaseService:
    def __init__(self):
        self.db = supabase
