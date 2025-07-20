const xlsx = require('xlsx');

// List of all expected headers and their types
const expectedFields = {
  agent: 'string',
  userType: 'string',
  policy_mode: 'number',
  producer: 'string',
  policy_number: 'string',
  premium_amount_written: 'number',
  premium_amount: 'number',
  policy_type: 'string',
  company_name: 'string',
  category_name: 'string',
  policy_start_date: 'date',
  policy_end_date: 'date',
  csr: 'string',
  account_name: 'string',
  email: 'string',
  gender: 'string',
  firstname: 'string',
  city: 'string',
  account_type: 'string',
  phone: 'string',
  address: 'string',
  state: 'string',
  zip: 'string',
  dob: 'date',
  primary: 'string',
  "Applicant ID": 'string',
  agency_id: 'string',
  hasActive: 'string',
  ClientPolicy: 'string'
};

// Helper to convert Excel date to JS date string (MM/DD/YYYY)
function excelDateToJSDate(excelDate) {
  const date = new Date((excelDate - 25569) * 86400 * 1000);
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  const yyyy = date.getFullYear();
  return `${mm}/${dd}/${yyyy}`;
}

function parseXlsx(filePath) {
  const workbook = xlsx.readFile(filePath);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];//get the first sheet of the Excel file if there are multiple sheets.
  const json = xlsx.utils.sheet_to_json(sheet, { defval: '' });

  const processed = json.map(row => {
    const cleanRow = {};

    for (const key in expectedFields) {
      const type = expectedFields[key];
      const value = row[key];

      if (type === 'number') {
        const val = parseFloat(value);
        cleanRow[key] = isNaN(val) ? 0 : val;
      } else if (type === 'date') {
        cleanRow[key] = typeof value === 'number' ? excelDateToJSDate(value) : value;
      } else {
        cleanRow[key] = value !== undefined ? value : '';
      }
    }

    return cleanRow;
  });

  return processed;
}

module.exports = { parseXlsx };
