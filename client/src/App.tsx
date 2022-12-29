import { ExchangeWidget, FeedbackMessage } from './components';
import { useAppService } from './services';

function App() {
  const {
    fiatCurrencies,
    cryptoCurrencies,
    rates,
    loading,
    message,
    messageSuccess,
    showMessage,
  } = useAppService();

  if (loading) return <FeedbackMessage success message="Loading..." />;

  return (
    <header className="lg:h-ra-234-px lg:shadow-md pt-16 relative px-4">
      {message && (
        <FeedbackMessage success={messageSuccess} message={message} />
      )}
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold mb-5">Exchange</h1>
        <ExchangeWidget
          rates={rates}
          fromCurrencies={fiatCurrencies}
          toCurrencies={cryptoCurrencies}
          onExchange={(success, message) => showMessage(message, success, 5)}
        />
      </div>
    </header>
  );
}

export default App;
