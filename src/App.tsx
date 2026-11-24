import { useEffect } from 'react';
import { useFinanceStore } from '@/store/financeStore';
import Layout from '@/components/layout/Layout';
import Dashboard from '@/components/dashboard/Dashboard';

function App() {
  const { theme } = useFinanceStore();

  useEffect(() => {
    // Apply theme to document
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <Layout>
      <Dashboard />
    </Layout>
  );
}

export default App;