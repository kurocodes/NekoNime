import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { GeneralProvider } from "./context/GeneralContext.jsx";
import { AnimeDetailsProvider } from "./context/AnimeDetailsContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { ListProvider } from "./context/listContext.jsx";
import { UserProvider } from "./context/userContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <ListProvider>
          <AuthProvider>
            <GeneralProvider>
              <AnimeDetailsProvider>
                <App />
              </AnimeDetailsProvider>
            </GeneralProvider>
          </AuthProvider>
        </ListProvider>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>
);
