import { useMemo } from 'react';
import { TrendingUp, TrendingDown, Target, AlertTriangle } from 'lucide-react';
import { useFinanceStore } from '@/store/financeStore';

export default function InsightsSection() {
  const { transactions } = useFinanceStore();

  const insights = useMemo(() => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const currentMonthTransactions = transactions.filter(t => {
      const transactionDate = new Date(t.date);
      return transactionDate.getMonth() === currentMonth &&
             transactionDate.getFullYear() === currentYear;
    });

    const lastMonthTransactions = transactions.filter(t => {
      const transactionDate = new Date(t.date);
      const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
      const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;
      return transactionDate.getMonth() === lastMonth &&
             transactionDate.getFullYear() === lastMonthYear;
    });

    const currentIncome = currentMonthTransactions
      .filter(t => t.type === 'income')
      .reduce((acc, t) => acc + t.amount, 0);

    const currentExpenses = currentMonthTransactions
      .filter(t => t.type === 'expense')
      .reduce((acc, t) => acc + t.amount, 0);

    const lastMonthIncome = lastMonthTransactions
      .filter(t => t.type === 'income')
      .reduce((acc, t) => acc + t.amount, 0);

    const lastMonthExpenses = lastMonthTransactions
      .filter(t => t.type === 'expense')
      .reduce((acc, t) => acc + t.amount, 0);

    const incomeChange = lastMonthIncome > 0
      ? ((currentIncome - lastMonthIncome) / lastMonthIncome) * 100
      : 0;

    const expenseChange = lastMonthExpenses > 0
      ? ((currentExpenses - lastMonthExpenses) / lastMonthExpenses) * 100
      : 0;

    // Top spending categories
    const categorySpending = currentMonthTransactions
      .filter(t => t.type === 'expense')
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
      }, {} as Record<string, number>);

    const topCategory = Object.entries(categorySpending)
      .sort(([,a], [,b]) => b - a)[0];

    // Savings rate
    const savingsRate = currentIncome > 0
      ? ((currentIncome - currentExpenses) / currentIncome) * 100
      : 0;

    return [
      {
        title: 'Monthly Income',
        value: currentIncome,
        change: incomeChange,
        icon: TrendingUp,
        color: 'text-green-600',
        bgColor: 'bg-green-50 dark:bg-green-900/20',
        format: 'currency',
      },
      {
        title: 'Monthly Expenses',
        value: currentExpenses,
        change: expenseChange,
        icon: TrendingDown,
        color: 'text-red-600',
        bgColor: 'bg-red-50 dark:bg-red-900/20',
        format: 'currency',
      },
      {
        title: 'Savings Rate',
        value: savingsRate,
        change: null,
        icon: Target,
        color: savingsRate >= 20 ? 'text-green-600' : savingsRate >= 10 ? 'text-yellow-600' : 'text-red-600',
        bgColor: savingsRate >= 20 ? 'bg-green-50 dark:bg-green-900/20' : savingsRate >= 10 ? 'bg-yellow-50 dark:bg-yellow-900/20' : 'bg-red-50 dark:bg-red-900/20',
        format: 'percentage',
      },
      {
        title: 'Top Category',
        value: topCategory ? topCategory[0] : 'None',
        change: topCategory ? topCategory[1] : 0,
        icon: AlertTriangle,
        color: 'text-blue-600',
        bgColor: 'bg-blue-50 dark:bg-blue-900/20',
        format: 'category',
      },
    ];
  }, [transactions]);

  const formatValue = (value: number | string, format: string) => {
    switch (format) {
      case 'currency':
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(value as number);
      case 'percentage':
        return `${Math.round(value as number)}%`;
      case 'category':
        return `${value} (${new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(insights.find(i => i.format === 'category')?.change as number || 0)})`;
      default:
        return value;
    }
  };

  const formatChange = (change: number | null) => {
    if (change === null) return null;
    const isPositive = change >= 0;
    return (
      <span className={`text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
        {isPositive ? '+' : ''}{change.toFixed(1)}%
      </span>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {insights.map((insight) => (
        <div key={insight.title} className="card">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {insight.title}
              </p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                {formatValue(insight.value, insight.format)}
              </p>
              {insight.change !== null && formatChange(insight.change)}
            </div>
            <div className={`p-3 rounded-full ${insight.bgColor}`}>
              <insight.icon className={`h-6 w-6 ${insight.color}`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}