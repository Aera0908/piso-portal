import "./App.css";
import Header from "./components/Header.jsx";
import Content from "./components/Content.jsx";
import Footer from "./components/Footer.jsx";
import Banner from "./components/Banner";

function App() {
  return (
    <div className="border-x-1 border-[#e6e6e6] shadow-[0px_4px_16px_0px_rgba(0,_0,_0,_0.1)]">
      <Header />
      <Banner />
      <Content />
      <Footer />
    </div>
  );
}

export default App;
