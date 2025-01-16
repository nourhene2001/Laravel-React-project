import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

function Menu() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("CC_Token");
    setIsAuthenticated(!!token); 
  }, []); 

  const handleLogout = () => {
    localStorage.removeItem("CC_Token");
    localStorage.removeItem("user");
    setIsAuthenticated(false); 
    navigate("/login"); 
  };

  return (
    <Navbar expand="lg" style={styles.navbar}>
      <Container fluid>
        <Navbar.Brand href="#" style={styles.brand}>My Reading List</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: "100px" }} navbarScroll>
            <Nav.Link as={Link} to="/categories" style={styles.navLink}>
              Categories
            </Nav.Link>
            <Nav.Link as={Link} to="/articles" style={styles.navLink}>
              List of Books
            </Nav.Link>

            {isAuthenticated && (
              <Nav.Link as="button" onClick={handleLogout} style={styles.logoutButton}>
                Logout
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

const styles = {
  navbar: {
    backgroundColor: "#4caf50", // Green background
    borderBottom: "2px solid #388e3c", // Slightly darker green border
  },
  brand: {
    color: "#fff", // White text for brand
    fontSize: "24px",
    fontWeight: "bold",
  },
  navLink: {
    color: "#fff", // White text for links
    fontSize: "18px",
    fontWeight: "500",
    padding: "10px 15px",
    textDecoration: "none",
  },
  logoutButton: {
    backgroundColor: "#d32f2f", // Red background for logout button
    color: "#fff", // White text
    fontSize: "18px",
    fontWeight: "500",
    border: "none",
    padding: "8px 15px",
    borderRadius: "5px",
    cursor: "pointer",
    textDecoration: "none",
  },
};

export default Menu;
