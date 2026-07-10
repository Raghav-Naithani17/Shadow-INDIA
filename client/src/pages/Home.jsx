import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Stats from "../components/Stats";
import ReportForm from "../components/ReportForm";
import Reports from "../components/Reports";

function Home() {
  return (
    <div className="bg-slate-950 min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <Stats />
      <ReportForm />
      <Reports />
    </div>
  );
}

export default Home;