import { NextResponse } from 'next/server'
import { google } from 'googleapis'

const SPREADSHEET_ID = '1CwKLE5LgCP4IUx0yT6eSnKOpGzFHzeIVdg6ZYZ4LlAo'

async function getGoogleSheetsClient() {
  const auth = new google.auth.GoogleAuth({
    credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY || '{}'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly']
  })
  const sheets = google.sheets({ version: 'v4', auth })
  return sheets
}

export async function GET() {
  try {
    const sheets = await getGoogleSheetsClient()
    
    // Fetch menu data from the "Menu" sheet
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Menu!A2:Z', // Start from row 2 to skip headers
    })

    const rows = response.data.values || []
    
    // Convert rows to menu items
    const menuData = rows.map((row, index) => {
      return {
        id: parseInt(row[0]) || index + 1,
        name: row[1] || '',
        basePrice: parseFloat(row[2]) || 0,
        image: row[3] || '/images/menu/default.jpg',
        description: row[4] || '',
        category: row[5] || 'other',
        variations: {
          sizes: row[6] ? JSON.parse(row[6]) : [],
          spiceLevels: row[7] ? JSON.parse(row[7]) : [],
          toppings: row[8] ? JSON.parse(row[8]) : []
        }
      }
    })

    return NextResponse.json(menuData)
  } catch (error) {
    console.error('Error fetching menu data from Google Sheets:', error)
    return NextResponse.json(
      { error: 'Failed to fetch menu data from Google Sheets' },
      { status: 500 }
    )
  }
}
