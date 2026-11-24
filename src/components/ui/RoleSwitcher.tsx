import { UserRole } from '@/types';
import { useFinanceStore } from '@/store/financeStore';

const roles: { value: UserRole; label: string; description: string }[] = [
  { value: 'Admin', label: 'Admin', description: 'Full access to all features' },
  { value: 'User', label: 'User', description: 'Can view and manage transactions' },
  { value: 'Viewer', label: 'Viewer', description: 'Read-only access' },
];

export default function RoleSwitcher() {
  const { role, setRole } = useFinanceStore();

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
        Role:
      </span>
      <select
        value={role}
        onChange={(e) => setRole(e.target.value as UserRole)}
        className="input text-sm w-auto min-w-0"
      >
        {roles.map((roleOption) => (
          <option key={roleOption.value} value={roleOption.value}>
            {roleOption.label}
          </option>
        ))}
      </select>
    </div>
  );
}