import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { navItems } from "./nav-items";

const queryClient = new QueryClient();

const Navbar = () => (
  <nav className="bg-gray-800 text-white p-4">
    <div className="container mx-auto flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">Reddit Clone</Link>
      <ul className="flex space-x-4">
        {navItems.map(({ title, to, icon }) => (
          <li key={to}>
            <Link to={to} className="flex items-center hover:text-gray-300">
              {icon}
              <span className="ml-2">{title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </nav>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <Navbar />
        <Routes>
          {navItems.map(({ to, page }) => (
            <Route key={to} path={to} element={page} />
          ))}
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;