import { createWorker } from 'tesseract.js';
import { parseReceipt } from './parser';

export interface ReceiptData {
    merchant?: string; // Bank of Maldives
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

export interface ReceiptItem {
    description: string;
    amount: string;
}

export async function scanReceipt(imagePath: string): Promise<ReceiptData> {
    const worker = await createWorker('eng');
    const ret = await worker.recognize(imagePath);
    const text = ret.data.text;
    await worker.terminate();

    const parsedData = parseReceipt(text);
    return {
        ...parsedData,
        rawText: text,
    };
}

export async function scanReceipts(imagePaths: string[]): Promise<ReceiptData[]> {
    if (imagePaths.length > 10) {
        throw new Error("Bulk scan limit exceeded. Maximum 10 images allowed.");
    }

    // Process sequentially to avoid spawning too many workers at once, or use Promise.all if performance is key but memory is concern.
    // Tesseract workers are heavy. Let's do Promise.all but we should be mindful. 
    // For 10 images, Promise.all might be okay, but let's stick to a simple map for now.
    // Actually, creating 10 workers might be too much.
    // Better to reuse one worker? Or just run in parallel?
    // The requirement says "async function and return array of data".
    // Let's use Promise.all for now as it's simplest, but Tesseract might be resource intensive.
    // A safer approach for a library is to process them.

    const results = await Promise.all(imagePaths.map(path => scanReceipt(path)));
    return results;
}
