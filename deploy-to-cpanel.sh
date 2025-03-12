
#!/bin/bash

# Blood Donation System - cPanel Deployment Script
# This script automates the process of building and deploying the application to a cPanel hosting environment

# Configuration - EDIT THESE VALUES
FTP_HOST="your-cpanel-host.com"       # Your cPanel hostname
FTP_USER="your-username"              # Your cPanel username
FTP_PASS="your-password"              # Your cPanel password
REMOTE_DIR="public_html"              # Remote directory (usually public_html or a subdirectory)
DB_CONFIG_FILE="src/services/apiConfig.ts"  # Path to your database configuration file

# Colors for better readability
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}=== Blood Donation System cPanel Deployment ===${NC}"

# 1. Check if required tools are installed
echo -e "\n${YELLOW}Checking required tools...${NC}"
if ! command -v npm &> /dev/null; then
    echo -e "${RED}Error: npm is not installed${NC}"
    exit 1
fi

if ! command -v lftp &> /dev/null; then
    echo -e "${RED}Error: lftp is not installed. Please install it:${NC}"
    echo "  For Ubuntu/Debian: sudo apt-get install lftp"
    echo "  For macOS with Homebrew: brew install lftp"
    exit 1
fi

# 2. Update API configuration for production
echo -e "\n${YELLOW}Updating API configuration for production...${NC}"
if [ -f "$DB_CONFIG_FILE" ]; then
    # Prompt for production API URL
    read -p "Enter your production API URL (e.g., https://yourdomain.com/backend): " API_URL
    
    # Create a backup of the original file
    cp "$DB_CONFIG_FILE" "${DB_CONFIG_FILE}.bak"
    
    # Update the API URL in the configuration file
    sed -i.tmp "s|const API_BASE_URL = '.*'|const API_BASE_URL = '$API_URL'|g" "$DB_CONFIG_FILE"
    rm -f "${DB_CONFIG_FILE}.tmp"
    
    echo -e "${GREEN}API configuration updated successfully${NC}"
else
    echo -e "${RED}Error: API configuration file not found at $DB_CONFIG_FILE${NC}"
    exit 1
fi

# 3. Build the React application
echo -e "\n${YELLOW}Building the application...${NC}"
npm install
npm run build

if [ $? -ne 0 ]; then
    echo -e "${RED}Error: Build failed${NC}"
    # Restore the original configuration file
    cp "${DB_CONFIG_FILE}.bak" "$DB_CONFIG_FILE"
    exit 1
fi

echo -e "${GREEN}Build completed successfully${NC}"

# 4. Check if backend files exist and copy them to the build directory
echo -e "\n${YELLOW}Preparing backend files...${NC}"
if [ -d "backend" ]; then
    # Create backend directory in build
    mkdir -p build/backend
    
    # Copy API files
    if [ -f "backend/api.php.example" ]; then
        cp backend/api.php.example build/backend/api.php
        echo -e "${GREEN}Copied API file${NC}"
    fi
    
    # Copy installation files
    if [ -f "backend/install.php.example" ]; then
        cp backend/install.php.example build/backend/install.php
        echo -e "${GREEN}Copied installation file${NC}"
    fi
    
    # Copy SQL database setup
    if [ -f "backend/database_setup.sql" ]; then
        cp backend/database_setup.sql build/backend/
        echo -e "${GREEN}Copied database setup file${NC}"
    fi
else
    echo -e "${YELLOW}Warning: Backend directory not found. Make sure to upload backend files manually.${NC}"
fi

# 5. Create .htaccess file for React routing
echo -e "\n${YELLOW}Creating .htaccess file for React routing...${NC}"
cat > build/.htaccess << 'EOF'
# Handle React routing
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME} !-l
  RewriteRule . /index.html [L]
</IfModule>

# Set PHP version (uncomment and adjust if needed)
# <IfModule mod_php.c>
#   AddHandler application/x-httpd-php74 .php
# </IfModule>
EOF

echo -e "${GREEN}.htaccess file created${NC}"

# 6. Upload files to cPanel using lftp
echo -e "\n${YELLOW}Uploading files to cPanel...${NC}"
echo -e "Host: $FTP_HOST"
echo -e "User: $FTP_USER"
echo -e "Remote directory: $REMOTE_DIR"

# Create lftp script
cat > lftp_script.txt << EOF
set ssl:verify-certificate no
open -u $FTP_USER,$FTP_PASS $FTP_HOST
mirror -R build/ $REMOTE_DIR
bye
EOF

# Run lftp with the script
lftp -f lftp_script.txt

if [ $? -ne 0 ]; then
    echo -e "${RED}Error: Upload failed${NC}"
    # Restore the original configuration file
    cp "${DB_CONFIG_FILE}.bak" "$DB_CONFIG_FILE"
    rm -f lftp_script.txt
    exit 1
fi

# Clean up
rm -f lftp_script.txt
echo -e "${GREEN}Files uploaded successfully${NC}"

# 7. Restore original development configuration
echo -e "\n${YELLOW}Restoring development configuration...${NC}"
cp "${DB_CONFIG_FILE}.bak" "$DB_CONFIG_FILE"
rm -f "${DB_CONFIG_FILE}.bak"

echo -e "\n${GREEN}Deployment completed successfully!${NC}"
echo -e "Your application should now be accessible at http://$FTP_HOST/"
echo -e "Run the installation wizard by visiting http://$FTP_HOST/install"
echo -e "\n${YELLOW}Post-Deployment Tasks:${NC}"
echo -e "1. Verify that the application is working correctly"
echo -e "2. Set proper file permissions (755 for directories, 644 for files)"
echo -e "3. After installation, remove or rename install.php for security"
echo -e "4. Configure your database settings through the admin panel"
