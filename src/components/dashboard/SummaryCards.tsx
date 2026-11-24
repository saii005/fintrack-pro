import { TrendingUp, TrendingDown, DollarSign, CreditCard } from 'lucide-react';
import { useFinanceStore } from '@/store/financeStore';

export default function SummaryCards() {
  const { summary } = useFinanceStore();

  const cards = [
    {
      title: 'Total Balance',
      value: summary.totalBalance,
      icon: DollarSign,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      type: 'balance',
    },
    {
      title: 'Total Income',
      value: summary.totalIncome,
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      type: 'income',
    },
    {
      title: 'Total Expenses',
      value: summary.totalExpenses,
      icon: TrendingDown,
      color: 'text-red-600',
      bgColor: 'bg-red-50 dark:bg-red-900/20',
      type: 'expense',
    },
    {
      title: 'Net Flow',
      value: summary.totalIncome - summary.totalExpenses,
      icon: CreditCard,
      color: summary.totalIncome - summary.totalExpenses >= 0 ? 'text-green-600' : 'text-red-600',
      bgColor: summary.totalIncome - summary.totalExpenses >= 0
        ? 'bg-green-50 dark:bg-green-900/20'
        : 'bg-red-50 dark:bg-red-900/20',
      type: 'net',
    },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card) => (
        <div key={card.title} className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {card.title}
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {formatCurrency(card.value)}
              </p>
            </div>
            <div className={`p-3 rounded-full ${card.bgColor}`}>
              <card.icon className={`h-6 w-6 ${card.color}`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}