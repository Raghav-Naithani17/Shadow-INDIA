import ReportForm from "./components/ReportForm";
import Reports from "./components/Reports";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import Features from "./components/Features";
function App() {
  return (
    <div className="bg-slate-950 min-h-screen">
      <Navbar />
      <Hero />
      <Stats />
      <Features />
      <ReportForm />
      <Reports />
    </div>
  );
}

export default App;