import './App.css';
import { Route, Routes, BrowserRouter } from "react-router-dom";

import NavBar from "./components/NavBar";
import Dashboard from "./components/Dashboard";
import Budget from "./components/Budget";
import Retirement from "./components/Retirement";
import ProsCons from "./components/ProsCons";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <NavBar />
                <Routes>
                    <Route path="/" element={<Dashboard />}/>
                    <Route path="/budget" element={<Budget />}/>
                    <Route path="/retirement" element={<Retirement />}/>
                    <Route path="/pros-cons" element={<ProsCons />}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
