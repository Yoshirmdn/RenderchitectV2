import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { Layout } from "../components/layout/Layout";
import { Loader } from "../components/ui/Loader";
import { useAuth } from "../context/AuthContext";

// ── Public Pages ──────────────────────────────────────────────────────────────
const Home            = lazy(() => import("../pages/Home"));
const About           = lazy(() => import("../pages/About"));
const Services        = lazy(() => import("../pages/Services"));
const Projects        = lazy(() => import("../pages/Projects"));
const ProjectDetail   = lazy(() => import("../pages/ProjectDetail"));
const Contact         = lazy(() => import("../pages/Contact"));
const Cart            = lazy(() => import("../pages/Cart"));
const Checkout      = lazy(() => import("../pages/Checkout"));
const Wishlist        = lazy(() => import("../pages/Wishlist"));
const Login           = lazy(() => import("../pages/Login"));
const TrackOrder      = lazy(() => import("../pages/TrackOrder"));
const NotFound        = lazy(() => import("../pages/NotFound"));
const SellOnArchvault = lazy(() => import("../pages/SellOnArchvault"));
const Blog            = lazy(() => import("../pages/Blog"));
const BlogDetail      = lazy(() => import("../pages/BlogDetail"));
const Careers         = lazy(() => import("../pages/Careers"));
const RefundPolicy    = lazy(() => import("../pages/RefundPolicy"));

// ── Admin Pages ───────────────────────────────────────────────────────────────
const AdminLayout     = lazy(() => import("../pages/admin/AdminLayout"));
const AdminDashboard  = lazy(() => import("../pages/admin/AdminDashboard"));
const AdminProjects   = lazy(() => import("../pages/admin/AdminProjects"));
const AdminOrders     = lazy(() => import("../pages/admin/AdminOrders"));
const AdminUsers      = lazy(() => import("../pages/admin/AdminUsers"));
const AdminSellers    = lazy(() => import("../pages/admin/AdminSellers"));
const AdminSettings   = lazy(() => import("../pages/admin/AdminSettings"));

// ── User Pages ────────────────────────────────────────────────────────────────
const UserLayout      = lazy(() => import("../pages/user/UserLayout"));
const UserDashboard   = lazy(() => import("../pages/user/UserDashboard"));
const UserOrders      = lazy(() => import("../pages/user/UserOrders"));
const UserDownloads   = lazy(() => import("../pages/user/UserDownloads"));
const UserWishlist    = lazy(() => import("../pages/user/UserWishlist"));
const UserSettings    = lazy(() => import("../pages/user/UserSettings"));

// ── Helpers ───────────────────────────────────────────────────────────────────
const S = (el) => <Suspense fallback={<Loader fullScreen />}>{el}</Suspense>;

// ProtectedRoute harus didefinisikan SEBELUM router
function ProtectedRoute({ children, roles = [] }) {
  const { user, isLoggedIn } = useAuth();
  if (!isLoggedIn) return <Navigate to="/login" replace />;
  if (roles.length > 0 && !roles.includes(user?.role))
    return <Navigate to="/" replace />;
  return children;
}

// ── Router ────────────────────────────────────────────────────────────────────
const router = createBrowserRouter([

  // 1️⃣ PUBLIC — pakai Layout (Navbar + Footer + Chatbot)
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true,            element: S(<Home />) },
      { path: "about",          element: S(<About />) },
      { path: "services",       element: S(<Services />) },
      { path: "projects",       element: S(<Projects />) },
      { path: "projects/:slug", element: S(<ProjectDetail />) },
      { path: "contact",        element: S(<Contact />) },
      { path: "cart",           element: S(<Cart />) },
      { path: "checkout",       element: S(<Checkout />) },
      { path: "wishlist",       element: S(<Wishlist />) },
      { path: "sell",           element: S(<SellOnArchvault />) },
      { path: "blog",           element: S(<Blog />) },
      { path: "blog/:slug",     element: S(<BlogDetail />) },
      { path: "careers",        element: S(<Careers />) },
      { path: "track-order",    element: S(<TrackOrder />) },
      { path: "refund",         element: S(<RefundPolicy />) },
      { path: "*",              element: S(<NotFound />) },
    ],
  },

  // 2️⃣ LOGIN — standalone, tanpa Layout
  {
    path: "/login",
    element: S(<Login />),
  },

  // 3️⃣ ADMIN — layout sendiri, TIDAK di dalam Layout publik
  {
    path: "/admin",
    element: (
      <ProtectedRoute roles={["ADMIN"]}>
        {S(<AdminLayout />)}
      </ProtectedRoute>
    ),
    children: [
      { index: true,      element: S(<AdminDashboard />) },
      { path: "projects", element: S(<AdminProjects />) },
      { path: "orders",   element: S(<AdminOrders />) },
      { path: "users",    element: S(<AdminUsers />) },
      { path: "sellers",  element: S(<AdminSellers />) },
      { path: "settings", element: S(<AdminSettings />) },
    ],
  },

  // 4️⃣ USER — layout sendiri, TIDAK di dalam Layout publik
  {
    path: "/user",
    element: (
      <ProtectedRoute roles={["BUYER", "SELLER", "ADMIN"]}>
        {S(<UserLayout />)}
      </ProtectedRoute>
    ),
    children: [
      { index: true,        element: S(<UserDashboard />) },
      { path: "orders",     element: S(<UserOrders />) },
      { path: "downloads",  element: S(<UserDownloads />) },
      { path: "wishlist",   element: S(<UserWishlist />) },
      { path: "settings",   element: S(<UserSettings />) },
    ],
  },

]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}