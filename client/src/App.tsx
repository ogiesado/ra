import { ExchangeWidget, FeedbackMessage } from './components';
import { HistoryTable } from './components/history-table';
import { useAppService } from './services';

function App() {
  const {
    fiatCurrencies,
    cryptoCurrencies,
    rates,
    loading,
    message,
    messageSuccess,
    history,
    hasHistory,
    hasNextHistory,
    hasPreviousHistory,
    historyCountText,
    nextHistory,
    previousHistory,
    showMessage,
  } = useAppService();

  if (loading) return <FeedbackMessage success message="Loading..." />;

  return (
    <>
      <header className="lg:h-ra-234-px lg:shadow-md pt-16 relative px-4">
        {message && (
          <FeedbackMessage success={messageSuccess} message={message} />
        )}
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold mb-5">Exchange</h2>
          <ExchangeWidget
            rates={rates}
            fromCurrencies={fiatCurrencies}
            toCurrencies={cryptoCurrencies}
            onExchange={(success, message) => showMessage(message, success, 5)}
          />
        </div>
      </header>
      <main className="container mx-auto mt-10">
        <h2 className="text-2xl font-bold mb-5">History</h2>
        {hasHistory && (
          <HistoryTable
            data={history}
            hasNext={hasNextHistory}
            hasPrevious={hasPreviousHistory}
            onNext={nextHistory}
            onPrevious={previousHistory}
            paginationText={historyCountText}
          />
        )}
      </main>
    </>
  );
}

export default App;
