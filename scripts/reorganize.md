
# Project Reorganization Guide

This document provides a guide for reorganizing the project files according to the new structure.

## Moving Files

When reorganizing the project, use the following approach to move files:

1. Create the target directory if it doesn't exist
2. Copy the source file to the target directory
3. Update imports in the copied file
4. Update imports in other files that reference the moved file
5. Test that everything works correctly
6. Delete the source file

## File Reorganization Plan

### Authentication Feature
- Move `src/components/signup/AccountFormStep.tsx` to `src/features/authentication/components/AccountFormStep.tsx`
- Move `src/components/signup/StoreFormStep.tsx` to `src/features/authentication/components/StoreFormStep.tsx`
- Move `src/hooks/useSimpleSignUp.ts` to `src/features/authentication/hooks/useSimpleSignUp.ts`
- Move `src/hooks/useSignUp.ts` to `src/features/authentication/hooks/useSignUp.ts`
- Move `src/hooks/useStoreSetup.ts` to `src/features/authentication/hooks/useStoreSetup.ts`
- Move `src/pages/SignIn.tsx` to `src/pages/public/SignIn.tsx`
- Move `src/pages/SignUp.tsx` to `src/pages/public/SignUp.tsx`
- Move `src/pages/ForgotPassword.tsx` to `src/pages/public/ForgotPassword.tsx`
- Move `src/pages/ResetPassword.tsx` to `src/pages/public/ResetPassword.tsx`
- Move `src/pages/StoreSetup.tsx` to `src/features/authentication/pages/StoreSetup.tsx`

### Dashboard Feature
- Move `src/pages/Dashboard.tsx` to `src/pages/dashboard/Dashboard.tsx`
- Move `src/components/dashboard/MainDashboard.tsx` to `src/features/dashboard/components/MainDashboard.tsx`

### Orders Feature
- Move `src/components/dashboard/DashboardOrders.tsx` to `src/features/orders/components/DashboardOrders.tsx`
- Move `src/components/dashboard/orders/*` to `src/features/orders/components/*`
- Move relevant order hooks to `src/features/orders/hooks/`

### Products Feature
- Move `src/components/dashboard/DashboardProducts.tsx` to `src/features/products/components/DashboardProducts.tsx`
- Move `src/components/dashboard/products/*` to `src/features/products/components/*`
- Move relevant product hooks to `src/features/products/hooks/`

### Settings Feature
- Move `src/components/dashboard/settings/*` to `src/features/settings/components/*`

## Updating Imports

After moving files, update all imports to reference the new file locations.

Example:
```typescript
// Before
import AccountFormStep from '@/components/signup/AccountFormStep';

// After
import AccountFormStep from '@/features/authentication/components/AccountFormStep';
```

## Testing

After reorganizing a set of related files, test the application to ensure everything works correctly before continuing with the next set of files.

This approach minimizes the risk of breaking changes during reorganization.
