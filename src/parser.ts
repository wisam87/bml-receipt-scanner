import { ReceiptData, ReceiptItem } from './index';

export function parseReceipt(text: string): Partial<ReceiptData> {
    const data: Partial<ReceiptData> = {};

    // Clean up text
    const lines = text.split('\n').map(l => l.trim()).filter(l => l);

    // Extract Amount
    // Look for "Amount MVR 1,820.00" or just "1,820.00 MVR"
    const amountMatch = text.match(/Amount\s+MVR\s+([\d,]+\.\d{2})/i) || text.match(/([\d,]+\.\d{2})\s+MVR/i);
    if (amountMatch) {
        data.amount = amountMatch[1];
        data.currency = 'MVR';
    }

    // Extract Reference
    const refMatch = text.match(/Reference\s+([A-Z0-9]+)/i);
    if (refMatch) {
        data.reference = refMatch[1];
    }

    // Extract Date
    const dateMatch = text.match(/Transaction date\s+(\d{2}\/\d{2}\/\d{4}\s+\d{2}:\d{2})/i);
    if (dateMatch) {
        data.date = dateMatch[1];
    }

    // Extract Status
    const statusMatch = text.match(/Status\s+([A-Z]+)/i);
    if (statusMatch) {
        data.status = statusMatch[1];
    }

    // Extract From
    const fromMatch = text.match(/From\s+(.+)/i);
    if (fromMatch) {
        data.from = fromMatch[1].trim();
    }

    // Extract To (This is a bit tricky based on OCR "T Wisu MVR")
    // We can try to find the line after "From ..." or look for "To ..." if it exists, or infer it.
    // In the sample: "T Wisu MVR" -> likely "To Wisu"
    // Let's look for lines that look like a recipient name if "To" is missing or malformed.
    // For now, let's try to match "To" or "T" followed by name
    const toMatch = text.match(/(?:To|T)\s+(.+)/i);
    if (toMatch) {
        // Clean up "MVR" if it appears at the end of the name (common in BML receipts if next line is currency)
        let toName = toMatch[1].trim();
        if (toName.endsWith(' MVR')) {
            toName = toName.replace(' MVR', '').trim();
        }
        data.to = toName;
    }

    // Extract Account Number (13 digits)
    // It often appears on its own line or near the "To" field.
    const accountMatch = text.match(/\b(\d{13})\b/);
    if (accountMatch) {
        data.to_account = accountMatch[1];
    }

    data.merchant = "Bank of Maldives"; // Default for this type

    return data;
}
