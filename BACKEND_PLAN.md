# Dokumen Perencanaan Backend & Database - PST Gamifikasi

Dokumen ini berisi rancangan teknis untuk pembangunan aplikasi backend berdasarkan desain database logis dan fisik yang telah disediakan.

## 1. Ringkasan Sistem
Aplikasi ini adalah platform e-learning tergamifikasi yang melibatkan materi pembelajaran berjenjang, sistem poin (XP), pengelolaan level, pencapaian (*achievements*), dan gelar (*titles*).

---

## 2. Struktur Database (Schema)
Berdasarkan Gambar 1 & 2, berikut adalah pendefinisian tabel utama:

### A. Pengguna & Autentikasi
*   **User**: Informasi profil, saldo diamond, level saat ini, dan status akun (banned/active).
*   **Account**: Relasi ke provider OAuth/Credentials.
*   **Session**: Manajemen token login aktif.
*   **Verification**: Token untuk verifikasi email/reset password.

### B. Konten Pembelajaran (Learning Hierarchy)
1.  **Courses**: Katalog kursus utama.
2.  **Units**: Bab dalam kursus (Memiliki `unlock_cost`).
3.  **Lessons**: Materi dalam bab.
4.  **Challenges**: Pertanyaan/kuis di dalam materi.
5.  **ChallengeOptions**: Pilihan jawaban untuk kuis.

### C. Gamifikasi & Progres
*   **Levels**: Definisi batas XP untuk setiap level.
*   **Achievements**: Pencapaian yang bisa diraih (terbagi dalam `achievement_types`).
*   **Titles**: Gelar yang bisa dipasang di profil (memiliki `title_requirements`).
*   **UserDailyProgress**: Statistik harian (XP, publikasi yang dibaca, kuis selesai).
*   **UserTotalProgress**: Akumulasi total seluruh aktivitas.

---

## 3. Relasi Kunci (Key Relationships)
*   **User ↔ Levels**: Many-to-One (Satu level dimiliki banyak user).
*   **User ↔ Achievements**: Many-to-Many via `user_achievements` (Melacak progres tiap pencapaian).
*   **Unit ↔ Course**: Many-to-One.
*   **Lesson ↔ Unit**: Many-to-One.
*   **Challenge ↔ Lesson**: Many-to-One.
*   **User ↔ Titles**: Many-to-Many via `user_titles`.

---

## 4. Proses Bisnis Utama

### 1. Alur Peningkatan Level (XP Logic)
Setiap user menyelesaikan *Challenge* atau membaca publikasi:
1.  Backend menambah poin di `user_daily_progress` dan `user_total_progress`.
2.  Sistem mengecek tabel `levels` apakah total XP user sudah mencapai batas `experience_required` berikutnya.
3.  Jika terpenuhi, `user.level_id` diperbarui.

### 2. Mekanisme Unlock Unit
1.  User meminta akses ke Unit tertentu.
2.  Backend mengecek `user.diamonds` vs `unit.unlock_cost`.
3.  Jika cukup, diamonds dikurangi dan record baru ditambahkan ke `user_unit_unlock`.

### 3. Perhitungan Streak
1.  Setiap kali user aktif (menyelesaikan materi), backend mengecek `last_streak_date`.
2.  Jika hari ini adalah H+1 dari `last_streak_date`, `streaks` bertambah.
3.  Jika lewat dari 1 hari, `streaks` direset ke 1.

### 4. Klaim Gelar (Titles)
1.  Sistem mengecek `title_requirements` (apakah user sudah memiliki achievement tertentu atau mencapai level tertentu).
2.  Jika syarat terpenuhi, user dapat mengaktifkan gelar tersebut di `user_titles`.

---

## 5. Rancangan API (Endpoints)

### Modul Pengguna
*   `GET /api/me`: Ambil profil lengkap (level, XP, diamonds, titles).
*   `PATCH /api/me/update`: Update foto atau username.
*   `GET /api/leaderboard`: Ambil user dengan XP terbanyak.

### Modul Belajar
*   `GET /api/courses`: List semua kursus.
*   `GET /api/courses/:id/units`: List bab (dengan status apakah sudah di-unlock).
*   `POST /api/units/unlock`: Request membuka bab menggunakan diamond.
*   `GET /api/lessons/:id/challenges`: Ambil soal kuis.
*   `POST /api/challenges/submit`: Kirim jawaban, dapatkan XP/Diamonds.

### Modul Aktivitas (BPS & Publikasi)
*   `POST /api/activity/press`: Mencatat interaksi dengan data BRS.
*   `POST /api/activity/publication`: Mencatat pembacaan publikasi.

