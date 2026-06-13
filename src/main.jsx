import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";   
import { AppRouter } from "./router/index.jsx";
import "./styles/globals.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>                                     
        <AppRouter />
      </AuthProvider>                                
    </ThemeProvider>
  </React.StrictMode>
);