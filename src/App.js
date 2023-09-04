import './App.css';
import Header from './Components/header';
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Home from './Components/home';
import Cart from './Components/cart';




function App() {
  return (
    <div className='App'>
      <Router>
          <Header />
          <Routes>
              <Route path="/" exact element={<Home />} />
              <Route path="/cart" element={<Cart />} />
          </Routes>
      </Router>
    </div>
  );
}

export default App;
