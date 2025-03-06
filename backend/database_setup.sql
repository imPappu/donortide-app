
-- PostgreSQL setup script for blood donation application

-- Create blood_requests table
CREATE TABLE IF NOT EXISTS blood_requests (
    id SERIAL PRIMARY KEY,
    patient_name VARCHAR(255) NOT NULL,
    blood_type VARCHAR(5) NOT NULL,
    hospital VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    contact_number VARCHAR(20) NOT NULL,
    urgency VARCHAR(20) NOT NULL DEFAULT 'Standard',
    notes TEXT,
    status VARCHAR(20) NOT NULL DEFAULT 'Pending',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
);

-- Create donors table
CREATE TABLE IF NOT EXISTS donors (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    blood_type VARCHAR(5) NOT NULL,
    location VARCHAR(255) NOT NULL,
    contact_number VARCHAR(20) NOT NULL,
    last_donation TIMESTAMP,
    availability_weekdays BOOLEAN DEFAULT FALSE,
    availability_weekends BOOLEAN DEFAULT FALSE, 
    availability_mornings BOOLEAN DEFAULT FALSE,
    availability_evenings BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
);

-- Create index for blood type to optimize searches
CREATE INDEX IF NOT EXISTS idx_requests_blood_type ON blood_requests(blood_type);
CREATE INDEX IF NOT EXISTS idx_donors_blood_type ON donors(blood_type);
CREATE INDEX IF NOT EXISTS idx_donors_location ON donors(location);

-- Create donations table to track actual donations
CREATE TABLE IF NOT EXISTS donations (
    id SERIAL PRIMARY KEY,
    donor_id INTEGER REFERENCES donors(id),
    request_id INTEGER REFERENCES blood_requests(id),
    donation_date TIMESTAMP NOT NULL,
    amount VARCHAR(10) NOT NULL DEFAULT '450ml',
    location VARCHAR(255) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'Completed',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create users table for authentication (if needed)
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'user',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP
);

-- Add some sample data
INSERT INTO donors (name, blood_type, location, contact_number, last_donation)
VALUES 
('John Doe', 'A+', 'New York, NY', '+1 (555) 123-4567', NOW() - INTERVAL '4 months'),
('Jane Smith', 'O-', 'Boston, MA', '+1 (555) 987-6543', NOW() - INTERVAL '2 months'),
('Robert Johnson', 'B+', 'Chicago, IL', '+1 (555) 456-7890', NOW() - INTERVAL '6 months'),
('Sarah Williams', 'AB+', 'Los Angeles, CA', '+1 (555) 789-0123', NOW() - INTERVAL '1 month');

-- Sample blood requests
INSERT INTO blood_requests (patient_name, blood_type, hospital, location, contact_number, urgency, notes)
VALUES
('Emily Johnson', 'O-', 'Memorial Hospital', 'New York, NY', '+1 (555) 111-2222', 'Urgent', 'Needed for emergency surgery'),
('Michael Brown', 'A+', 'General Hospital', 'Boston, MA', '+1 (555) 333-4444', 'Standard', 'Scheduled transfusion'),
('David Wilson', 'B-', 'City Medical Center', 'Chicago, IL', '+1 (555) 555-6666', 'High', 'Cancer treatment');
