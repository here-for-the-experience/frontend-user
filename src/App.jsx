import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import Verify from "./Verify";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="verify" element={<Verify />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
