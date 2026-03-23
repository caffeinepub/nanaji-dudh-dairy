# Nanaji Dudh Dairy

## Current State
The app has a top Navbar with desktop nav links and a mobile hamburger menu. No bottom navigation exists.

## Requested Changes (Diff)

### Add
- Bottom navigation bar visible on mobile screens (md:hidden), fixed at bottom of screen
- Nav items: Home, Products, Cart (with badge), Contact
- Active state highlighting with brand-purple color
- Bottom padding on page content to avoid being hidden behind the bottom nav

### Modify
- App.tsx: add bottom nav component and pb-16 padding on mobile for content area
- Hide the hamburger mobile menu toggle in Navbar since bottom nav replaces mobile navigation

### Remove
- Nothing removed

## Implementation Plan
1. Create BottomNav component with Home, Products, Cart (badge), Contact icons and labels
2. Add BottomNav to App.tsx root layout
3. Add bottom padding (pb-16 md:pb-0) to the main content wrapper so content isn't hidden
4. Adjust Navbar to hide mobile menu toggle on mobile since bottom nav handles navigation
