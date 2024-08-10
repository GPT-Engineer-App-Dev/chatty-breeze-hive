import { Home, PlusCircle } from "lucide-react";
import Home from "./pages/Home.jsx";
import CreatePost from "./pages/CreatePost.jsx";

/**
 * Central place for defining the navigation items. Used for navigation components and routing.
 */
export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <Home className="h-4 w-4" />,
    page: <Home />,
  },
  {
    title: "Create Post",
    to: "/create",
    icon: <PlusCircle className="h-4 w-4" />,
    page: <CreatePost />,
  },
];
