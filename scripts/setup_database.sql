-- Create database and user for BLUESTOCK
CREATE DATABASE bluestock_db;
CREATE USER bluestock_user WITH PASSWORD 'secure_password_123';
GRANT ALL PRIVILEGES ON DATABASE bluestock_db TO bluestock_user;

-- Connect to the database
\c bluestock_db;

-- Grant schema permissions
GRANT ALL ON SCHEMA public TO bluestock_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO bluestock_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO bluestock_user;
