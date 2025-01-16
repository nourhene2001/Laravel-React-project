import axios from "axios";
import { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import { useParams } from "react-router-dom";

const BooksByCategory = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const categoryId = Number(id);

  useEffect(() => {
    const fetchBooksByCategory = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/categories/${categoryId}/article`
        );
        if (Array.isArray(res.data)) {
          setBooks(res.data);
        } else {
          console.error("Expected an array, but received:", res.data);
        }
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    fetchBooksByCategory();
  }, [id]);

  if (isLoading) {
    return (
      <div style={styles.loaderContainer}>
        <ReactLoading type="spokes" color="#4caf50" height={100} width={100} />
        <p style={styles.loadingText}>Loading books...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <center>
        <h1 style={styles.title}>Books in This Category</h1>
      </center>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Title</th>
            <th style={styles.th}>Author</th>
            <th style={styles.th}>Status</th>
            <th style={styles.th}>ISBN</th>
          </tr>
        </thead>
        <tbody>
          {books.length > 0 ? (
            books.map((book, index) => (
              <tr key={index}>
                <td style={styles.td}>{book.title}</td>
                <td style={styles.td}>{book.author}</td>
                <td style={styles.td}>
                  <span
                    style={{
                      ...styles.statusBadge,
                      backgroundColor:
                        book.status === "read"
                          ? "#4caf50"
                          : book.status === "to_read"
                          ? "#ff9800"
                          : "#2196f3",
                    }}
                  >
                    {book.status}
                  </span>
                </td>
                <td style={styles.td}>{book.isbn}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={styles.noData}>
                No books found for this category.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  loaderContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f9f9f9",
  },
  loadingText: {
    marginTop: "10px",
    fontSize: "18px",
    color: "#4caf50",
    fontWeight: "bold",
  },
  container: {
    maxWidth: "80%",
    margin: "30px auto",
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    padding: "20px",
    border: "2px solid #4caf50",
  },
  title: {
    fontSize: "28px",
    color: "#333",
    marginBottom: "20px",
    fontWeight: "bold",
    color: "#4caf50",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    textAlign: "left",
  },
  th: {
    backgroundColor: "#4caf50",
    color: "#ffffff",
    padding: "12px",
    fontSize: "16px",
    textAlign: "center",
  },
  td: {
    padding: "10px",
    fontSize: "14px",
    color: "#555",
    borderBottom: "1px solid #ddd",
    textAlign: "center",
  },
  statusBadge: {
    display: "inline-block",
    padding: "5px 10px",
    borderRadius: "5px",
    color: "#fff",
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  noData: {
    textAlign: "center",
    padding: "20px",
    fontSize: "16px",
    color: "#888",
  },
};

export default BooksByCategory;
