# FinTrack Pro - Professional Finance Dashboard

A modern, professional finance dashboard built with React, TypeScript, and Tailwind CSS. This application provides comprehensive financial tracking with advanced features for managing transactions, visualizing spending patterns, and gaining insights into financial health.

## 🚀 Features

### Core Functionality
- **Transaction Management**: Add, edit, and delete income and expense transactions
- **Role-based Access**: Admin, User, and Viewer roles with different permissions
- **Real-time Dashboard**: Live updates of financial summaries and insights
- **Advanced Filtering**: Search and filter transactions by category, type, and date
- **Data Persistence**: Local storage with Zustand for state management

### Professional Features
- **TypeScript**: Full type safety throughout the application
- **Modern UI**: Clean, responsive design with Tailwind CSS
- **Dark Mode**: System-aware theme switching
- **Interactive Charts**: Beautiful data visualizations with Recharts
- **Insights & Analytics**: Monthly comparisons, savings rate tracking, and spending analysis
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### Technical Stack
- **Frontend**: React 18 with TypeScript
- **State Management**: Zustand with persistence
- **Styling**: Tailwind CSS with custom design system
- **Charts**: Recharts for data visualization
- **Build Tool**: Vite for fast development and building
- **Date Handling**: date-fns for robust date operations
- **Code Quality**: ESLint with TypeScript rules

## 🏗️ Architecture

### Project Structure
```
src/
├── components/
│   ├── dashboard/          # Dashboard-specific components
│   ├── layout/            # Layout components (Sidebar, Header)
│   └── ui/                # Reusable UI components
├── store/                 # Zustand state management
├── types/                 # TypeScript type definitions
├── App.tsx               # Main application component
├── main.tsx              # Application entry point
└── index.css             # Global styles and Tailwind imports
```

### State Management
The application uses Zustand for state management with the following features:
- Centralized store for transactions, user settings, and filters
- Automatic persistence to localStorage
- Computed properties for summaries and filtered data
- Type-safe actions and selectors

### Component Design
- **Modular Architecture**: Components are organized by feature and responsibility
- **Type Safety**: All components use TypeScript with proper prop types
- **Reusability**: UI components follow a consistent design system
- **Performance**: Optimized with React best practices and proper memoization

## 🛠️ Development

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd finance-dashboard-pro

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5173 in your browser
```

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript type checking
```

### Environment Setup
The application uses Vite for development and building. Configuration files include:
- `vite.config.ts`: Build configuration
- `tailwind.config.js`: Styling configuration
- `tsconfig.json`: TypeScript configuration
- `eslint.config.js`: Linting rules

## 📊 Features Overview

### Dashboard
- **Summary Cards**: Total balance, income, expenses, and net flow
- **Monthly Insights**: Income/expense trends and savings rate
- **Interactive Charts**: Balance trends and spending by category
- **Transaction List**: Sortable, filterable transaction history

### Transaction Management
- **Add Transactions**: Modal form with validation
- **Edit/Delete**: Admin-only operations with confirmation
- **Categories**: Predefined categories with custom options
- **Search & Filter**: Real-time filtering and search

### User Experience
- **Responsive Design**: Works on all device sizes
- **Dark/Light Mode**: Automatic theme switching
- **Accessibility**: ARIA labels and keyboard navigation
- **Performance**: Optimized rendering and state updates

## 🔧 Configuration

### Theme Configuration
The application supports light and dark themes with automatic system detection:

```typescript
// In store/financeStore.ts
theme: 'light' | 'dark'
toggleTheme: () => void
```

### Role Management
Three user roles with different permissions:
- **Admin**: Full access to all features
- **User**: Can view and manage transactions
- **Viewer**: Read-only access

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment to any static hosting service.

### Environment Variables
Create a `.env` file for environment-specific configuration:
```env
VITE_API_URL=https://api.example.com
VITE_APP_TITLE=FinTrack Pro
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built with modern React patterns and best practices
- Inspired by professional finance applications
- Uses open-source libraries and tools