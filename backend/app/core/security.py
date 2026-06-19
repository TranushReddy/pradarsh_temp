from jose import jwt, jwk, JWTError
import httpx
from app.core.config import settings


def decode_supabase_token(token: str) -> dict | None:
    """
    Decode and verify a Supabase-issued JWT.

    Supabase supports two signing algorithms:
    - HS256  – older projects / service-role tokens signed with SUPABASE_JWT_SECRET
    - ES256  – newer projects using asymmetric keys; public keys fetched from JWKS endpoint
    """
    try:
        header = jwt.get_unverified_header(token)
        alg = header.get("alg", "HS256")

        if alg == "HS256":
            payload = jwt.decode(
                token,
                settings.SUPABASE_JWT_SECRET,
                algorithms=["HS256"],
                options={"verify_aud": False},
            )
        elif alg == "ES256":
            jwks_url = f"{settings.SUPABASE_URL}/auth/v1/.well-known/jwks.json"
            response = httpx.get(jwks_url, timeout=10)
            response.raise_for_status()
            jwks = response.json()

            kid = header.get("kid")
            key_data = next((k for k in jwks["keys"] if k["kid"] == kid), None)
            if not key_data:
                return None

            public_key = jwk.construct(key_data)
            payload = jwt.decode(
                token,
                public_key,
                algorithms=["ES256"],
                options={"verify_aud": False},
            )
        else:
            return None

        return payload

    except JWTError as e:
        print(f"[security] Token decode error: {e}")
        return None
    except Exception as e:
        print(f"[security] Unexpected error during token verification: {e}")
        return None
