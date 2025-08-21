import AppRoutes from "./routes/AppRoutes";

import { BrowserRouter } from "react-router-dom";

import { AuthProvider } from "./contexts/AuthProvider";
import UserProvider from "./contexts/UserProvider";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <UserProvider>
            <AppRoutes />
          </UserProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
