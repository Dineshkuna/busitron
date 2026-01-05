import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Footer from "./components/Footer";
import Navigation from "./components/Navigation";
import Router from "./routers/Router";

function App() {
  return (
    <>
    <Navigation />
    <Router />
    <Footer />
    
    </>
  );
}

export default App;
