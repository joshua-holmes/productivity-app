import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import SideNav from "./components/SideNav";
import { useEffect, useState } from "react";

import Dashboard from "./components/Dashboard";
import Budget from "./components/Budget";
import Retirement from "./components/Retirement";
import ProsCons from "./components/ProsCons";
import Stocks from "./components/Stocks";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { purple } from "@mui/material/colors";

// theme capabilites
// reference https://mui.com/customization/color/#main-content
// reference https://mui.com/customization/theming/#theme-provider
const theme = createTheme({
  palette: {
    primary: {
      main: purple[800],
    },
    secondary: {
      main: "#f44336", // didn't specify
    },
  },
});

function App() {
  const [stockFaves, setStockFaves] = useState([]);
  const [stocksData, setStocksData] = useState([]);

  useEffect(() => {
    // initial fetch for favorites only
    fetch("http://localhost:3000/favStocks")
      .then((response) => response.json())
      .then((data) => {
        setStockFaves(data);
      });
  }, []);

  useEffect(() => {
    // initial fetch for all stocks
    fetch("https://api.coinstats.app/public/v1/coins?skip=0&limit=10")
      .then((response) => response.json())
      .then((obj) => {
        setStocksData(obj.coins);
      });
  }, []);

  function handleFave(obj, newValue) {

    if (newValue === 1) { // do if favorited
      fetch('http://localhost:3000/favStocks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj),
      })
      .then(response => response.json())
      .then(data => {
        setStockFaves([...stockFaves, data]); // front end
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    } else {
      const filteredFaves = stockFaves.filter((item) => item.id !== obj.id);
      // setStockFaves(filteredFaves); // front end
      fetch("http://localhost:3000/favStocks/" + obj.id, {
        // back end
        method: "DELETE",
      })
        .then((res) => res.text())
        .then(() => {setStockFaves(filteredFaves)}) // front end
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  }

  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <SideNav>
            <Routes>
              <Route
                path="/"
                element={
                  <Dashboard stockFaves={stockFaves} handleFave={handleFave} />
                }
              />
              <Route path="/budget" element={<Budget />} />
              <Route path="/retirement" element={<Retirement />} />
              <Route path="/pros-cons" element={<ProsCons />} />
              <Route
                path="/stocks"
                element={
                  <Stocks stockFaves={stockFaves} stocksData={stocksData} handleFave={handleFave} />
                }
              />
            </Routes>
          </SideNav>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