---

## 6. Strategi Implementasi (Roadmap)

1.  **Tahap 1: Setup Database**: Migrasi schema berdasarkan ERD Fisik (Gambar 2).
2.  **Tahap 2: Core Auth**: Implementasi registrasi, login, dan manajemen session.
3.  **Tahap 3: CMS Materi**: Membuat API untuk admin mengisi Courses, Units, dan Challenges.
4.  **Tahap 4: Gamification Engine**: Pembuatan fungsi otomatis untuk hitung level, XP, dan cek achievement.
5.  **Tahap 5: API Integration**: Menghubungkan frontend Angular yang sudah ada dengan backend baru.

---

## 7. Rekomendasi Stack
*   **Language**: TypeScript (Agar konsisten dengan Angular Anda).
*   **Framework**: **NestJS** (Sangat disarankan karena polanya mirip Angular).
*   **ORM**: **Prisma** (Paling mudah untuk memetakan relasi kompleks seperti gambar Anda).
*   **Database**: **PostgreSQL**.

---

## 8. Detail Logika & Alur Bisnis API

Bagian ini merincikan alur kerja backend untuk mendukung fitur-fitur utama di frontend:

### 1. Autentikasi Pengguna (Login/Daftar)
*   **Endpoint**: `POST /api/auth/login` atau `POST /api/auth/register`
*   **Alur Kerja**:
    1.  **Input**: Kredensial (Email/Username dan Password).
    2.  **Validasi**:
        *   Cek apakah user terdaftar di tabel `users`.
        *   Bandingkan password input dengan hash password di database.
    3.  **Berhasil**:
        *   Generate **JWT Token** atau buat session baru di tabel `session`.
        *   Kirim token & data user dasar ke frontend.
        *   Frontend menyimpan token (LocalStorage/Cookie) dan mengarahkan user ke halaman utama.
    4.  **Gagal**: Kirim status 401 dengan pesan error "Email atau Password salah".

### 2. Ubah Profil Pengguna
*   **Endpoint**: `PATCH /api/me/update`
*   **Alur Kerja**:
    1.  **Akses**: User membuka halaman profil, sistem memanggil `GET /api/me`.
    2.  **Pengeditan**: User mengisi form (Nama, Username, dll) dan menekan 'Simpan'.
    3.  **Proses Backend**:
        *   Terima data baru dan validasi formatnya.
        *   Cek unikitas untuk username/email jika diubah.
    4.  **Hasil**:
        *   Jika Valid: Update record di tabel `users` dan kirim respon sukses 200.
        *   Jika Tidak Valid: Kirim respon 400 dengan keterangan field yang error.

### 3. Ganti (Reset) Password
*   **Endpoint**: `POST /api/auth/forgot-password` dan `POST /api/auth/reset-password`
*   **Alur Kerja**:
    1.  **Permintaan**: User memasukkan email di halaman login.
    2.  **Token**: Backend membuat token unik sementara, menyimpannya di tabel `verification`, dan mengirim email berisi link khusus.
    3.  **Reset**: User mengklik link, memasukkan password baru di frontend.
    4.  **Update**:
        *   Backend memvalidasi token (cek masa berlaku).
        *   Jika valid, simpan password baru (di-hash) ke database.
        *   Hapus token dari tabel `verification`.
        *   Arahkan user kembali ke halaman login.

### 4. Pembelajaran dan Kuis
*   **Endpoint**: `GET /api/lessons/:id/challenges` & `POST /api/challenges/submit`
*   **Alur Kerja**:
    1.  **Materi**: User memilih materi dari peta belajar. Sistem menampilkan konten (teks/video).
    2.  **Interaksi Kuis**:
        *   User menjawab soal satu per satu.
        *   Backend menerima jawaban dan membandingkan dengan `challenge_options`.
    3.  **Poin (XP)**:
        *   Jika Benar: Catat progres di `challenge_progress` dan tambahkan poin ke `user_daily_progress`.
        *   Jika Salah: Berikan opsi mencoba lagi atau tampilkan jawaban yang benar.
    4.  **Selesai**: Tampilkan ringkasan skor dan total poin yang didapat setelah soal terakhir dijawab.

