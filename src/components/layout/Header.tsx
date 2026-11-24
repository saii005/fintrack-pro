import RoleSwitcher from '@/components/ui/RoleSwitcher';
import ThemeToggle from '@/components/ui/ThemeToggle';

export default function Header() {

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between h-16 px-6">
        <div className="flex items-center">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Dashboard
          </h2>
        </div>

        <div className="flex items-center space-x-4">
          <RoleSwitcher />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}