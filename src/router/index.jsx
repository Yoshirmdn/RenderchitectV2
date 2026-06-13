import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "../components/layout/Layout";
import { Loader } from "../components/ui/Loader";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const Home = lazy(() => import("../pages/Home"));
const About = lazy(() => import("../pages/About"));
const Services = lazy(() => import("../pages/Services"));
const Projects = lazy(() => import("../pages/Projects"));
const ProjectDetail = lazy(() => import("../pages/ProjectDetail"));
const Contact = lazy(() => import("../pages/Contact"));
const Cart = lazy(() => import("../pages/Cart"));
const Wishlist = lazy(() => import("../pages/Wishlist"));
const Login = lazy(() => import("../pages/Login"));
const TrackOrder = lazy(() => import("../pages/TrackOrder"));
const NotFound = lazy(() => import("../pages/NotFound"));
const SellOnArchvault = lazy(() => import("../pages/SellOnArchvault"));
const Blog = lazy(() => import("../pages/Blog"));
const Careers = lazy(() => import("../pages/Careers"));
const RefundPolicy = lazy(() => import("../pages/RefundPolicy"));

const AdminLayout      = lazy(() => import("../pages/admin/AdminLayout"));
const AdminDashboard   = lazy(() => import("../pages/admin/AdminDashboard"));
const AdminProjects    = lazy(() => import("../pages/admin/AdminProjects"));
const AdminOrders      = lazy(() => import("../pages/admin/AdminOrders"));
const AdminUsers       = lazy(() => import("../pages/admin/AdminUsers"));
const AdminSellers     = lazy(() => import("../pages/admin/AdminSellers"));
const AdminSettings    = lazy(() => import("../pages/admin/AdminSettings"));

const UserLayout       = lazy(() => import("../pages/user/UserLayout"));
const UserDashboard    = lazy(() => import("../pages/user/UserDashboard"));
const UserOrders       = lazy(() => import("../pages/user/UserOrders"));
const UserDownloads    = lazy(() => import("../pages/user/UserDownloads"));
const UserWishlist     = lazy(() => import("../pages/user/UserWishlist"));
const UserSettings     = lazy(() => import("../pages/user/UserSettings"));

const withSuspense = (el) => <Suspense fallback={<Loader fullScreen />}>{el}</Suspense>;

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: withSuspense(<Home />) },
      { path: "about", element: withSuspense(<About />) },
      { path: "services", element: withSuspense(<Services />) },
      { path: "projects", element: withSuspense(<Projects />) },
      { path: "projects/:slug", element: withSuspense(<ProjectDetail />) },
      { path: "contact", element: withSuspense(<Contact />) },
      { path: "cart", element: withSuspense(<Cart />) },
      { path: "wishlist", element: withSuspense(<Wishlist />) },
      { path: "sell", element: withSuspense(<SellOnArchvault />) },
      { path: "blog", element: withSuspense(<Blog />) },
      { path: "careers", element: withSuspense(<Careers />) },
      { path: "track-order", element: withSuspense(<TrackOrder />) },
      { path: "refund", element: withSuspense(<RefundPolicy />) },
      { path: "*", element: withSuspense(<NotFound />) },

{
  path: "/admin",
  element: (
    <ProtectedRoute roles={["ADMIN"]}>
      {withSuspense(<AdminLayout />)}
    </ProtectedRoute>
  ),
  children: [
          { index: true,           element: withSuspense(<AdminDashboard />) },
          { path: "projects",      element: withSuspense(<AdminProjects />) },
          { path: "orders",        element: withSuspense(<AdminOrders />) },
          { path: "users",         element: withSuspense(<AdminUsers />) },
          { path: "sellers",       element: withSuspense(<AdminSellers />) },
          { path: "settings",      element: withSuspense(<AdminSettings />) },
        ],
      },


      {
         path: "/user",
  element: (
    <ProtectedRoute roles={["BUYER", "SELLER", "ADMIN"]}>
      {withSuspense(<UserLayout />)}
    </ProtectedRoute>
  ),
  children: [
          { index: true,           element: withSuspense(<UserDashboard />) },
          { path: "orders",        element: withSuspense(<UserOrders />) },
          { path: "downloads",     element: withSuspense(<UserDownloads />) },
          { path: "wishlist",      element: withSuspense(<UserWishlist />) },
          { path: "settings",      element: withSuspense(<UserSettings />) },
        ],
      },
      
    ],
  },
  { path: "/login", element: withSuspense(<Login />) },
]);

function ProtectedRoute({ children, roles = [] }) {
  const { user, isLoggedIn } = useAuth();
  if (!isLoggedIn) return <Navigate to="/login" replace />;
  if (roles.length > 0 && !roles.includes(user?.role))
    return <Navigate to="/" replace />;
  return children;
}

export function AppRouter() {
  return <RouterProvider router={router} />;
}
