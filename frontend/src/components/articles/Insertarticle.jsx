import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const InsertBook = () => {
    const [article, setArticle] = useState({});
    const [scategories, setScategories] = useState([]);
    const navigate = useNavigate();

    const loadscategories = async () => {
        try {
            const res = await axios.get("http://localhost:8000/api/scategories");
            console.log("API Response:", res.data);
            setScategories(res.data);
        } catch (error) {
            console.error("Error loading subcategories:", error);
            setScategories([]);
        }
    };

    useEffect(() => {
        loadscategories();
    }, []);

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8000/api/articles", article);
            console.log("Article:", article);
            navigate("/articles");
        } catch (error) {
            if (error.response) {
                console.error("Error Response Data:", error.response.data);
                console.error("Error Status:", error.response.status);
            } else if (error.request) {
                console.error("No Response Received:", error.request);
            } else {
                console.error("Error Setting Up Request:", error.message);
            }
        }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Insert New Book</h1>
            <Form style={styles.form}>
                <Row>
                    <Form.Group as={Col} md="6" style={styles.formGroup}>
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Book Title"
                            value={article.title || ""}
                            onChange={(e) =>
                                setArticle({ ...article, title: e.target.value })
                            }
                            style={styles.input}
                        />
                    </Form.Group>
                    <Form.Group as={Col} md="6" style={styles.formGroup}>
                        <Form.Label>Author</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Author"
                            value={article.author || ""}
                            onChange={(e) =>
                                setArticle({ ...article, author: e.target.value })
                            }
                            style={styles.input}
                        />
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group as={Col} md="6" style={styles.formGroup}>
                        <Form.Label>Genre</Form.Label>
                        <Form.Control
                            as="select"
                            value={article.subcategory_id || ""}
                            onChange={(e) =>
                                setArticle({
                                    ...article,
                                    subcategory_id: e.target.value,
                                })
                            }
                            style={styles.input}
                        >
                            <option value="">Select Genre</option>
                            {Array.isArray(scategories) &&
                                scategories.map((scat, index) => (
                                    <option value={scat.id} key={index}>
                                        {scat.nomscategorie}
                                    </option>
                                ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} md="6" style={styles.formGroup}>
                        <Form.Label>Status</Form.Label>
                        <Form.Control
                            as="select"
                            value={article.status || ""}
                            onChange={(e) =>
                                setArticle({
                                    ...article,
                                    status: e.target.value,
                                })
                            }
                            style={styles.input}
                        >
                            <option value="">Select Status</option>
                            <option value="read">Read</option>
                            <option value="to_read">To be Read</option>
                            <option value="ongoing">Ongoing</option>
                        </Form.Control>
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group as={Col} md="6" style={styles.formGroup}>
                        <Form.Label>ISBN</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="ISBN"
                            value={article.isbn || ""}
                            onChange={(e) =>
                                setArticle({ ...article, isbn: e.target.value })
                            }
                            style={styles.input}
                        />
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group as={Col} md="12" style={styles.formGroup}>
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            placeholder="Description"
                            value={article.description || ""}
                            onChange={(e) =>
                                setArticle({
                                    ...article,
                                    description: e.target.value,
                                })
                            }
                            style={styles.textarea}
                        />
                    </Form.Group>
                </Row>
            </Form>
            <div style={styles.buttonGroup}>
                <button
                    className="btn btn-success btn-sm"
                    onClick={(e) => handleSave(e)}
                    style={styles.buttonSave}
                >
                    <i className="fa-solid fa-floppy-disk"></i> Save
                </button>
                <Link to="/articles">
                    <button
                        className="btn btn-danger btn-sm"
                        style={styles.buttonCancel}
                    >
                        <i className="fa-solid fa-circle-xmark"></i> Cancel
                    </button>
                </Link>
            </div>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: "800px",
        margin: "40px auto",
        padding: "30px",
        borderRadius: "15px",
        backgroundColor: "#f9f9f9",
        boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.1)",
    },
    title: {
        textAlign: "center",
        fontSize: "26px",
        marginBottom: "20px",
        color: "#555",
        fontWeight: "bold",
    },
    form: {
        marginBottom: "20px",
    },
    formGroup: {
        marginBottom: "15px",
    },
    input: {
        borderRadius: "8px",
        border: "1px solid #ddd",
        padding: "10px",
    },
    textarea: {
        borderRadius: "8px",
        border: "1px solid #ddd",
        padding: "10px",
        minHeight: "100px",
    },
    buttonGroup: {
        display: "flex",
        justifyContent: "space-between",
        marginTop: "20px",
    },
    buttonSave: {
        backgroundColor: "#28a745",
        borderColor: "#28a745",
        padding: "10px 20px",
        borderRadius: "5px",
        color: "#ffffff",
        fontWeight: "bold",
    },
    buttonCancel: {
        backgroundColor: "#dc3545",
        borderColor: "#dc3545",
        padding: "10px 20px",
        borderRadius: "5px",
        color: "#ffffff",
        fontWeight: "bold",
    },
};

export default InsertBook;
