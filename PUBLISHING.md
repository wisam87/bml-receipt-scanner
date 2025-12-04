# Publishing to npm

This guide explains how to build and publish the `bml-receipt-scanner` package to npm.

## Prerequisites

1. **npm account**: Create one at [npmjs.com](https://www.npmjs.com/signup)
2. **npm CLI**: Ensure you have npm installed (comes with Node.js)

## Steps to Publish

### 1. Login to npm

```bash
npm login
```

Enter your npm username, password, and email when prompted.

### 2. Build the Package

Compile TypeScript to JavaScript:

```bash
npm run build
```

This creates the `dist/` folder with compiled JavaScript and TypeScript declaration files.

### 3. Verify Package Contents

Check what will be published:

```bash
npm pack --dry-run
```

This shows all files that will be included in the package.

### 4. Update Version (if needed)

Before publishing updates, increment the version:

```bash
# For bug fixes
npm version patch

# For new features
npm version minor

# For breaking changes
npm version major
```

### 5. Publish to npm

```bash
npm publish
```

For the first publish, if you want to make it public:

```bash
npm publish --access public
```

## Post-Publication

### Install Your Package

Users can now install your package:

```bash
npm install bml-receipt-scanner
```

### Usage

```typescript
import { scanReceipt, scanReceipts } from 'bml-receipt-scanner';

const data = await scanReceipt('/path/to/receipt.jpeg');
console.log(data);
```

## Updating the Package

1. Make your changes
2. Build: `npm run build`
3. Update version: `npm version patch/minor/major`
4. Publish: `npm publish`

## Unpublishing (Use with Caution)

To unpublish a specific version:

```bash
npm unpublish bml-receipt-scanner@1.0.0
```

**Note**: You can only unpublish within 72 hours of publishing, and it's generally discouraged.