### 5. Buka Materi Pembelajaran Terkunci
*   **Endpoint**: `POST /api/units/unlock`
*   **Alur Kerja**:
    1.  **Pengecekan**: User memilih materi bertanda gembok. Sistem menampilkan `unlock_cost` (diamond).
    2.  **Transaksi**:
        *   Backend memeriksa saldo `user.diamonds`.
        *   Jika Saldo >= Biaya: Kurangi saldo user, masukkan record ke `user_unit_unlock`.
        *   Status materi berubah menjadi terbuka (unlocked).
    3.  **Feedback**:
        *   Berhasil: Materi terbuka dan user bisa mulai belajar.
        *   Gagal: Tampilkan peringatan "Diamonds tidak mencukupi".

### 6. Pilih Kursus Aktif
*   **Endpoint**: `PATCH /api/me/active-course`
*   **Alur Kerja**:
    1.  **Tampilan**: User melihat daftar semua kursus (`GET /api/courses`). Sistem menandai kursus yang saat ini aktif berdasarkan `user.active_course_id`.
    2.  **Pemilihan**: User memilih kursus baru.
    3.  **Update**:
        *   Backend memperbarui kolom `active_course_id` pada tabel `users`.
    4.  **Feedback**: User diarahkan ke area pembelajaran (peta belajar) khusus untuk kursus yang dipilih.

### 7. Interaksi dengan Publikasi (Data Statistik)
*   **Endpoint**: `GET /api/publications` & `POST /api/activity/publication`
*   **Alur Kerja**:
    1.  **Akses**: User memilih publikasi dari daftar.
    2.  **Opsi**: Sistem menampilkan detail publikasi, dokumen PDF, dan opsi kuis terkait.
    3.  **Aktivitas**:
        *   **Baca PDF**: Jika user membuka PDF, backend mencatat di `user_publication` dan memberikan poin kecil.
        *   **Kerja Kuis**: Jika user menyelesaikan kuis publikasi, backend memproses skor dan memberikan reward poin/diamond yang lebih besar.
    4.  **Hadiah**: Seluruh poin/reward otomatis memperbarui `user_daily_progress` dan `user_total_progress`.

### 8. Interaksi dengan BRS (Berita Resmi Statistik)
*   **Endpoint**: `GET /api/brs` & `POST /api/activity/press`
*   **Alur Kerja**:
    1.  **Akses**: User memilih BRS dari daftar.
    2.  **Opsi**: Sistem menampilkan detail, pilihan lihat PDF, atau lihat slide presentasi.
    3.  **Pencatatan**:
        *   Setiap interaksi (klik PDF/Slide) dikirim ke backend.
        *   Backend mencatat riwayat interaksi di tabel `user_press`.
    4.  **Reward**: User mendapatkan poin XP atas partisipasi mengeksplorasi data BRS.

### 9. Lihat Papan Peringkat (Leaderboard)
*   **Endpoint**: `GET /api/leaderboard`
*   **Alur Kerja**:
    1.  **Request**: User membuka tab peringkat.
    2.  **Query**:
        *   Backend mengambil data dari `user_total_progress`.
        *   Data diurutkan (`ORDER BY points DESC`).
    3.  **Data**: Mengirimkan daftar user berisi: `username`, `avatar`, `level`, dan `total_points`.
    4.  **Tampilan**: Frontend meranking user dari nomor 1 hingga terbawah.

### 10. Misi Harian (Daily Missions)
*   **Endpoint**: `GET /api/me/daily-missions` & `POST /api/me/claim-daily-reward`
*   **Alur Kerja**:
    1.  **Cek Progres**: Sistem membandingkan data di `user_daily_progress` hari ini dengan target misi (misal: "Selesaikan 3 kuis").
    2.  **Status**: Menampilkan persentase kemajuan tiap kuis ke user.
    3.  **Penyelesaian**: Jika semua indikator misi sudah mencapai target:
        *   Backend mengecek apakah hadiah harian sudah diklaim hari ini.
        *   Jika belum, user dapat menekan tombol klaim.
    4.  **Reward**: Tambahkan `diamonds` ke akun user dan tandai misi hari ini sebagai 'Selesai & Diklaim'.

### 11. Pencapaian (Achievements)
*   **Endpoint**: `GET /api/me/achievements`
*   **Alur Kerja**:
    1.  **Request**: User membuka halaman pencapaian.
    2.  **Query & Kalkulasi**:
        *   Backend mengambil daftar semua pencapaian dari tabel `achievements`.
        *   Backend mengambil data kemajuan user dari tabel `user_achievements`.
        *   Sistem menghitung status untuk setiap pencapaian:
            *   **Diraih**: `is_completed = true`.
            *   **Dalam Proses**: `current_progress > 0` dan `current_progress < required_progress`.
            *   **Belum Dimulai**: `current_progress = 0`.
    3.  **Data**: Mengirimkan daftar pencapaian lengkap dengan ikon, deskripsi, progres, dan statusnya.
    4.  **Tampilan**: Frontend menampilkan daftar lencana/badge dengan pembedaan visual berdasarkan status.

