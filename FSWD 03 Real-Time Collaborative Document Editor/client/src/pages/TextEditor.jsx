import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import axios from 'axios';
import 'react-quill/dist/quill.snow.css';

const TextEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('Untitled');
  const [status, setStatus] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:5000/api/docs/${id}`)
      .then(res => {
        setContent(res.data.content);
        setTitle(res.data.title);
      })
      .catch(err => console.error(err));
  }, [id]);

  const handleContentChange = (value) => {
    setContent(value);
  };

  const handleSave = async () => {
    try {
      await axios.post(`http://localhost:5000/api/docs/${id}`, {
        content,
        title
      });
      setStatus("✅ Saved!");
      setTimeout(() => setStatus(''), 2000);
    } catch (err) {
      console.error(err);
      setStatus("❌ Save failed");
    }
  };

  const handleNewDoc = () => {
    navigate('/new');
  };

  const handleOpenDoc = () => {
    const docId = prompt("Enter document ID to open:");
    if (docId) navigate(`/doc/${docId}`);
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f9fafb',
      padding: '2rem',
      fontFamily: 'Segoe UI, Tahoma, sans-serif',
      boxSizing: 'border-box'
    }}>
      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
        padding: '2rem',
        overflow: 'hidden',
        boxSizing: 'border-box'
      }}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Document Title"
          style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            border: 'none',
            borderBottom: '2px solid #ddd',
            outline: 'none',
            width: '100%',
            marginBottom: '1.5rem',
            padding: '0.5rem 0'
          }}
        />

        <div style={{
          marginBottom: '1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={handleSave}
            style={{
              backgroundColor: '#4f46e5',
              color: '#fff',
              padding: '0.5rem 1rem',
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            💾 Save
          </button>
          <button
            onClick={handleNewDoc}
            style={{
              backgroundColor: '#22c55e',
              color: '#fff',
              padding: '0.5rem 1rem',
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            🆕 New Doc
          </button>
          <button
            onClick={handleOpenDoc}
            style={{
              backgroundColor: '#3b82f6',
              color: '#fff',
              padding: '0.5rem 1rem',
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            📂 Open Doc
          </button>
          <span style={{
            marginLeft: 'auto',
            fontSize: '0.9rem',
            color: '#16a34a',
            minWidth: '80px',
            textAlign: 'right'
          }}>
            {status}
          </span>
        </div>

        <div style={{
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          overflow: 'hidden',
          boxSizing: 'border-box'
        }}>
          <ReactQuill
            theme="snow"
            value={content}
            onChange={handleContentChange}
            style={{
              height: '400px',
              backgroundColor: '#ffffff'
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default TextEditor;
