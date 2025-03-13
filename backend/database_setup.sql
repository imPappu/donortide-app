
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

-- Create donation_categories table
CREATE TABLE IF NOT EXISTS donation_categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    icon VARCHAR(50) NOT NULL,
    color VARCHAR(30) NOT NULL,
    active BOOLEAN DEFAULT TRUE,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
);

-- Create donations table
CREATE TABLE IF NOT EXISTS donations (
    id SERIAL PRIMARY KEY,
    donor_id INTEGER REFERENCES donors(id),
    request_id INTEGER REFERENCES blood_requests(id),
    category_id INTEGER REFERENCES donation_categories(id),
    title VARCHAR(255),
    description TEXT,
    amount VARCHAR(50),
    monetary_amount DECIMAL(10, 2),
    currency VARCHAR(3) DEFAULT 'USD',
    status VARCHAR(20) NOT NULL DEFAULT 'Pending',
    location VARCHAR(255),
    donation_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create index for blood type to optimize searches
CREATE INDEX IF NOT EXISTS idx_requests_blood_type ON blood_requests(blood_type);
CREATE INDEX IF NOT EXISTS idx_donors_blood_type ON donors(blood_type);
CREATE INDEX IF NOT EXISTS idx_donors_location ON donors(location);

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

-- Create blog posts table
CREATE TABLE IF NOT EXISTS blog_posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT,
    author VARCHAR(255) NOT NULL,
    image_url VARCHAR(255),
    category VARCHAR(100),
    tags TEXT[],
    published BOOLEAN DEFAULT TRUE,
    published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
);

-- Create banner/slider table
CREATE TABLE IF NOT EXISTS banners (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    image_url VARCHAR(255) NOT NULL,
    link_url VARCHAR(255),
    active BOOLEAN DEFAULT TRUE,
    display_order INTEGER DEFAULT 0,
    start_date TIMESTAMP,
    end_date TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
);

-- Create app_settings table for dynamic configurations
CREATE TABLE IF NOT EXISTS app_settings (
    id SERIAL PRIMARY KEY,
    setting_key VARCHAR(100) NOT NULL UNIQUE,
    setting_value TEXT NOT NULL,
    description TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    target_type VARCHAR(50) NOT NULL, -- 'all', 'donors', 'specific_users'
    target_data JSONB, -- Could contain user IDs, blood types, regions
    status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'sent', 'failed'
    scheduled_at TIMESTAMP,
    sent_at TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create payments table
CREATE TABLE IF NOT EXISTS payments (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    amount DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(10) NOT NULL DEFAULT 'USD',
    payment_method VARCHAR(50) NOT NULL, -- 'paypal', 'stripe', 'esewa', 'ime', 'upi'
    payment_status VARCHAR(20) NOT NULL DEFAULT 'pending', -- 'pending', 'completed', 'failed', 'refunded'
    transaction_id VARCHAR(255),
    payment_details JSONB,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
);

-- Initial app settings
INSERT INTO app_settings (setting_key, setting_value, description) VALUES
('google_admob_app_id', 'ca-app-pub-3940256099942544~3347511713', 'Google AdMob App ID (Test ID)'),
('banner_ad_id', 'ca-app-pub-3940256099942544/6300978111', 'Banner Ad ID (Test ID)'),
('maps_api_key', 'YOUR_MAPS_API_KEY', 'Google Maps API Key'),
('paypal_client_id', 'YOUR_PAYPAL_CLIENT_ID', 'PayPal Client ID for payments'),
('paypal_secret', 'YOUR_PAYPAL_SECRET', 'PayPal Secret for payments'),
('esewa_merchant_id', 'YOUR_ESEWA_MERCHANT_ID', 'eSewa Merchant ID for Nepali payments'),
('stripe_public_key', 'YOUR_STRIPE_PUBLIC_KEY', 'Stripe Public Key'),
('stripe_secret_key', 'YOUR_STRIPE_SECRET_KEY', 'Stripe Secret Key'),
('ime_pay_merchant_code', 'YOUR_IME_PAY_MERCHANT_CODE', 'IME Pay Merchant Code'),
('upi_id', 'your-upi-id@provider', 'UPI ID for payments');

-- Insert initial donation categories
INSERT INTO donation_categories (name, description, icon, color, active, display_order) VALUES
('Blood', 'Donate blood to save lives in emergency situations', 'droplet', 'bg-red-500', TRUE, 1),
('Clothing', 'Donate clean, gently used clothing for those in need', 'shirt', 'bg-blue-500', TRUE, 2),
('Food', 'Donate non-perishable food items to local food banks', 'pizza', 'bg-orange-500', TRUE, 3),
('Books', 'Donate books to schools, libraries, and literacy programs', 'book', 'bg-emerald-500', TRUE, 4),
('Essential Items', 'Donate toiletries, hygiene products, and basic necessities', 'package', 'bg-purple-500', TRUE, 5),
('Monetary', 'Make a monetary donation to support our operations', 'dollar-sign', 'bg-green-500', TRUE, 6);

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

-- Sample blog posts
INSERT INTO blog_posts (title, content, excerpt, author, category, published_at)
VALUES
('The Importance of Blood Donation', 'Long content here...', 'Why donating blood regularly can save lives and improve your health.', 'Dr. Sarah Johnson', 'Education', NOW() - INTERVAL '5 days'),
('Common Myths About Blood Donation', 'Long content here...', 'Debunking common misconceptions that prevent people from donating blood.', 'Michael Chen, RN', 'Myths & Facts', NOW() - INTERVAL '10 days'),
('How Blood Donations Are Processed', 'Long content here...', 'What happens to your blood after you donate it? Learn about the journey.', 'Laura Smith, Lab Technician', 'Behind the Scenes', NOW() - INTERVAL '15 days');

-- Sample banners
INSERT INTO banners (title, description, image_url, link_url, active, display_order)
VALUES
('Urgent Need for O- Donors', 'We are experiencing a shortage of O- blood. Please donate today!', 'https://placehold.co/600x400/red/white?text=Urgent+Need', '/donors', TRUE, 1),
('New Donor Promotion', 'First-time donors receive a free health checkup', 'https://placehold.co/600x400/blue/white?text=New+Donor+Promotion', '/register', TRUE, 2),
('Mobile Blood Drive', 'Find our mobile donation center near you', 'https://placehold.co/600x400/green/white?text=Mobile+Blood+Drive', '/locations', TRUE, 3);
