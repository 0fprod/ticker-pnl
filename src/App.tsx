import "./App.css";
import { UserPositions } from "./components/UserPositions";

function App() {
  return (
    <>
      <header className="flex justify-between items-center my-4">
        <h1 className="text-2xl font-bold underline">Tickers' PnL</h1>
      </header>
      <main className="p-4">
        <section className="flex flex-col gap-4 items-start">
          <UserPositions />
        </section>
      </main>
    </>
  );
}

export default App;
