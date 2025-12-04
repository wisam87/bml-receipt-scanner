export interface ReceiptData {
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
export interface ReceiptItem {
    description: string;
    amount: string;
}
export declare function scanReceipt(imagePath: string): Promise<ReceiptData>;
export declare function scanReceipts(imagePaths: string[]): Promise<ReceiptData[]>;
