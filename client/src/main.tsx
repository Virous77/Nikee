import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { SearchContextProvider } from "./store/searchContext.tsx";
import { AuthContextProvider } from "./store/authContext.tsx";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const client = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={client}>
        <SearchContextProvider>
          <AuthContextProvider>
            <App />
            <ReactQueryDevtools />
          </AuthContextProvider>
        </SearchContextProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
