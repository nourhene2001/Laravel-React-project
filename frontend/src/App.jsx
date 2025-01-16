import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react"; // Import hooks for state and effect
import Listarticles from "./components/articles/Listarticles";
import Listcategories from "./components/categories/Listcategories";
import BooksByCategory from "./components/categories/BooksByCategory";
import Insertarticle from "./components/articles/Insertarticle";
import Editarticle from "./components/articles/Editarticle";
import { CartProvider } from "use-shopping-cart";
import Login from './components/authentification/login';
import Dashboard from './components/admin/dashboard';
import Logout from './components/authentification/logout';
import Register from './components/authentification/register';
import ProtectedRoutes from './ProtectedRoutes'; 
import Menu from './components/Menu'; 

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("CC_Token");
    if (token) {
      setIsAuthenticated(true); 
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  // Handle logout by clearing the authentication state
  const handleLogout = () => {
    localStorage.removeItem("CC_Token"); // Remove token from localStorage
    setIsAuthenticated(false); // Update authentication state
  };

  return (
    <div>
      <CartProvider>
        <Router>
          {/* Only render the Menu if the user is authenticated */}
          {isAuthenticated && <Menu isAuthenticated={isAuthenticated} onLogout={handleLogout} />}
          
          <Routes>
            <Route path="/articles" element={<Listarticles />} />
            <Route path="/categories" element={<Listcategories />} />
            <Route path="/books/add" element={<Insertarticle />} />
            <Route path="/books/edit/:id" element={<Editarticle />} />
            <Route path="/categories/:id/article" element={<BooksByCategory />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} /> {/* Pass handleLogin */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/logout" element={<Logout onLogout={handleLogout} />} /> {/* Pass handleLogout */}
            <Route path="/register" element={<Register />} />
            
            {/* Protect routes */}
            <Route element={<ProtectedRoutes isAuthenticated={isAuthenticated} />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
          </Routes>
        </Router>
      </CartProvider>
    </div>
  );
};

export default App;
