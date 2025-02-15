import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import NotFound from "./pages/NotFound";
import { DarkModeProvier } from "./context/DarkModeContext";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AdminLayout from "./features/admin/AdminLayout";
import CategoriesTab from "./pages/tabs/CategoriesTab";
import ProductsTab from "./pages/tabs/ProductsTab";
import SignupPage from "./pages/SignupPage";
import SigninPage from "./pages/SigninPage";
import OrdersTab from "./pages/tabs/OrdersTab";

const queryClient = new QueryClient();

function App() {
  return (
    <DarkModeProvier>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <Toaster />
        <HashRouter>
          <Routes>
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/signin" element={<SigninPage />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Navigate to="category" replace />} />
              <Route path="category" element={<CategoriesTab />} />
              <Route path="products" element={<ProductsTab />} />
              <Route path="orders" element={<OrdersTab />} />
            </Route>
            <Route
              path="/"
              element={<Navigate to="admin/category" replace />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </HashRouter>
      </QueryClientProvider>
    </DarkModeProvier>
  );
}

export default App;
