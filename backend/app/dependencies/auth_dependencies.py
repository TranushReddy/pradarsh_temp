from fastapi import HTTPException, Security, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from app.core.security import decode_supabase_token

security = HTTPBearer()


def get_current_user(
    credentials: HTTPAuthorizationCredentials = Security(security),
) -> dict:
    """
    Validate the Bearer JWT issued by Supabase and return the decoded payload.

    The payload contains at minimum:
        - sub  : the user's UUID (same as auth.users.id and profiles.id)
        - email: the user's email
        - role : "authenticated" for end-users, "service_role" for service keys
    """
    token = credentials.credentials
    payload = decode_supabase_token(token)

    if payload is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired authentication token",
            headers={"WWW-Authenticate": "Bearer"},
        )

    # Supabase stores the user UUID in the `sub` claim; expose it as `id`
    # so downstream code can use current_user["id"] uniformly.
    if "id" not in payload and "sub" in payload:
        payload["id"] = payload["sub"]

    return payload
