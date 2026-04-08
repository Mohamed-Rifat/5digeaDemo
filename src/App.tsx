import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./Pages/MainLayout/MainLayout";
import NotFound from "./Pages/NotFound/NotFound";
import Home from "./Pages/Home/Home";
import Services from "./Pages/Services/Services";
import About from "./Pages/About/About";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/register";
import ForgetPassword from "./Pages/Auth/ForgotPassword";
import ResetPassword from "./Pages/Auth/ResetPassword";
import VerifyCode from "./Pages/Auth/VerifyResetCode";
import Favorite from "./Pages/Favorite/Favorite";
import OurPartners from "./Pages/OurPartners/OurPartners";
import { FavoritesProvider } from "./context/FavoritesContext"; 
import Profile from "./Pages/Profile/Profile";

function Dashboard() {
  return <h2 className="text-2xl p-6 ">📊 لوحة التحكم</h2>;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> }, 
      { path: "about", element: <About /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "profile", element: <Profile /> },
      { path: "favorite", element: <Favorite /> },
      { path: "our-partners", element: <OurPartners /> },
      { path: "services", element: <Services /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "forgot-password", element: <ForgetPassword /> },
      { path: "reset-password", element: <ResetPassword /> },
      { path: "verifyCode", element: <VerifyCode /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default function App() {
  return (
    <FavoritesProvider>
      <RouterProvider router={router} />
    </FavoritesProvider>
  );
}