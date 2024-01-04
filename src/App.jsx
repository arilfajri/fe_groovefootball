import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./page/Home";
import Dribbling from "./page/Dribbling";
import Login from "./page/Login";
import Dashboard from "./page/Dashboard";
import Edit from "./page/Edit";
import Passing from "./page/Passing";
import Shooting from "./page/Shooting";
import Tackling from "./page/Tackling";
import Stop from "./page/Stop";
import Detail from "./page/Detail";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dribbling" element={<Dribbling />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/passing" element={<Passing />} />
          <Route path="/shooting" element={<Shooting />} />
          <Route path="/tackling" element={<Tackling />} />
          <Route path="/stop" element={<Stop />} />
          <Route path="/detail/:id" element={<Detail />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
