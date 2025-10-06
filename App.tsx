// App.tsx
import React from "react";
import { StockProvider } from "./src/context/StockContext";
import { UserProvider } from "./src/context/UserContext";
import AppNavigator from "./src/navigation/AppNavigator";

export default function App() {
  return (
    <UserProvider>
      <StockProvider>
        <AppNavigator />
      </StockProvider>
    </UserProvider>
  );
}
