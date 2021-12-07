import './App.css';
import { Route, Routes, BrowserRouter } from "react-router-dom";
import SideNav from "./components/SideNav";

import Dashboard from "./components/Dashboard";
import Budget from "./components/Budget";
import Retirement from "./components/Retirement";
import ProsCons from "./components/ProsCons";
import Stocks from "./components/Stocks"

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { purple } from '@mui/material/colors';


// theme capabilites
// reference https://mui.com/customization/color/#main-content
// reference https://mui.com/customization/theming/#theme-provider 
const theme = createTheme({
    palette: {
      primary: {
        main: purple[800],
      },
      secondary: {
        main: '#f44336', // didn't specify
      },
    },
  });

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    <SideNav >
                        <Routes>
                            <Route path="/" element={<Dashboard />}/>
                            <Route path="/budget" element={<Budget />}/>
                            <Route path="/retirement" element={<Retirement />}/>
                            <Route path="/pros-cons" element={<ProsCons />}/>
                            <Route path="/stocks" element={<Stocks />}/>
                        </Routes>
                    </SideNav>
                </ThemeProvider>
            </BrowserRouter>
        </div>
    );
}

export default App;
