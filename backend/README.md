# Backend - Anime Streaming Platform

## How to Run

1. Install Java 17+ and Maven.
2. Configure MongoDB (local or Atlas).
3. Build and run the Spring Boot app:
   ```bash
   mvn spring-boot:run
   ```
4. Access Swagger UI at: http://localhost:8080/swagger-ui.html

## Admin Operations
- Use Swagger UI to add, edit, or delete anime movies.
- Initial database is seeded with 2 anime movies.

## Environment Variables
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret for JWT authentication

## Project Structure
- `src/main/java/.../model` - Entity classes
- `src/main/java/.../controller` - REST controllers
- `src/main/java/.../repository` - MongoDB repositories
- `src/main/java/.../security` - Security config (JWT, roles)
- `src/main/java/.../config` - Swagger and other configs

## Endpoints
- `/api/auth/*` - User login/signup
- `/api/anime/*` - Anime catalog (admin CRUD, user browse)
- `/api/user/*` - Watchlist, favorites

---

For more, see Swagger UI docs after running the backend.
