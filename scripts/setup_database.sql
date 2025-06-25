-- Create database and user for IPO Admin
CREATE DATABASE ipo_admin_db;
CREATE USER ipo_admin_user WITH PASSWORD 'admin123';
GRANT ALL PRIVILEGES ON DATABASE ipo_admin_db TO ipo_admin_user;

-- Connect to the database
\c ipo_admin_db;

-- Grant schema permissions
GRANT ALL ON SCHEMA public TO ipo_admin_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO ipo_admin_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO ipo_admin_user;
