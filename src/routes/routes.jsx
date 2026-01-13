// src/routes/routes.jsx
import Layout from "../Components/Layout";
import Home from "../Pages/Home";
import BLT from "../Pages/BLT";
import NotFound from "../Pages/NotFound";
import LoginPage from "../Pages/LoginPage";
import SignOutPage from "../Pages/SignOutPage";
import ResetPasswordPage from "../Pages/ResetPasswordPage";
import SignedOutPage from "../Pages/SignedOutPage";
import MediaGallery from "../Pages/MediaGallery";
import ChatBot from "../Pages/ChatBot";
import ComingSoon from "../Pages/ComingSoon";
import AboutUs from "../Pages/AboutUs"; 
import AdminDashboard from "../Pages/AdminDashboard";
import AssetTimeline from "../Pages/AssetTimeline";
import FurnaceOverview from "../Pages/FurnaceOverview";
import HotBlastfurnace from "../Pages/HotBlast";
import TuyereNose from "../Pages/TuyereNose";
import TuyereNose2 from "../Pages/TuyereNose2"; // ✅ Tuyere Nose System 2
import OverallStatus from "../Pages/OverallStatus";
import HealthStatus from "../Pages/HealthStatus";
import ProtectedRoute from "../Components/ProtectedRoute";

const routes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { 
        path: "", 
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ) 
      },
      { 
        path: "blast-furnace/bf1/", 
        element: (
          <ProtectedRoute>
            <BLT />
          </ProtectedRoute>
        ) 
      },
      { 
        path: "blast-furnace/bf1/BLT", 
        element: (
          <ProtectedRoute>
            <BLT />
          </ProtectedRoute>
        ) 
      },
      { 
        path: "blast-furnace/bf1/about", 
        element: (
          <ProtectedRoute>
            <AboutUs />
          </ProtectedRoute>
        ) 
      },
      { 
        path: "blast-furnace/bf1/media-gallery", 
        element: (
          <ProtectedRoute>
            <MediaGallery />
          </ProtectedRoute>
        ) 
      },
      { 
        path: "blast-furnace/bf1/chatbot", 
        element: (
          <ProtectedRoute>
            <ChatBot />
          </ProtectedRoute>
        ) 
      },
      { 
        path: "blast-furnace/bf1/asset-timeline", 
        element: (
          <ProtectedRoute>
            <AssetTimeline />
          </ProtectedRoute>
        ) 
      },

      { 
        path: "blast-furnace/bf2", 
        element: (
          <ProtectedRoute>
            <ComingSoon />
          </ProtectedRoute>
        ) 
      },

      // Caster Routes
      { 
        path: "caster/c1", 
        element: (
          <ProtectedRoute>
            <ComingSoon />
          </ProtectedRoute>
        ) 
      },
      { 
        path: "caster/c2", 
        element: (
          <ProtectedRoute>
            <ComingSoon />
          </ProtectedRoute>
        ) 
      },
      { 
        path: "caster/c3", 
        element: (
          <ProtectedRoute>
            <ComingSoon />
          </ProtectedRoute>
        ) 
      },

      // BOF Routes
      { 
        path: "bof/bof1", 
        element: (
          <ProtectedRoute>
            <ComingSoon />
          </ProtectedRoute>
        ) 
      },
      { 
        path: "bof/bof3", 
        element: (
          <ProtectedRoute>
            <ComingSoon />
          </ProtectedRoute>
        ) 
      },
      { 
        path: "bof/bof2", 
        element: (
          <ProtectedRoute>
            <ComingSoon />
          </ProtectedRoute>
        ) 
      },

      // Furnace Routes
      { 
        path: "furnace/overview", 
        element: (
          <ProtectedRoute>
            <FurnaceOverview />
          </ProtectedRoute>
        ) 
      },
      { 
        path: "furnace/hot-blast-flow", 
        element: (
          <ProtectedRoute>
            <HotBlastfurnace />
          </ProtectedRoute>
        ) 
      },
      { 
        path: "furnace/tuyere-nose-system-1", 
        element: (
          <ProtectedRoute>
            <TuyereNose />
          </ProtectedRoute>
        ) 
      },
      { 
        path: "furnace/tuyere-nose-system-2", 
        element: (
          <ProtectedRoute>
            <TuyereNose2 />
          </ProtectedRoute>
        ) 
      },

      // Admin Routes
      { 
        path: "admin-dashboard", 
        element: (
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        ) 
      },
      { 
        path: "overall-status", 
        element: (
          <ProtectedRoute>
            <OverallStatus />
          </ProtectedRoute>
        ) 
      },
      { 
        path: "health-status", 
        element: (
          <ProtectedRoute>
            <HealthStatus />
          </ProtectedRoute>
        ) 
      },
      
      { 
        path: "*", 
        element: (
          <ProtectedRoute>
            <NotFound />
          </ProtectedRoute>
        ) 
      },
    ],
  },
  { path: "/login", element: <LoginPage /> },
  { path: "/signout", element: <SignOutPage /> },
  { path: "/reset", element: <ResetPasswordPage /> },
  { path: "/signedout", element: <SignedOutPage /> },
  
];

export default routes;
