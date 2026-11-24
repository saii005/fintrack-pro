import { useState } from 'react';
import { useFinanceStore } from '@/store/financeStore';
import SummaryCards from './SummaryCards';
import ChartsSection from './ChartsSection';
import TransactionList from './TransactionList';
import TransactionModal from './TransactionModal';
import InsightsSection from './InsightsSection';

export default function Dashboard() {
  const { role } = useFinanceStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddTransaction = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <SummaryCards />

      {/* Insights */}
      <InsightsSection />

      {/* Charts */}
      <ChartsSection />

      {/* Transactions Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Recent Transactions
          </h3>
          {role === 'Admin' && (
            <button
              onClick={handleAddTransaction}
              className="btn btn-primary"
            >
              Add Transaction
            </button>
          )}
        </div>
        <TransactionList />
      </div>

      {/* Transaction Modal */}
      <TransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}