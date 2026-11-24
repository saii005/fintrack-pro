export interface Transaction {
  id: number;
  date: string;
  amount: number;
  category: string;
  type: 'income' | 'expense';
  note: string;
}

export interface TransactionFormData {
  date: string;
  amount: number;
  category: string;
  type: 'income' | 'expense';
  note: string;
}

export type UserRole = 'Admin' | 'User' | 'Viewer';

export interface AppState {
  transactions: Transaction[];
  role: UserRole;
  theme: 'light' | 'dark';
  filters: {
    searchTerm: string;
    category: string;
    type: 'All' | 'income' | 'expense';
  };
}

export interface SummaryData {
  totalBalance: number;
  totalIncome: number;
  totalExpenses: number;
}

export interface CategorySpending {
  category: string;
  amount: number;
  percentage: number;
}

export interface MonthlyData {
  month: string;
  income: number;
  expenses: number;
  balance: number;
}