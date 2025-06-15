import React from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const NewDocument = () => {
  const navigate = useNavigate();

  const createDoc = () => {
    const id = uuidv4();
    navigate(`/doc/${id}`);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem"
    }}>
      <div style={{
        backgroundColor: "#fff",
        borderRadius: "12px",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        padding: "3rem",
        maxWidth: "500px",
        width: "100%",
        textAlign: "center"
      }}>
        <h2 style={{
          fontSize: "2rem",
          marginBottom: "1.5rem",
          color: "#333"
        }}>
          ✨ Create a New Document
        </h2>

        <button
          onClick={createDoc}
          style={{
            backgroundColor: "#4f46e5",
            color: "#fff",
            padding: "0.75rem 1.5rem",
            fontSize: "1rem",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            transition: "background 0.3s ease"
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#4338ca")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#4f46e5")}
        >
          ➕ Create Document
        </button>
      </div>
    </div>
  );
};

export default NewDocument;
