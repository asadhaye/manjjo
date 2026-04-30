// Test script for Google Sheets API integration
// Run with: node test-google-sheets.js

const { google } = require('googleapis');

// Load service account key from environment variable
const serviceAccountKey = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;

if (!serviceAccountKey) {
  console.error('❌ ERROR: GOOGLE_SERVICE_ACCOUNT_KEY environment variable not set');
  console.log('Please set it in your .env.local file');
  process.exit(1);
}

const SPREADSHEET_ID = '1CwKLE5LgCP4IUx0yT6eSnKOpGzFHzeIVdg6ZYZ4LlAo';

async function testGoogleSheetsConnection() {
  try {
    console.log('🔍 Testing Google Sheets API connection...\n');
    
    // Parse service account key
    const credentials = JSON.parse(serviceAccountKey);
    console.log('✅ Service account key loaded');
    console.log(`   Project: ${credentials.project_id}`);
    console.log(`   Client Email: ${credentials.client_email}\n`);
    
    // Create Google Sheets client
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly']
    });
    
    const sheets = google.sheets({ version: 'v4', auth });
    console.log('✅ Google Sheets client created\n');
    
    // Test fetching menu data
    console.log('📊 Fetching menu data from Google Sheets...');
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Menu!A2:Z',
    });
    
    const rows = response.data.values || [];
    console.log(`✅ Successfully fetched ${rows.length} rows from Menu sheet\n`);
    
    if (rows.length > 0) {
      console.log('📋 Sample menu data (first 3 rows):');
      rows.slice(0, 3).forEach((row, index) => {
        console.log(`   Row ${index + 1}: ID=${row[0]}, Name=${row[1]}, Price=${row[2]}, Category=${row[5]}`);
      });
    } else {
      console.log('⚠️  No data found in Menu sheet');
    }
    
    console.log('\n✅ Google Sheets API integration is working correctly!');
    console.log('🚀 Your application should be able to fetch menu data dynamically.\n');
    
  } catch (error) {
    console.error('\n❌ ERROR: Google Sheets API connection failed');
    console.error('Error details:', error.message);
    
    if (error.code === 403) {
      console.error('\n🔧 Possible fixes:');
      console.error('   1. Ensure the Google Sheet is shared with: manjjo-app@manjjo.iam.gserviceaccount.com');
      console.error('   2. Give the service account "Editor" permissions');
      console.error('   3. Enable Google Sheets API in Google Cloud Console');
    } else if (error.code === 401) {
      console.error('\n🔧 Possible fixes:');
      console.error('   1. Check that your service account key is valid');
      console.error('   2. Ensure the key has not expired');
    }
    
    process.exit(1);
  }
}

testGoogleSheetsConnection();
