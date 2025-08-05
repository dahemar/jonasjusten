import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Commercial from './components/Commercial'
import './App.css'

// Google Sheets API Configuration
const COMMERCIAL_SPREADSHEET_ID = '1RTrPB8qONlXQG37mRzPJ8aanTlxLGLy3MeYpsyKnmBk';
const COMMERCIAL_API_KEY = 'AIzaSyAKYKOA8prGrSMgWAifEvjLJq9lUqsULzQ';
const COMMERCIAL_RANGE = 'Commercial!A2:B'; // Cambiado a A2:B para leer solo Image URL y Description
const COMMERCIAL_BASE_URL = 'https://sheets.googleapis.com/v4/spreadsheets/';

function App() {
  const [commercialPosts, setCommercialPosts] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedDescription, setSelectedDescription] = useState('');

  // Fetch commercial posts from Google Sheets
  useEffect(() => {
    async function fetchCommercial() {
      try {
        const url = `${COMMERCIAL_BASE_URL}${COMMERCIAL_SPREADSHEET_ID}/values/${COMMERCIAL_RANGE}?key=${COMMERCIAL_API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.values) {
          const posts = data.values.map(row => ({
            imageUrl: row[0] || '', // Image URL en columna A
            description: row[1] || '', // Description en columna B
            altText: `commercial work ${row[0]?.split('/').pop()?.split('.')[0] || ''}` // Generar alt text desde el nombre del archivo
          })).filter(post => extractImageUrl(post.imageUrl));
          
          setCommercialPosts(posts);
        }
      } catch (error) {
        console.error('Error fetching commercial posts:', error);
      }
    }
    
    fetchCommercial();
  }, []);

  // Extract image URL from various formats
  function extractImageUrl(url) {
    if (!url) return false;
    
    // Handle Google Drive URLs
    if (url.includes('drive.google.com')) {
      const fileId = url.match(/\/d\/([a-zA-Z0-9-_]+)/)?.[1];
      if (fileId) {
        return `https://drive.google.com/uc?export=view&id=${fileId}`;
      }
    }
    
    // Handle direct URLs
    if (url.startsWith('http')) {
      return url;
    }
    
    // Handle local paths (como commercial/1.webp)
    if (url.startsWith('commercial/')) {
      return `/jonasjusten/commercial/${url.split('/')[1]}`; // Convertir a ruta pública con base path
    }
    
    return false;
  }

  const handleImageClick = (image, description) => {
    setSelectedImage(image);
    setSelectedDescription(description);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setSelectedDescription('');
  };

  return (
    <div className="container">
      <Sidebar />
      <Routes>
        <Route path="/" element={
          <Commercial 
            commercialPosts={commercialPosts} 
            onImageClick={handleImageClick}
          />
        } />
      </Routes>
      
      {/* Modal for full-size image - exact structure from original */}
      {selectedImage && (
        <div className="image-modal-overlay" onClick={closeModal}>
          <div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
            <img 
              src={selectedImage} 
              alt="full"
              className="image-modal-full"
              style={{maxHeight: "80vh", maxWidth: "95vw"}}
              onClick={(e) => e.stopPropagation()}
            />
            {selectedDescription && (
              <div className="modal-desc" dangerouslySetInnerHTML={{__html: selectedDescription}} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App 