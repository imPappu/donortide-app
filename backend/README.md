
# Blood Donation System - Backend Installation

This directory contains the backend PHP files needed for the Blood Donation System.

## Installation Instructions

1. Upload all files in this directory to your cPanel hosting
2. Rename the following example files:
   - `config.php.example` to `config.php`
   - `install.php.example` to `install.php`
3. Edit `config.php` to set your database credentials
4. Access the installation wizard by visiting `https://your-domain.com/backend/install.php`
5. After installation is complete, remove or rename `install.php` for security

## File Structure

- `config.php` - Configuration settings for database, API, etc.
- `install.php` - Main entry point for installation
- `controllers/` - Contains controller classes for different functionality
- `utils/` - Utility functions for database operations, etc.

## Security Considerations

- Always use strong passwords for database and admin accounts
- Remove installation files after setup is complete
- Set proper file permissions:
  - Directories: 755
  - Files: 644
  - Configuration files: 600

## Troubleshooting

If you encounter issues during installation:

1. Check database credentials
2. Verify that PHP version is 7.4 or higher
3. Ensure all required PHP extensions are enabled
4. Check file permissions
5. Review server error logs
