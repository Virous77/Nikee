import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { SearchContextProvider } from "./store/searchContext.tsx";
import { AuthContextProvider } from "./store/authContext.tsx";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { GlobalContextProvider } from "./store/GlobalContext.tsx";
import { CartContextProvider } from "./store/cartContext.tsx";
import { PaymentContextProvider } from "./store/paymentContext.tsx";
import { AdminContextProvider } from "./store/AdminContext.tsx";

const client = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={client}>
        <GlobalContextProvider>
          <SearchContextProvider>
            <AuthContextProvider>
              <CartContextProvider>
                <PaymentContextProvider>
                  <AdminContextProvider>
                    <App />
                  </AdminContextProvider>
                </PaymentContextProvider>
              </CartContextProvider>
              <ReactQueryDevtools />
            </AuthContextProvider>
          </SearchContextProvider>
        </GlobalContextProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
