"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./src/index");
const path = __importStar(require("path"));
const receipt1 = path.join(__dirname, 'sample-receipt.jpeg');
const receipt2 = path.join(__dirname, 'receipt2.jpeg');
async function run() {
    console.log('--- Testing Single Scan with Account Number ---');
    try {
        const result = await (0, index_1.scanReceipt)(receipt2);
        console.log('Result:', JSON.stringify(result, null, 2));
    }
    catch (error) {
        console.error('Error scanning receipt:', error);
    }
    console.log('\n--- Testing Bulk Scan ---');
    try {
        const results = await (0, index_1.scanReceipts)([receipt1, receipt2]);
        console.log(`Scanned ${results.length} receipts.`);
        results.forEach((res, i) => {
            console.log(`Receipt ${i + 1}: Amount=${res.amount}, Account=${res.to_account}`);
        });
    }
    catch (error) {
        console.error('Error in bulk scan:', error);
    }
}
run();
