import { lazy, StrictMode, Suspense, type ReactNode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./styles/main.scss";
import ErrorBoundary from "./components/shared/ErrorBoundary/index.tsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Navigate,
} from "react-router";
import Home from "./components/pages/Home";
import { Provider } from "react-redux";
import store from "./redux/store/index.tsx";
import Profile from "./components/pages/Auth/Profile/index.tsx";
import Jyotirling from "./components/pages/Jyotirling/index.tsx";
import Gallery from "./components/pages/Gallery/index.tsx";
import Loader from "./components/shared/Loader/index.tsx";
import ProductDetail from "./components/pages/Products/ProductDetail.tsx";
import Contact from "./components/pages/Contact/index.tsx";
import Blog from "./components/pages/Blog/index.tsx";
import NotFound from "./components/pages/NotFound/index.tsx";
import VerifyEmail from "./components/pages/Auth/VerifyEmail/index.tsx";
import ResetPassword from "./components/pages/Auth/ResetPassword/index.tsx";
import AccountSettings from "./components/pages/Auth/AccountSettings/index.tsx";
const Products = lazy(() => import("./components/pages/Products"));
const WelcomeUser = lazy(() => import("./components/pages/Auth/WelcomeUser"));
const LoggedOut = lazy(() => import("./components/pages/Auth/LoggedOut"));


const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  if (!localStorage.getItem("token")) {
    return <Navigate to="/" replace />;
  }
  return children;
};



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="/VerifyEmail/:token" element={<VerifyEmail />} />
      <Route path="/ResetPassword/:token" element={<ResetPassword />} />
      {/* <Route path="/Profile" element={<Profile />} /> */}
      <Route
        path="/Profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/AccountSettings"
        element={
          <ProtectedRoute>
            <AccountSettings />
          </ProtectedRoute>
        }
      />
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
      <Route
        path="/Welcome"
        element={
          <Suspense
            fallback={
              <>
                <Loader />
              </>
            }
          >
            <WelcomeUser />
          </Suspense>
        }
      />
      <Route
        path="/LoggedOut"
        element={
          <Suspense
            fallback={
              <>
                <Loader />
              </>
            }
          >
            <LoggedOut />
          </Suspense>
        }
      />
      <Route path="/Product/:id" element={<ProductDetail />} />
      <Route path="/Jyotirling" element={<Jyotirling />} />
      {/* <Route path="/Gallery" element={<Gallery />} /> */}
      <Route
        path="/Gallery"
        element={
          <ProtectedRoute>
            <Gallery />
          </ProtectedRoute>
        }
      />
      <Route path="/Contact" element={<Contact />} />
      <Route path="/Blog" element={<Blog />} />
      <Route path="*" element={<NotFound />} />
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
