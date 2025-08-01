# Icon Extension Guide

This guide explains how to add new React Icons to your services when needed.

## How It Works

The system uses a modular approach where:
1. Icons are defined in `client/src/utils/icons.ts`
2. A standalone "React-Icon" component is used in Strapi
3. The React-Icon component can be used within other components (like Services)
4. When you need a new icon, you simply add it to the enum

## Adding a New Icon

### Step 1: Find the Icon Name
1. Go to [React Icons](https://react-icons.github.io/react-icons/)
2. Search for the icon you want
3. Copy the exact icon name (e.g., `FaCar`, `MdDirectionsCar`, `IoCar`)

### Step 2: Add to the Enum
Open `client/src/utils/icons.ts` and add the new icon:

```typescript
// 1. Import the icon at the top
import { FaCar } from 'react-icons/fa';

// 2. Add to the enum
export enum IconName {
  // ... existing icons ...
  FA_CAR = 'FaCar',  // Add this line
}

// 3. Add to the mapping
const iconComponents: Record<IconName, React.ComponentType<any>> = {
  // ... existing mappings ...
  [IconName.FA_CAR]: FaCar,  // Add this line
};
```

### Step 3: Update Strapi Schema
Open `server/src/components/elements/react-icon.json` and add the icon name to the enum:

```json
{
  "iconName": {
    "type": "enumeration",
    "enum": [
      // ... existing icons ...
      "FaCar"  // Add this line
    ]
  }
}
```

### Step 4: Restart Strapi
After updating the schema, restart your Strapi server for the changes to take effect.

## Example: Adding a Car Icon

Here's a complete example of adding a car icon:

### 1. Update `client/src/utils/icons.ts`:
```typescript
// Add import
import { FaCar } from 'react-icons/fa';

// Add to enum
export enum IconName {
  // ... existing icons ...
  FA_CAR = 'FaCar',
}

// Add to mapping
const iconComponents: Record<IconName, React.ComponentType<any>> = {
  // ... existing mappings ...
  [IconName.FA_CAR]: FaCar,
};
```

### 2. Update `server/src/components/elements/react-icon.json`:
```json
{
  "iconName": {
    "type": "enumeration",
    "enum": [
      // ... existing icons ...
      "FaCar"
    ]
  }
}
```

### 3. Restart Strapi and you're done!

## Component Structure

The system now uses a modular structure:

- **`client/src/utils/icons.ts`**: Icon definitions and utilities
- **`client/src/components/elements/ReactIcon.tsx`**: Standalone React-Icon component
- **`server/src/components/elements/react-icon.json`**: Strapi schema for React-Icon
- **`server/src/components/blocks/service.json`**: Service component that uses React-Icon

## Using React-Icon in Strapi

1. **In Services**: The service component now includes a React-Icon field
2. **In Other Components**: You can add React-Icon to any component that needs icons
3. **Configuration**: Each React-Icon can have:
   - Icon name (from dropdown)
   - Color (hex, rgb, or CSS color name)
   - Size (in pixels)

## Available Icon Libraries

The system supports icons from these libraries:
- **Font Awesome**: `Fa*` (e.g., `FaHome`, `FaCar`)
- **Material Design**: `Md*` (e.g., `MdHome`, `MdDirectionsCar`)
- **Ionicons**: `Io*` (e.g., `IoHome`, `IoCar`)
- **Game Icons**: `Gi*` (e.g., `GiHouse`, `GiCar`)

## Best Practices

1. **Use descriptive names**: `FA_CAR` instead of `FA_C`
2. **Group by library**: Keep Font Awesome icons together, Material Design together, etc.
3. **Test after adding**: Make sure the icon renders correctly
4. **Use consistent naming**: Follow the existing pattern (e.g., `FA_` prefix for Font Awesome)
5. **Reuse components**: The React-Icon component can be used anywhere in your app

## Troubleshooting

### Icon Not Showing
- Check that the import name matches exactly
- Verify the icon name is added to both the enum and the mapping
- Make sure Strapi has been restarted after schema changes
- Check that the React-Icon component is properly configured in Strapi

### TypeScript Errors
- Ensure the icon name is added to the enum
- Check that the mapping includes the new icon
- Verify the import statement is correct

## Quick Reference

Common icon patterns for real estate:
- **Property**: `FaHome`, `FaBuilding`, `MdApartment`
- **Actions**: `FaSearch`, `FaEye`, `FaHeart`
- **Contact**: `FaPhone`, `FaEnvelope`, `FaMapMarkerAlt`
- **Features**: `FaKey`, `FaCalculator`, `FaShieldAlt` 