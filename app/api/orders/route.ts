import { NextResponse } from 'next/server'
import { google } from 'googleapis'
import { OrderData } from '@/lib/google-sheets'

const SPREADSHEET_ID = '1CwKLE5LgCP4IUx0yT6eSnKOpGzFHzeIVdg6ZYZ4LlAo'

async function getGoogleSheetsClient() {
  const auth = new google.auth.GoogleAuth({
    credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY || '{}'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets']
  })
  const sheets = google.sheets({ version: 'v4', auth })
  return sheets
}

export async function POST(request: Request) {
  try {
    const orderData: OrderData = await request.json()
    const sheets = await getGoogleSheetsClient()
    
    console.log('Saving order to Google Sheets:', orderData)
    
    // Append order to the "Orders" sheet
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Orders!A:I',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [
          [
            orderData.orderId,
            orderData.customerName || '',
            orderData.phoneNumber || '',
            orderData.deliveryAddress || '',
            orderData.deliveryTime || 'ASAP',
            JSON.stringify(orderData.items),
            orderData.totalPrice,
            orderData.status,
            orderData.timestamp
          ]
        ]
      }
    })

    console.log('Order saved successfully to Google Sheets')
    
    return NextResponse.json({ 
      success: true, 
      orderId: orderData.orderId,
      message: 'Order saved successfully' 
    })
  } catch (error) {
    console.error('Error saving order to Google Sheets:', error)
    return NextResponse.json(
      { error: 'Failed to save order to Google Sheets' },
      { status: 500 }
    )
  }
}
