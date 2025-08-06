import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "./components/Layout/MainLayout";
import Home from "./pages/Home";
import AnimePage from "./pages/AnimePage";
import Browse from "./pages/Browse";
import AuthPage from "./pages/AuthPage";
import UserLayout from "./pages/UserLayout";
import Profile from "./components/UserLayout/Profile";
import Watchlists from "./components/UserLayout/Watchlists";
import Search from "./pages/Search";
import Settings from "./components/UserLayout/Settings";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/search" element={<Search />} />
        <Route path="/anime/:id" element={<AnimePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/user" element={<UserLayout />}>
          <Route index element={<Navigate to="profile" replace />} />
          <Route path="profile" element={<Profile />} />
          <Route path="watchlists" element={<Watchlists />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </MainLayout>
  );
}

export default App;
