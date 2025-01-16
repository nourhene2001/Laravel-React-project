import axios from "axios";
import { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import { Link } from "react-router-dom";

const ListCategories = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/categories");
      setCategories(res.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  if (isLoading) {
    return (
      <div style={styles.loaderContainer}>
        <ReactLoading type="spokes" color="#4caf50" height={100} width={100} />
        <p style={styles.loadingText}>Loading categories...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <center>
        <h1 style={styles.title}>Liste des Catégories</h1>
      </center>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Nom de la catégorie</th>
            <th style={styles.th}>Image</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat, index) => (
            <tr key={index}>
              <td style={styles.td}>
                <Link to={`/categories/${Number(cat.id)}/article`} style={styles.link}>
                  {cat.nomcategorie}
                </Link>
              </td>
              <td style={styles.td}>
                <img
                  src={cat.imagecategorie}
                  width={100}
                  height={100}
                  alt="category"
                  style={styles.image}
                />
              </td>
            </tr>
          ))}
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
  link: {
    textDecoration: "none",
    color: "#4caf50",
    fontWeight: "bold",
    fontSize: "14px",
  },
  image: {
    borderRadius: "5px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
  },
};

export default ListCategories;
