# Receipt Scanner Guide

This package allows you to scan BML transfer receipts and extract structured data using OCR.

## Prerequisites
- Node.js installed (v14+)
- npm installed

## Installation
1. Clone the repository or download the package.
2. Install dependencies:
   ```bash
   npm install
   ```

## Usage

### Running Locally with Test Script
To test the scanner with the provided sample receipt:

```bash
npx ts-node test-local.ts
```

### Using in Your Code
You can import the `scanReceipt` function in your TypeScript project:

```typescript
import { scanReceipt, scanReceipts } from './src/index';

async function main() {
  // Single scan
  const data = await scanReceipt('/path/to/receipt.jpeg');
  console.log(data);

  // Bulk scan (max 10 images)
  const bulkData = await scanReceipts(['/path/to/receipt1.jpeg', '/path/to/receipt2.jpeg']);
  console.log(bulkData);
}
```

### Output Format
The scanner returns a JSON object with the following fields:
- `merchant`: "Bank of Maldives"
- `date`: Transaction date (DD/MM/YYYY HH:MM)
- `amount`: Transaction amount
- `currency`: "MVR"
- `status`: Transaction status (e.g., SUCCESS)
- `reference`: Transaction reference ID
- `from`: Sender name
- `to`: Recipient name
- `to_account`: Recipient account number (13 digits)
- `rawText`: The full raw text extracted by OCR
