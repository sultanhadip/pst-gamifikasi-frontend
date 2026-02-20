-- Initial Levels
INSERT INTO levels (level_number, experience_required, reward_diamonds) VALUES (1, 0, 0);
INSERT INTO levels (level_number, experience_required, reward_diamonds) VALUES (2, 500, 10);
INSERT INTO levels (level_number, experience_required, reward_diamonds) VALUES (3, 1200, 15);
INSERT INTO levels (level_number, experience_required, reward_diamonds) VALUES (4, 2500, 20);
INSERT INTO levels (level_number, experience_required, reward_diamonds) VALUES (5, 4500, 30);

-- Initial Titles
INSERT INTO titles (name, description, requirement) VALUES ('Novice Statistician', 'Just starting the journey', 'Register an account');
INSERT INTO titles (name, description, requirement) VALUES ('Data Enthusiast', 'Showed great interest in data', 'Complete 5 lessons');
INSERT INTO titles (name, description, requirement) VALUES ('Legendary Analyst', 'Master of statistical knowledge', 'Reach Level 10');

-- Initial Achievements
INSERT INTO achievements (name, description, icon, reward_points, required_progress, type) VALUES ('Early Bird', 'First login', 'sunrise-icon', 50, 1, 'LOGIN_COUNT');
INSERT INTO achievements (name, description, icon, reward_points, required_progress, type) VALUES ('Quiz Master', 'Complete 10 quizzes', 'trophy-icon', 200, 10, 'QUIZ_COUNT');
INSERT INTO achievements (name, description, icon, reward_points, required_progress, type) VALUES ('Knowledge Seeker', 'Read 5 publications', 'book-icon', 150, 5, 'PUBLICATION_COUNT');

-- Sample Courses
INSERT INTO courses (title, description, image_src) VALUES ('Dasar Statistika', 'Mempelajari konsep dasar peluang, distribusi, dan inferensi', '/assets/courses/stats-basics.png');
INSERT INTO courses (title, description, image_src) VALUES ('Pengenalan Bps', 'Mengenal struktur dan layanan Badan Pusat Statistik', '/assets/courses/bps-intro.png');

-- Sample Units for Course 1
INSERT INTO units (course_id, title, description, order_index, unlock_cost) VALUES (1, 'Probabilitas', 'Pengenalan konsep peluang', 1, 0);
INSERT INTO units (course_id, title, description, order_index, unlock_cost) VALUES (1, 'Distribusi Normal', 'Mempelajari kurva lonceng', 2, 50);

-- Sample Lessons for Unit 1
INSERT INTO lessons (unit_id, title, content, order_index) VALUES (1, 'Apa itu Peluang?', 'Konten teks tentang dasar peluang...', 1);
INSERT INTO lessons (unit_id, title, content, order_index) VALUES (1, 'Hukum Bilangan Besar', 'Konten teks tentang LLN...', 2);

-- Sample Missions
INSERT INTO missions (title, description, type, required_count, reward_xp, reward_diamonds) VALUES ('Pembaca Setia', 'Baca 2 publikasi hari ini', 'READ_PUBLICATION', 2, 20, 5);
INSERT INTO missions (title, description, type, required_count, reward_xp, reward_diamonds) VALUES ('Pintar Kuis', 'Selesaikan 3 kuis harian', 'COMPLETE_QUIZ', 3, 50, 10);
INSERT INTO missions (title, description, type, required_count, reward_xp, reward_diamonds) VALUES ('Eksplorasi Data', 'Lihat 1 Berita Resmi Statistik', 'READ_BRS', 1, 15, 2);
