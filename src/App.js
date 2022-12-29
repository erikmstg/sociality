import Homepage from "../src/layouts/Homepage";
import Loginpage from "./layouts/Loginpage";
import Profilepage from "./layouts/Profilepage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
/* 4 */
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme.js";

function App() {
  // grab the value that created from initialState
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.user));

  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route
              path="/"
              element={!isAuth ? <Loginpage /> : <Navigate to="/home" />}
            />
            <Route
              path="/home"
              element={isAuth ? <Homepage /> : <Navigate to="/" />}
            />
            <Route
              path="/profile/:userId"
              element={isAuth ? <Profilepage /> : <Navigate to="/" />}
            />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
