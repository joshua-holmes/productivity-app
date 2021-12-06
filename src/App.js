import './App.css';
import { Route, Routes, BrowserRouter } from "react-router-dom";
import SideNav from "./components/SideNav";

import NavBar from "./components/NavBar";
import Dashboard from "./components/Dashboard";
import Budget from "./components/Budget";
import Retirement from "./components/Retirement";
import ProsCons from "./components/ProsCons";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <SideNav >
                    <Routes>
                        <Route path="/" element={<Dashboard />}/>
                        <Route path="/budget" element={<Budget />}/>
                        <Route path="/retirement" element={<Retirement />}/>
                        <Route path="/pros-cons" element={<ProsCons />}/>
                    </Routes>
                </SideNav>
            </BrowserRouter>
        </div>
    );
}

export default App;
