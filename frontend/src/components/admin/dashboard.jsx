import { useState, useEffect } from "react";
import { profile } from "../../services/authservice";

function Dashboard() {
  const [name, setName] = useState("");

  useEffect(() => {
    profile().then((response) => {
      console.log(response);
      if (response.data) {
        setName(response.data.name);
      }
    });
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Welcome to Your Dashboard! 🎉</h1>
      <div style={styles.content}>
        {name ? (
          <p style={styles.greeting}>
            Hello, <span style={styles.name}>{name}</span>! 👋
          </p>
        ) : (
          <p style={styles.loading}>Loading your profile...</p>
        )}
        <p style={styles.description}>
          Here’s where you can manage your activities and explore new updates.
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    textAlign: "center",
    fontFamily: "'Arial', sans-serif",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  title: {
    color: "#333",
    fontSize: "2rem",
    marginBottom: "20px",
  },
  content: {
    padding: "15px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  greeting: {
    fontSize: "1.5rem",
    color: "#4caf50",
    margin: "10px 0",
  },
  name: {
    fontWeight: "bold",
    color: "#2e7d32",
  },
  loading: {
    fontSize: "1.2rem",
    color: "#ff9800",
  },
  description: {
    fontSize: "1rem",
    color: "#555",
    marginTop: "10px",
  },
};

export default Dashboard;
