import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./styles/main.scss";
import ErrorBoundary from "./components/shared/ErrorBoundary/index.tsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router";
import Home from "./components/pages/Home";
import { Provider } from "react-redux";
import store from "./redux/store/index.tsx";
import Profile from "./components/pages/Auth/Profile.tsx";
import Jyotirling from "./components/pages/Jyotirling/index.tsx";
import Gallery from "./components/pages/Gallery/index.tsx";
import Loader from "./components/shared/Loader/index.tsx";
import ProductDetail from "./components/pages/Products/ProductDetail.tsx";
const Products = lazy(() => import("./components/pages/Products"));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="/Profile" element={<Profile />} />
      <Route
        path="/Products"
        element={
          <Suspense
            fallback={
              <>
                <Loader />
              </>
            }
          >
            <Products />
          </Suspense>
        }
      />
      <Route path="/Product/:id" element={<ProductDetail />} />
      <Route path="/Jyotirling" element={<Jyotirling />} />
      <Route path="/Gallery" element={<Gallery />} />
      <Route path="*" element={<h1>404 - Page Not Found</h1>} />
    </Route>
  )
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ErrorBoundary fallback={<div>Custom error UI 🛠️</div>}>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </Provider>
  </StrictMode>
);
