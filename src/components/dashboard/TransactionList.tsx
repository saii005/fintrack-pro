import { useState } from 'react';
import { Search, Edit, Trash2, ArrowUpDown } from 'lucide-react';
import { useFinanceStore } from '@/store/financeStore';
import { format } from 'date-fns';

type SortField = 'date' | 'amount' | 'category' | 'type';
type SortDirection = 'asc' | 'desc';
type FilterType = 'All' | 'income' | 'expense';

export default function TransactionList() {
  const {
    filteredTransactions,
    categories,
    filters,
    setFilters,
    role,
    deleteTransaction
  } = useFinanceStore();

  const [sortField, setSortField] = useState<SortField>('date');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    let aValue: string | number = a[sortField];
    let bValue: string | number = b[sortField];

    if (sortField === 'date') {
      aValue = new Date(aValue as string).getTime();
      bValue = new Date(bValue as string).getTime();
    }

    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      deleteTransaction(id);
    }
  };

  return (
    <div className="card">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search transactions..."
              value={filters.searchTerm}
              onChange={(e) => setFilters({ searchTerm: e.target.value })}
              className="input pl-10"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <select
            value={filters.category}
            onChange={(e) => setFilters({ category: e.target.value })}
            className="input"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <select
            value={filters.type}
            onChange={(e) => setFilters({ type: e.target.value as FilterType })}
            className="input"
          >
            <option value="All">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
      </div>

      {/* Transaction Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th
                className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
                onClick={() => handleSort('date')}
              >
                <div className="flex items-center space-x-1">
                  <span>Date</span>
                  <ArrowUpDown className="h-4 w-4" />
                </div>
              </th>
              <th
                className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
                onClick={() => handleSort('category')}
              >
                <div className="flex items-center space-x-1">
                  <span>Category</span>
                  <ArrowUpDown className="h-4 w-4" />
                </div>
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">
                Note
              </th>
              <th
                className="text-right py-3 px-4 font-medium text-gray-700 dark:text-gray-300 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
                onClick={() => handleSort('amount')}
              >
                <div className="flex items-center space-x-1 justify-end">
                  <span>Amount</span>
                  <ArrowUpDown className="h-4 w-4" />
                </div>
              </th>
              {role === 'Admin' && (
                <th className="text-right py-3 px-4 font-medium text-gray-700 dark:text-gray-300">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {sortedTransactions.map((transaction) => (
              <tr key={transaction.id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
                <td className="py-3 px-4 text-sm text-gray-900 dark:text-white">
                  {format(new Date(transaction.date), 'MMM dd, yyyy')}
                </td>
                <td className="py-3 px-4 text-sm text-gray-900 dark:text-white">
                  {transaction.category}
                </td>
                <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                  {transaction.note}
                </td>
                <td className={`py-3 px-4 text-sm font-medium text-right ${
                  transaction.type === 'income'
                    ? 'text-green-600'
                    : 'text-red-600'
                }`}>
                  {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                </td>
                {role === 'Admin' && (
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => {/* TODO: Implement edit functionality */}}
                        className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(transaction.id)}
                        className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {sortedTransactions.length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          No transactions found matching your criteria.
        </div>
      )}
    </div>
  );
}