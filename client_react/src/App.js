import React from "react";
import "materialize-css";
import { BrowserRouter } from "react-router-dom";
import { useRouter } from "./routes";
import { useAuth } from "./hooks/auth.hook";
import { AuthContext } from "./context/AuthContext";
import { Navbar } from "./components/Navbar";

function App() {
  const { token, login, logout, userId } = useAuth();
  const isAuthenticated = !!token;
  const routes = useRouter(isAuthenticated);
  return (
    <AuthContext.Provider
      value={{
        token,
        login,
        logout,
        userId,
        isAuthenticated,
      }}
    >
      <BrowserRouter>
        {isAuthenticated && <Navbar />}
        <div className={"container"}>{routes}</div>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
