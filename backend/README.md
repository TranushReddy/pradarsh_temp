# Pradarsh Backend

This is the FastAPI backend for **Pradarsh**, an App Showcase Platform.

## Features
- Supabase PostgreSQL for DB
- Supabase Auth for JWT authentication
- Supabase Storage for project screenshots and thumbnails
- FastAPI for high performance REST APIs

## Setup Instructions

1. **Clone the repository**

2. **Navigate to backend folder**
   ```bash
   cd backend
   ```

3. **Create virtual environment and install dependencies**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

4. **Environment Variables**
   Make sure you have a `.env` file in the `backend` folder with the following:
   ```
   SUPABASE_URL=your_supabase_url
   SUPABASE_KEY=your_supabase_anon_or_service_key
   SUPABASE_JWT_SECRET=your_supabase_jwt_secret
   API_V1_STR=/api
   PROJECT_NAME=Pradarsh
   ```

5. **Database Setup**
   Run the SQL script provided in `database_schema.sql` inside your Supabase project's SQL Editor to create tables and policies.

6. **Run the server**
   ```bash
   uvicorn app.main:app --reload
   ```

7. **API Documentation**
   Open `http://localhost:8000/docs` to view the interactive Swagger UI and test the endpoints.
