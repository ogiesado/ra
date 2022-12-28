import { ExchangeWidget } from './components';
import { useAppService } from './services';

function App() {
  const { currencies, rates, loading } = useAppService();

  console.log('rates', rates);
  console.log('currencies', currencies);

  if (loading)
    return (
      <div className="flex items-center justify-center text-2xl font-bold mt-10">
        <p>Loading...</p>
      </div>
    );

  return (
    <header className="py-10 shadow-md">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-5">Exchange</h1>
        <ExchangeWidget />
      </div>
    </header>
  );
}

export default App;
