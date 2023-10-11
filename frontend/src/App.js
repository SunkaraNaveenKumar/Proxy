import Header from "./components/Header";
import Navigation from "./components/Navigations";
import Footer from "./components/reusable components/footer/Footer";

function App() {
  console.log("app");
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Navigation />
      <Footer />
    </div>
  );
}

export default App;
