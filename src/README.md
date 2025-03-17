
# Project Structure

This project follows a feature-based architecture to improve organization, maintainability, and scalability.

## Directory Structure

```
src/
├── components/         # Shared UI components
│   ├── ui/            # shadcn/ui components
│   ├── shared/        # Common shared components
│   ├── forms/         # Form-related components
│   └── widgets/       # Statistic cards, charts, etc.
├── features/          # Feature modules
│   ├── authentication/ # Authentication related
│   ├── orders/        # Order management
│   ├── products/      # Product management
│   ├── customers/     # Customer management
│   └── settings/      # Store settings
├── hooks/             # Custom React hooks
├── utils/             # Helper functions
├── pages/             # Route components
│   ├── public/        # Public pages
│   ├── dashboard/     # User dashboard pages
│   └── admin/         # Admin dashboard pages
├── integrations/      # Third-party integrations
├── context/           # React context providers
└── styles/            # Global styles
```

## Key Features

- **Authentication** - User registration, login, and session management using Supabase Auth
- **Dashboard** - Complete store management system for merchants
- **Orders** - Order management with real-time updates
- **Products** - Product catalog management
- **Customers** - Customer relationship management
- **Settings** - Store configuration and customization

## Implementation Details

- Built with React 18 and TypeScript
- Uses TailwindCSS for styling
- Leverages shadcn/ui component library
- Supabase for backend (auth, database, storage)
- React Query for data fetching and state management
- React Router for navigation
