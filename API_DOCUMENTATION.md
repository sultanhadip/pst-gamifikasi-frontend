# API Documentation - StatLegend Backend

Dokumentasi ini mencakup seluruh endpoint API yang tersedia pada backend StatLegend, beserta contoh request dan response.

**Base URL:** `http://localhost:8080`

---

## 1. Authentication (`/api/auth`)

### Login

- **Endpoint:** `POST /api/auth/login`
- **Description:** Autentikasi pengguna dan mendapatkan JWT Token.
- **Request Body:**
  ```json
  {
    "username": "user123",
    "password": "password123"
  }
  ```
- **Response:**
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiJ9...",
    "type": "Bearer",
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "username": "user123",
    "email": "user@example.com",
    "roles": ["ROLE_USER"]
  }
  ```

### Register

- **Endpoint:** `POST /api/auth/register`
- **Description:** Mendaftarkan akun pengguna baru.
- **Request Body:**
  ```json
  {
    "name": "Full Name",
    "username": "user123",
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response:**
  ```json
  {
    "message": "User registered successfully!"
  }
  ```

---

## 2. User Profile & Progress (`/api`)

### Get Current User Profile

- **Endpoint:** `GET /api/me`
- **Headers:** `Authorization: Bearer <token>`
- **Response:**
  ```json
  {
    "id": "550e8400...",
    "username": "user123",
    "email": "user@example.com",
    "name": "Full Name",
    "image": "profile_url",
    "diamonds": 10,
    "streaks": 5,
    "levelId": 1,
    "activeCourseId": 1,
    "role": "USER",
    "banned": false
  }
  ```

### Update Profile

- **Endpoint:** `PATCH /api/me/update`
- **Headers:** `Authorization: Bearer <token>`
- **Request Body:**
  ```json
  {
    "name": "New Name",
    "image": "new_image_url"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Profile updated successfully!"
  }
  ```

### Set Active Course

- **Endpoint:** `PATCH /api/me/active-course?courseId=1`
- **Headers:** `Authorization: Bearer <token>`
- **Response:**
  ```json
  {
    "message": "Active course updated!"
  }
  ```

### Get My Progress

- **Endpoint:** `GET /api/me/progress`
- **Headers:** `Authorization: Bearer <token>`
- **Response:**
  ```json
  {
    "points": 1200,
    "publications": 5,
    "press": 3,
    "quizzes": 10
  }
  ```

---

## 3. Learning Content (`/api/courses`)

### Get All Courses

- **Endpoint:** `GET /api/courses`
- **Response:**
  ```json
  [
    {
      "id": 1,
      "title": "Dasar-Dasar Statistik",
      "description": "Belajar statistik dari nol",
      "imageSrc": "image_url"
    }
  ]
  ```

### Get Units by Course

- **Endpoint:** `GET /api/courses/{courseId}/units`
- **Response:**
  ```json
  [
    {
      "id": 1,
      "title": "Materi 1",
      "description": "Deskripsi materi",
      "orderIndex": 1,
      "unlockCost": 0,
      "isLocked": false
    }
  ]
  ```

### Unlock Unit

- **Endpoint:** `POST /api/courses/units/unlock`
- **Request Body:**
  ```json
  {
    "unitId": 2
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Unit unlocked successfully!"
  }
  ```

### Submit Quiz Answer

- **Endpoint:** `POST /api/courses/lessons/challenges/submit`
- **Request Body:**
  ```json
  {
    "challengeId": 1,
    "selectedOptionId": 3
  }
  ```
- **Response:**
  ```json
  {
    "correct": true,
    "pointsEarned": 50,
    "message": "Jawaban benar!"
  }
  ```

---

## 4. Activities (`/api/activity`)

### Read Publication

- **Endpoint:** `POST /api/activity/publications/{id}/read`
- **Response:**
  ```json
  {
    "message": "Publication read! XP Awarded."
  }
  ```

### Read BRS

- **Endpoint:** `POST /api/activity/brs/{id}/read`
- **Response:**
  ```json
  {
    "message": "BRS read! XP Awarded."
  }
  ```

---

## 5. Gamification (`/api/gamification`)

### Get Daily Missions

- **Endpoint:** `GET /api/gamification/missions/daily`
- **Response:**
  ```json
  [
    {
      "id": 1,
      "mission": {
        "title": "Baca 1 Publikasi",
        "requiredCount": 1,
        "rewardXp": 10
      },
      "currentCount": 1,
      "isCompleted": true,
      "isClaimed": false
    }
  ]
  ```

---

## 6. Admin Panel (`/api/admin`)

_(Requires ROLE_ADMIN)_

### Get All Users

- **Endpoint:** `GET /api/admin/users`
- **Response:**
  ```json
  [
    {
      "id": "uuid",
      "username": "user1",
      "role": "USER",
      "banned": false
    }
  ]
  ```

### Ban User

- **Endpoint:** `PATCH /api/admin/users/{id}/ban`
- **Response:**
  ```json
  {
    "message": "User banned successfully!"
  }
  ```

### Unban User

- **Endpoint:** `PATCH /api/admin/users/{id}/unban`
- **Response:**
  ```json
  {
    "message": "User unbanned successfully!"
  }
  ```

---

## 7. Media (`/api/media`)

### Upload Avatar

- **Endpoint:** `POST /api/media/upload-avatar`
- **Description:** Mengunggah foto profil baru untuk pengguna.
- **Request (Multipart Form Data):**
  - `file`: File gambar
  - `userId`: UUID pengguna
- **Response:**
  ```json
  {
    "message": "Avatar uploaded successfully: <filename>"
  }
  ```
