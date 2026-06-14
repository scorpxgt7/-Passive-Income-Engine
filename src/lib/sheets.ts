import { getAccessToken } from './auth';

export async function exportToGoogleSheets(projects: any[]) {
  const token = await getAccessToken();
  if (!token) throw new Error("No access token available. Please sign in.");

  // 1. Create a new Spreadsheet
  const createRes = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      properties: {
        title: `Revenue Projections ${new Date().toLocaleDateString()}`
      }
    })
  });
  
  if (!createRes.ok) throw new Error("Failed to create spreadsheet.");
  const sheetData = await createRes.json();
  const spreadsheetId = sheetData.spreadsheetId;
  const sheetTitle = sheetData.sheets?.[0]?.properties?.title || 'Sheet1';

  // 2. Prepare data payload
  const values = [
    ['Project Name', 'Client', 'Est. Completion', 'Value (₱)', 'Status'],
    ...projects.map(p => [p.name, p.client, p.completionDate, p.value, p.status])
  ];

  // 3. Update the spreadsheet with our data
  const updateRes = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(sheetTitle)}!A1:E?valueInputOption=USER_ENTERED`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      range: `${sheetTitle}!A1:E`,
      values: values
    })
  });

  if (!updateRes.ok) throw new Error("Failed to write data to spreadsheet.");

  return `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`;
}
