import { BarChart3, CreditCard, PieChart, Settings, TrendingUp } from 'lucide-react';

const navigation = [
  { name: 'Dashboard', icon: BarChart3, current: true },
  { name: 'Transactions', icon: CreditCard, current: false },
  { name: 'Analytics', icon: TrendingUp, current: false },
  { name: 'Reports', icon: PieChart, current: false },
  { name: 'Settings', icon: Settings, current: false },
];

export default function Sidebar() {
  return (
    <div className="hidden md:flex md:w-64 md:flex-col">
      <div className="flex flex-col flex-grow bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
        <div className="flex items-center h-16 flex-shrink-0 px-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <BarChart3 className="h-8 w-8 text-primary-600" />
            </div>
            <div className="ml-3">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                FinTrack Pro
              </h1>
            </div>
          </div>
        </div>
        <div className="flex-1 flex flex-col overflow-y-auto">
          <nav className="flex-1 px-4 py-4 space-y-2">
            {navigation.map((item) => (
              <a
                key={item.name}
                href="#"
                className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  item.current
                    ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-600 dark:bg-primary-900/50 dark:text-primary-300'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
                }`}
              >
                <item.icon
                  className={`mr-3 h-5 w-5 flex-shrink-0 ${
                    item.current
                      ? 'text-primary-600 dark:text-primary-400'
                      : 'text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-300'
                  }`}
                />
                {item.name}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}