-- Insert sample tasks
INSERT INTO tasks_task (title, description, priority, status, created_at, updated_at, due_date) VALUES
('Setup Development Environment', 'Install Python, Django, and configure PostgreSQL database', 'high', 'completed', NOW() - INTERVAL '2 days', NOW() - INTERVAL '2 days', NOW() + INTERVAL '1 day'),
('Create User Authentication', 'Implement user registration and login functionality', 'high', 'in_progress', NOW() - INTERVAL '1 day', NOW(), NOW() + INTERVAL '3 days'),
('Design Database Schema', 'Create models for tasks, users, and categories', 'medium', 'completed', NOW() - INTERVAL '3 days', NOW() - INTERVAL '3 days', NOW() - INTERVAL '1 day'),
('Build REST API Endpoints', 'Create CRUD operations for task management', 'high', 'in_progress', NOW() - INTERVAL '1 day', NOW(), NOW() + INTERVAL '2 days'),
('Frontend Integration', 'Connect HTML/JS frontend with Django REST API', 'medium', 'pending', NOW(), NOW(), NOW() + INTERVAL '4 days'),
('Add Task Filtering', 'Implement search and filter functionality', 'low', 'pending', NOW(), NOW(), NOW() + INTERVAL '5 days'),
('Write Unit Tests', 'Create comprehensive test suite for the application', 'medium', 'pending', NOW(), NOW(), NOW() + INTERVAL '6 days'),
('Deploy to Production', 'Setup production server and deploy application', 'high', 'pending', NOW(), NOW(), NOW() + INTERVAL '7 days');

-- Insert sample users (passwords are hashed, these are just examples)
-- Note: In real application, users should register through the API

-- Create a test user (password: testpass123)
INSERT INTO authentication_user (
    password, 
    last_login, 
    is_superuser, 
    username, 
    first_name, 
    last_name, 
    email, 
    is_staff, 
    is_active, 
    date_joined, 
    full_name, 
    is_email_verified, 
    created_at, 
    updated_at
) VALUES (
    'pbkdf2_sha256$600000$test$hash', 
    NULL, 
    false, 
    'testuser@bluestock.in', 
    '', 
    '', 
    'testuser@bluestock.in', 
    false, 
    true, 
    NOW(), 
    'Test User', 
    true, 
    NOW(), 
    NOW()
);