### 12. Pemilihan Gelar (Titles)
*   **Endpoint**: `GET /api/me/titles` & `PATCH /api/me/set-title`
*   **Alur Kerja**:
    1.  **Request**: User masuk ke pengaturan profil dan memilih "Ubah Gelar".
    2.  **Penyajian**:
        *   Backend mengambil daftar gelar yang sudah terbuka (unlocked) dari tabel `user_titles`.
        *   Sistem menandai gelar mana yang saat ini sedang aktif (`is_active = true`).
    3.  **Pemilihan Gelar**:
        *   User memilih gelar yang sudah terbuka atau memilih untuk melepas gelar aktif.
    4.  **Update di Backend**:
        *   **Aktivasi**: Validasi gelar benar-benar milik user -> Nonaktifkan gelar lain (`is_active = false`) -> Set gelar terpilih menjadi aktif (`is_active = true`).
        *   **Pelepasan**: Set semua gelar user menjadi `is_active = false`.
    5.  **Hasil**: Update tampilan profil user dan berikan pesan konfirmasi sukses.

### 13. Admin CMS (Management)
*   **Endpoint**: `POST/PUT/DELETE /api/admin/...`
*   **Alur Kerja**:
    1.  **Otorisasi**: Backend mengecek role user via JWT. Hanya user dengan `role: 'admin'` yang diizinkan.
    2.  **Manajemen Konten**: Admin bisa menambah, mengedit, atau menghapus materi belajar.
    3.  **Moderasi User**: Admin bisa mencari user, melihat statistik detail mereka, dan melakukan "Ban" jika melanggar ketentuan.

### 14. Pencarian User (Search Widget)
*   **Endpoint**: `GET /api/users/search?q=query`
*   **Alur Kerja**:
    1.  Backend mencari kecocokan nama/username di tabel `users` (partial match).
    2.  Mengembalikan daftar user publik (nama, avatar, level).

### 15. Manajemen Media (Upload)
*   **Endpoint**: `POST /api/upload`
*   **Alur Kerja**:
    1.  Menerima file (multipart/form-data) dari frontend.
    2.  Validasi tipe file (JPG/PNG untuk avatar, PDF untuk materi).
    3.  Simpan file ke server/cloud storage.
    4.  Mengembalikan URL file untuk disimpan di database.

### 16. Logout (Sign Out)
*   **Endpoint**: `POST /api/auth/logout`
*   **Alur Kerja**:
    1.  Hapus session aktif dari tabel `session` berdasarkan token yang dikirim.
    2.  Frontend menghapus token dari penyimpanan lokal.

---

## 5. Rancangan API (Endpoints) - Updated

### Modul Pengguna & Auth
*   `POST /api/auth/login`, `POST /api/auth/register`, `POST /api/auth/logout`
*   `POST /api/auth/forgot-password`, `POST /api/auth/reset-password`
*   `GET /api/me`, `PATCH /api/me/update`, `POST /api/me/add-password`
*   `GET /api/users/search?q=...`

### Modul Belajar & Gamifikasi
*   `GET /api/courses`, `PATCH /api/me/active-course`
*   `GET /api/courses/:id/units`, `POST /api/units/unlock`
*   `GET /api/lessons/:id/challenges`, `POST /api/challenges/submit`
*   `GET /api/leaderboard`, `GET /api/me/achievements`, `GET /api/me/daily-missions`
*   `PATCH /api/me/set-title`, `POST /api/me/claim-daily-reward`

### Modul Admin & Utilities
*   `POST /api/upload` (Upload multimedia)
*   `GET/POST/PUT/DELETE /api/admin/courses` (CRUD Kursus)
*   `GET/POST/PUT/DELETE /api/admin/units` (Bab)
*   `GET/POST/PUT/DELETE /api/admin/lessons` (Materi)
*   `GET/POST/PUT/DELETE /api/admin/challenges` (Soal)
*   `GET /api/admin/users`, `PATCH /api/admin/users/:id/ban` (Moderasi)

---

## 9. Arsitektur Proses Bisnis Keseluruhan (High-Level)

Berdasarkan perancangan proses bisnis pada Gambar 4, berikut adalah alur kerja utuh sistem StatLegend:

