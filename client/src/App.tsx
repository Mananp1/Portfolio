import Contact from "./components/Contact";
import Home from "./components/Home";
import Navbar from "./components/Navbar/Navbar";
import Projects from "./components/Projects";
import { Toaster } from "sonner";

const App = () => {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden pt-16">
      <Navbar />
      <Home />
      <Projects />
      <Contact />
      <Toaster />
    </main>
  );
};

export default App;
