# BML Receipt Scanner

A simple OCR-based scanner for Bank of Maldives transfer receipts.

## Features
- Extracts transaction details: Amount, Reference, Date, Sender, Recipient, Status.
- Uses `tesseract.js` for OCR.
- Written in TypeScript.

## Quick Start

```bash
npm install
npx ts-node test-local.ts
```

## API

### `scanReceipt(imagePath: string): Promise<ReceiptData>`

Scans the image at the given path and returns a promise that resolves to the receipt data.

### `scanReceipts(imagePaths: string[]): Promise<ReceiptData[]>`

Scans multiple images (max 10) in parallel and returns an array of receipt data.

```typescript
interface ReceiptData {
  merchant?: string;
  date?: string;
  amount?: string;
  currency?: string;
  status?: string;
  reference?: string;
  from?: string;
  to?: string;
  to_account?: string;
  rawText: string;
}
```
