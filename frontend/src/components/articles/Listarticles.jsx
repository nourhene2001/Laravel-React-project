import axios from "axios";
import { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import { Link } from "react-router-dom";

const ListArticles = () => {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchArticles = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/articles");
      setArticles(res.data);
      setFilteredArticles(res.data); // Initialize filtered articles
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching articles:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      try {
        await axios.delete(`http://localhost:8000/api/articles/${id}`);
        const updatedArticles = articles.filter((art) => art.id !== id);
        setArticles(updatedArticles);
        setFilteredArticles(updatedArticles); // Update filtered articles
      } catch (error) {
        console.error("Error deleting book:", error);
      }
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = articles.filter(
      (art) =>
        art.title.toLowerCase().includes(term) ||
        art.author.toLowerCase().includes(term) ||
        art.scategorie?.nomscategorie?.toLowerCase().includes(term) ||
        art.status.toLowerCase().includes(term)
    );
    setFilteredArticles(filtered);
  };

  if (isLoading) {
    return (
      <div style={styles.loadingContainer}>
        <ReactLoading type="spokes" color="#4caf50" height={100} width={100} />
        <p style={styles.loadingText}>Fetching books, please wait...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Welcome to Your Reading List! 📚</h1>
      <p style={styles.subtitle}>
        Manage your books and keep everything organized!
      </p>
      <div style={styles.searchContainer}>
        <input
          type="text"
          style={styles.searchInput}
          placeholder="Search for a book by title, author, status and genre ..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <Link to="/books/add">
        <button style={styles.addButton}>
          <i className="fa-solid fa-square-plus"></i> Add New Book
        </button>
      </Link>
      <table style={styles.table}>
        <thead>
          <tr>
            <th>Reference</th>
            <th>Title</th>
            <th>Author</th>
            <th>Genre</th>
            <th>Status</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {filteredArticles.map((art, index) => (
            <tr key={index}>
              <td>{art.isbn}</td>
              <td>{art.title}</td>
              <td>{art.author}</td>
              <td>{art.scategorie?.nomscategorie || "N/A"}</td>
              <td>{art.status}</td>
              <td>
                <Link to={`/books/edit/${art.id}`}>
                  <button style={styles.updateButton}>
                    <i className="fa-solid fa-pen-to-square"></i> Update
                  </button>
                </Link>
              </td>
              <td>
                <button
                  style={styles.deleteButton}
                  onClick={() => handleDelete(art.id)}
                >
                  <i className="fa-solid fa-trash"></i> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    fontFamily: "'Arial', sans-serif",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  title: {
    fontSize: "2rem",
    color: "#4caf50",
    textAlign: "center",
    marginBottom: "10px",
  },
  subtitle: {
    fontSize: "1.2rem",
    color: "#555",
    textAlign: "center",
    marginBottom: "20px",
  },
  searchContainer: {
    textAlign: "center",
    marginBottom: "20px",
  },
  searchInput: {
    padding: "10px",
    fontSize: "1rem",
    width: "80%",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  addButton: {
    display: "block",
    margin: "10px auto 20px",
    padding: "10px 20px",
    fontSize: "1rem",
    color: "#fff",
    backgroundColor: "#4caf50",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "20px",
  },
  updateButton: {
    padding: "5px 10px",
    color: "#fff",
    backgroundColor: "#ffa726",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  deleteButton: {
    padding: "5px 10px",
    color: "#fff",
    backgroundColor: "#f44336",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  loadingContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
  },
  loadingText: {
    marginTop: "10px",
    fontSize: "1.2rem",
    color: "#555",
  },
};

export default ListArticles;
