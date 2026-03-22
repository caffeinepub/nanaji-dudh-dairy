# Nanaji Dudh Dairy

## Current State
Products page shows a product grid with fallback products. Backend has read-only product queries. No way to add new products from the UI.

## Requested Changes (Diff)

### Add
- addProduct backend function
- Add New Product button on Products page
- Dialog form: product name, category, price/rate, unit, description, image URL, quantity/stock
- useAddProduct mutation hook

### Modify
- useQueries.ts: add useAddProduct mutation
- Products.tsx: add button and dialog

### Remove
- Nothing

## Implementation Plan
1. Generate Motoko backend with addProduct
2. Add mutation hook
3. Add AddProductDialog component
4. Wire button on Products page
