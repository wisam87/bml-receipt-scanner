import { scanReceipt, scanReceipts } from './src/index';
import * as path from 'path';

const receipt1 = path.join(__dirname, 'sample-receipt.jpeg');
const receipt2 = path.join(__dirname, 'receipt2.jpeg');

async function run() {
    console.log('--- Testing Single Scan with Account Number ---');
    try {
        const result = await scanReceipt(receipt2);
        console.log('Result:', JSON.stringify(result, null, 2));
    } catch (error) {
        console.error('Error scanning receipt:', error);
    }

    console.log('\n--- Testing Bulk Scan ---');
    try {
        const results = await scanReceipts([receipt1, receipt2]);
        console.log(`Scanned ${results.length} receipts.`);
        results.forEach((res, i) => {
            console.log(`Receipt ${i + 1}: Amount=${res.amount}, Account=${res.to_account}`);
        });
    } catch (error) {
        console.error('Error in bulk scan:', error);
    }
}

run();
