from supabase import create_client, Client
from app.core.config import settings

# Create a single shared Supabase client using the service role key from .env.
# The service role key is a standard HS256 JWT, so no monkey-patching is needed.
supabase_client: Client = create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)