### A. Fase Persiapan (Lajur Admin)
Admin bertanggung jawab sebagai penyedia infrastruktur belajar dan kompetisi:
1.  **Kelola Konten**: Admin memasukkan materi belajar (Courses, Units, Lessons) ke sistem.
2.  **Kelola Gamifikasi**: Admin menentukan variabel poin, mendefinisikan level, membuat daftar misi, dan mendesain lencana/gelar yang bisa didapatkan.

### B. Fase Interaksi (Lajur User & Sistem)
Setelah sistem siap, user berinteraksi dengan dua jalur utama:
1.  **Jalur Pembelajaran Internal**:
    *   User mengakses materi -> Sistem menyajikan konten materi.
    *   User mengerjakan kuis -> Sistem memvalidasi jawaban.
2.  **Jalur Eksplorasi Data (Eksternal/BPS)**:
    *   User memilih Publikasi/BRS -> **Sistem mengambil data dari API BPS**.
    *   User berinteraksi dengan data tersebut (Membaca/Menganalisis).

### C. Fase Gamifikasi Otomatis (Lajur Sistem)
Setiap aktivitas dari Fase B akan memicu trigger otomatis di backend:
1.  **Recording**: Sistem mencatat kemajuan aktivitas user di tabel terkait (`challenge_progress`, `user_publication`, dll).
2.  **Rewarding**: Sistem menghitung perolehan poin (XP), menambahkan mata uang virtual (diamond), atau memberikan lencana jika syarat tercapai.
3.  **Leveling**: Akumulasi XP secara otomatis dicek terhadap tabel `levels` untuk menaikkan level user.

### D. Fase Monitoring & Feedback (Lajur User)
User dapat memantau hasil dari usahanya melalui menu-menu khusus:
1.  **Dashboard Progres**: Melihat misi harian, lencana yang terkumpul, dan status level saat ini.
2.  **Papan Peringkat**: Melihat posisi kompetitif dibandingkan pengguna lain.
3.  **Personalisasi**: Menggunakan gelar atau mengganti avatar hasil dari reward yang didapat.

### E. Penutup
Alur berakhir ketika pengguna melakukan **Logout**, yang akan menghapus session di server dan mengamankan status terakhir progres pengguna.

---

## 10. Pedoman Kualitas Kode & Implementasi (High Quality Code)

Gunakan pedoman ini untuk memastikan backend yang dibangun (menggunakan Spring Boot, NestJS, atau lainnya) memiliki standar industri:

### 1. Arsitektur Berlapisan (Layered Architecture)
Pisahkan logika aplikasi menjadi 3 lapisan utama:
*   **Controller**: Menangani request HTTP & routing (Hanya validasi input dasar).
*   **Service**: Berisi **Business Logic** utama (Perhitungan XP, pengecekan streak, dll).
*   **Repository/DAO**: Berhubungan langsung dengan database.

### 2. Keamanan (Security First)
*   **Hash Password**: Jangan pernah simpan plain text. Gunakan `bcrypt` atau `argon2`.
*   **JWT Security**: Pastikan token memiliki masa berlaku (exp) dan simpan rahasia di `.env`.
*   **Input Validation**: Gunakan DTO (Data Transfer Object) untuk memvalidasi setiap data yang masuk (misal: email harus format email).
*   **CORS**: Atur agar hanya URL frontend Angular Anda yang bisa mengakses API.

### 3. Integritas Data Gamifikasi (Atomic Operations)
Karena sistem melibatkan poin dan saldo (diamonds), pastikan:
*   **Database Transaction**: Gunakan transaksi (ACID) saat melakukan update saldo vs histori (misal: `kurangi diamond` DAN `buka materi` harus sukses bersamaan, jika satu gagal, batalkan keduanya).
*   **Concurrency**: Hindari *race conditions* saat user mengerjakan kuis berkali-kali secara simultan.

### 4. Penanganan Error (Standardized Error Response)
Gunakan format error yang konsisten agar frontend mudah menanganinya:
```json
{
  "status": "error",
  "message": "Saldo diamond tidak mencukupi",
  "code": "INSUFFICIENT_FUNDS"
}
```

### 5. Dokumentasi API Otomatis
Implementasikan **Swagger/OpenAPI** agar Anda bisa mengetes API secara visual dan memudahkan integrasi dengan frontend Angular tanpa harus membaca source code backend.

### 6. Logging & Monitoring
Catat setiap aksi krusial (seperti Admin yang mem-ban user atau transaksi diamond besar) ke dalam log file untuk kebutuhan audit dan debugging jika terjadi masalah.
