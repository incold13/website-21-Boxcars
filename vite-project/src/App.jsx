import { Routes, Route } from "react-router-dom";
import "./App.scss";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Page1 from "./components/Page1/Page1.jsx";
import Page2 from "./components/Page2/Page2.jsx";
import Page3 from "./components/Page3/Page3.jsx";
import Page4 from "./components/Page4/Page4.jsx";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" index element={<Page1 />} />
        <Route path="/list" element={<Page2 />} />
        <Route path="/page2" element={<Page2 />} />
        <Route path="/car/:id" element={<Page3 />} />
        <Route path="/detail/:id" element={<Page3 />} />
        <Route path="/page3/:id" element={<Page3 />} />
        <Route path="/page3" element={<Page3 />} />
        <Route path="/blog" element={<Page4 />} />
        <Route path="/page4" element={<Page4 />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;