"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scanReceipt = scanReceipt;
exports.scanReceipts = scanReceipts;
const tesseract_js_1 = require("tesseract.js");
const parser_1 = require("./parser");
async function scanReceipt(imagePath) {
    const worker = await (0, tesseract_js_1.createWorker)('eng');
    const ret = await worker.recognize(imagePath);
    const text = ret.data.text;
    await worker.terminate();
    const parsedData = (0, parser_1.parseReceipt)(text);
    return {
        ...parsedData,
        rawText: text,
    };
}
async function scanReceipts(imagePaths) {
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
