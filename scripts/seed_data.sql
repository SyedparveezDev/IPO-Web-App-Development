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

-- Insert sample companies
INSERT INTO ipo_management_company (name, description, website, sector, created_at, updated_at) VALUES
('Adani Power', 'Power generation and distribution company', 'https://www.adanipower.com', 'Power', NOW(), NOW()),
('VBL LTD', 'Beverage manufacturing company', 'https://www.vbl.in', 'FMCG', NOW(), NOW()),
('Tata Motors', 'Automotive manufacturing company', 'https://www.tatamotors.com', 'Automotive', NOW(), NOW()),
('HDFC LTD', 'Housing finance company', 'https://www.hdfc.com', 'Financial Services', NOW(), NOW()),
('Reliance Industries', 'Conglomerate company', 'https://www.ril.com', 'Oil & Gas', NOW(), NOW()),
('Infosys', 'Information technology services', 'https://www.infosys.com', 'IT Services', NOW(), NOW()),
('ICICI Bank', 'Banking and financial services', 'https://www.icicibank.com', 'Banking', NOW(), NOW()),
('Bharti Airtel', 'Telecommunications services', 'https://www.airtel.in', 'Telecom', NOW(), NOW());

-- Insert sample IPOs
INSERT INTO ipo_management_ipo (
    company_id, issue_type, status, exchange, price_band_min, price_band_max, lot_size,
    issue_size, fresh_issue, offer_for_sale, open_date, close_date, listing_date,
    listing_price, current_market_price, listing_gain_loss, face_value, market_cap,
    retail_subscription, qib_subscription, nii_subscription, registrar, lead_managers,
    created_at, updated_at
) VALUES
(1, 'book_built', 'ongoing', 'both', 329.00, 356.00, 42, 6530.15, 4000.00, 2530.15, '2024-06-03', '2024-06-05', NULL, NULL, NULL, NULL, 10.00, NULL, 2.5, 1.8, 3.2, 'Link Intime India', 'ICICI Securities, Kotak Mahindra Capital', NOW(), NOW()),

(2, 'book_built', 'confirming', 'both', 229.00, 256.00, 58, 1350.15, 800.00, 550.15, '2024-06-03', '2024-06-05', '2018-06-10', 245.00, 280.50, 12.5, 10.00, 2500.00, 1.2, 0.9, 1.5, 'Registrar and Share Transfer Agents', 'Axis Capital, HDFC Bank', NOW(), NOW()),

(3, 'book_built', 'new_listed', 'both', 12549.00, 13600.00, 1, 13640.15, 10000.00, 3640.15, '2024-06-03', '2024-06-05', '2016-06-10', 13200.00, 14500.00, 8.7, 2.00, 45000.00, 3.8, 2.1, 4.5, 'Karvy Computershare', 'Morgan Stanley, Goldman Sachs', NOW(), NOW()),

(4, 'book_built', 'confirming', 'both', 1244.00, 1360.00, 11, 8300.15, 5000.00, 3300.15, '2024-06-03', '2024-06-05', '2020-06-11', 1320.00, 1450.00, 6.8, 2.00, 28000.00, 2.1, 1.5, 2.8, 'Link Intime India', 'Citigroup, JPMorgan', NOW(), NOW()),

(5, 'book_built', 'ongoing', 'both', 629.00, 680.00, 22, 8200.15, 6000.00, 2200.15, '2024-06-01', '2024-06-05', '2023-06-10', NULL, NULL, NULL, 10.00, NULL, 1.8, 1.2, 2.3, 'Registrar and Share Transfer Agents', 'Kotak Mahindra Capital, ICICI Securities', NOW(), NOW()),

(6, 'book_built', 'confirming', 'both', 629.00, 680.00, 22, 1300.15, 1000.00, 300.15, '2024-06-03', '2024-06-05', '2024-06-10', 665.00, 720.00, 8.3, 5.00, 3200.00, 2.5, 1.9, 3.1, 'Karvy Computershare', 'SBI Capital Markets, Axis Capital', NOW(), NOW()),

(7, 'book_built', 'new_listed', 'both', 67229.00, 73000.00, 1, 7700.15, 5500.00, 2200.15, '2024-06-03', '2024-06-05', '2027-06-10', 71000.00, 78500.00, 10.6, 10.00, 85000.00, 4.2, 3.5, 5.1, 'Link Intime India', 'HDFC Bank, ICICI Securities', NOW(), NOW()),

(8, 'book_built', 'confirming', 'both', 1629.00, 1760.00, 8, 1500.15, 1200.00, 300.15, '2024-06-03', '2024-06-05', '2022-06-10', 1720.00, 1850.00, 7.6, 5.00, 12000.00, 1.9, 1.4, 2.2, 'Registrar and Share Transfer Agents', 'Morgan Stanley, Goldman Sachs', NOW(), NOW()),

(1, 'book_built', 'new_listed', 'both', 2259.00, 2450.00, 6, 1200.15, 900.00, 300.15, '2024-06-03', '2024-06-05', '2023-06-10', 2380.00, 2650.00, 11.3, 10.00, 8500.00, 3.1, 2.8, 3.9, 'Karvy Computershare', 'Citigroup, JPMorgan', NOW(), NOW()),

(2, 'book_built', 'confirming', 'both', 329.00, 356.00, 42, 1500.15, 1100.00, 400.15, '2024-06-03', '2024-06-05', '2021-06-10', 345.00, 385.00, 11.6, 10.00, 4200.00, 2.7, 2.1, 3.4, 'Link Intime India', 'Axis Capital, HDFC Bank', NOW(), NOW());

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
