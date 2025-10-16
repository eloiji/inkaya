# Storybook Setup Notes

## Product Card Story Created

A comprehensive Storybook story for the ProductCard component has been created at:
- `src/components/productCard.stories.tsx`

The story includes 10 different variations showcasing:
- Default, Compact, and Expanded variants
- Badge variants (New, Sale, Limited)
- Price formatting
- Interactive behavior
- Various product types

## Current Setup Status

Storybook configuration files have been created in `.storybook/`:
- `main.ts` - Main Storybook configuration
- `preview.ts` - Preview configuration with Tailwind CSS import

## Known Compatibility Issue

There is currently a compatibility issue between:
- **Tailwind CSS v4** (alpha/beta version used in this project)
- **Storybook v8** (latest stable)
- **Next.js v15** with Turbopack

This causes Webpack compilation errors when starting Storybook.

## Workaround Options

### Option 1: Wait for Stable Releases
Wait for Tailwind CSS v4 to reach stable release, which will likely have better Storybook support.

### Option 2: Downgrade Tailwind CSS
Temporarily downgrade to Tailwind CSS v3 for Storybook compatibility:
```bash
npm install -D tailwindcss@^3 @tailwindcss/postcss@^3
```

### Option 3: Use Alternative Preview
The ProductCard component can be previewed by:
1. Creating a test page in the Next.js app
2. Using the comprehensive unit tests (23 tests cover all scenarios)
3. Running the component in the dev server

## Story File Structure

The story file follows Storybook best practices:
- Uses TypeScript with proper typing
- Exports default meta object with component configuration
- Includes interactive controls for all props
- Uses external images from Unsplash (configured in `next.config.ts`)
- Includes 10 story variations demonstrating all features

## Next Steps

When Storybook becomes compatible:
1. The story file is ready to use
2. Simply run `npm run storybook`
3. Stories will automatically be discovered and displayed

## Alternative: Component Testing

Since the component has comprehensive test coverage, you can verify all functionality through:
```bash
npm test -- productCard
```

All 23 tests pass, covering:
- Rendering (6 tests)
- Price formatting (3 tests)
- Optional props (3 tests)
- User interactions (3 tests)
- Accessibility (3 tests)
- Styling variants (3 tests)
- Custom props (2 tests)
