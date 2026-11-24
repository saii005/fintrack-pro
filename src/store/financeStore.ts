import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Transaction, UserRole, TransactionFormData } from '@/types';

interface FinanceStore {
  // State
  transactions: Transaction[];
  role: UserRole;
  theme: 'light' | 'dark';
  filters: {
    searchTerm: string;
    category: string;
    type: 'All' | 'income' | 'expense';
  };

  // Actions
  setRole: (role: UserRole) => void;
  setTheme: (theme: 'light' | 'dark') => void;
  toggleTheme: () => void;
  setFilters: (filters: Partial<FinanceStore['filters']>) => void;

  // Transaction actions
  addTransaction: (transaction: TransactionFormData) => void;
  updateTransaction: (id: number, transaction: Partial<Transaction>) => void;
  deleteTransaction: (id: number) => void;

  // Computed
  filteredTransactions: Transaction[];
  categories: string[];
  summary: {
    totalBalance: number;
    totalIncome: number;
    totalExpenses: number;
  };
}

const mockTransactions: Transaction[] = [
  { id: 1, date: '2024-03-01', amount: 3200.00, category: 'Salary', type: 'income', note: 'March Paycheck' },
  { id: 2, date: '2024-03-05', amount: 120.50, category: 'Groceries', type: 'expense', note: 'Costco' },
  { id: 3, date: '2024-03-08', amount: 65.00, category: 'Utilities', type: 'expense', note: 'Electric Bill' },
  { id: 4, date: '2024-03-10', amount: 45.00, category: 'Entertainment', type: 'expense', note: 'Concert Tickets' },
  { id: 5, date: '2024-03-15', amount: 200.00, category: 'Healthcare', type: 'expense', note: 'Doctor Visit' },
  { id: 6, date: '2024-03-18', amount: 85.99, category: 'Shopping', type: 'expense', note: 'Clothes' },
  { id: 7, date: '2024-03-22', amount: 1500.00, category: 'Freelance', type: 'income', note: 'Project Payment' },
  { id: 8, date: '2024-03-25', amount: 250.00, category: 'Dining', type: 'expense', note: 'Restaurant' },
  { id: 9, date: '2024-04-01', amount: 3200.00, category: 'Salary', type: 'income', note: 'April Paycheck' },
  { id: 10, date: '2024-04-02', amount: 150.75, category: 'Groceries', type: 'expense', note: 'Whole Foods' },
  { id: 11, date: '2024-04-03', amount: 65.00, category: 'Utilities', type: 'expense', note: 'Internet Bill' },
  { id: 12, date: '2024-04-04', amount: 45.00, category: 'Entertainment', type: 'expense', note: 'Movie Tickets' },
  { id: 13, date: '2024-04-06', amount: 120.00, category: 'Shopping', type: 'expense', note: 'Amazon' },
  { id: 14, date: '2024-04-08', amount: 800.00, category: 'Freelance', type: 'income', note: 'Consulting' },
  { id: 15, date: '2024-04-10', amount: 189.99, category: 'Dining', type: 'expense', note: 'Pizza' },
];

export const useFinanceStore = create<FinanceStore>()(
  persist(
    (set, get) => ({
      // Initial state
      transactions: mockTransactions,
      role: 'Admin',
      theme: 'light',
      filters: {
        searchTerm: '',
        category: 'All',
        type: 'All',
      },

      // Actions
      setRole: (role) => set({ role }),
      setTheme: (theme) => set({ theme }),
      toggleTheme: () => set((state) => ({
        theme: state.theme === 'light' ? 'dark' : 'light'
      })),
      setFilters: (filters) => set((state) => ({
        filters: { ...state.filters, ...filters }
      })),

      // Transaction actions
      addTransaction: (transactionData) => set((state) => {
        const newId = Math.max(...state.transactions.map(t => t.id), 0) + 1;
        const newTransaction: Transaction = {
          id: newId,
          ...transactionData,
        };
        return {
          transactions: [...state.transactions, newTransaction],
        };
      }),

      updateTransaction: (id, updatedData) => set((state) => ({
        transactions: state.transactions.map(t =>
          t.id === id ? { ...t, ...updatedData } : t
        ),
      })),

      deleteTransaction: (id) => set((state) => ({
        transactions: state.transactions.filter(t => t.id !== id),
      })),

      // Computed properties
      get filteredTransactions() {
        const { transactions, filters } = get();
        return transactions.filter((t) => {
          const matchesSearch = filters.searchTerm === '' ||
            t.note.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
            t.category.toLowerCase().includes(filters.searchTerm.toLowerCase());
          const matchesCategory = filters.category === 'All' || t.category === filters.category;
          const matchesType = filters.type === 'All' || t.type === filters.type;
          return matchesSearch && matchesCategory && matchesType;
        });
      },

      get categories() {
        const { transactions } = get();
        return ['All', ...Array.from(new Set(transactions.map(t => t.category)))];
      },

      get summary() {
        const { transactions } = get();
        const totalIncome = transactions
          .filter(t => t.type === 'income')
          .reduce((acc, t) => acc + t.amount, 0);
        const totalExpenses = transactions
          .filter(t => t.type === 'expense')
          .reduce((acc, t) => acc + t.amount, 0);
        return {
          totalBalance: totalIncome - totalExpenses,
          totalIncome,
          totalExpenses,
        };
      },
    }),
    {
      name: 'finance-store',
      partialize: (state) => ({
        transactions: state.transactions,
        role: state.role,
        theme: state.theme,
      }),
    }
  )
);