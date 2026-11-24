import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useFinanceStore } from '@/store/financeStore';
import { TransactionFormData } from '@/types';

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction?: TransactionFormData | null;
}

const categories = [
  'Salary', 'Freelance', 'Business', 'Investment',
  'Groceries', 'Dining', 'Shopping', 'Entertainment',
  'Utilities', 'Healthcare', 'Transportation', 'Education',
  'Travel', 'Insurance', 'Taxes', 'Other'
];

export default function TransactionModal({ isOpen, onClose, transaction }: TransactionModalProps) {
  const { addTransaction } = useFinanceStore();
  const [formData, setFormData] = useState<TransactionFormData>({
    date: new Date().toISOString().split('T')[0],
    amount: 0,
    category: '',
    type: 'expense',
    note: '',
  });

  useEffect(() => {
    if (transaction) {
      setFormData(transaction);
    } else {
      setFormData({
        date: new Date().toISOString().split('T')[0],
        amount: 0,
        category: '',
        type: 'expense',
        note: '',
      });
    }
  }, [transaction, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.amount <= 0 || !formData.category || !formData.note) {
      return;
    }

    addTransaction(formData);
    onClose();
  };

  const handleChange = (field: keyof TransactionFormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" onClick={onClose} />

        <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white dark:bg-gray-800 shadow-xl rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              {transaction ? 'Edit Transaction' : 'Add Transaction'}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Date
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => handleChange('date', e.target.value)}
                className="input w-full"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Type
              </label>
              <select
                value={formData.type}
                onChange={(e) => handleChange('type', e.target.value as 'income' | 'expense')}
                className="input w-full"
              >
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => handleChange('category', e.target.value)}
                className="input w-full"
                required
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Amount
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={formData.amount}
                onChange={(e) => handleChange('amount', parseFloat(e.target.value) || 0)}
                className="input w-full"
                placeholder="0.00"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Note
              </label>
              <input
                type="text"
                value={formData.note}
                onChange={(e) => handleChange('note', e.target.value)}
                className="input w-full"
                placeholder="Description of the transaction"
                required
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="btn btn-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
              >
                {transaction ? 'Update' : 'Add'} Transaction
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}