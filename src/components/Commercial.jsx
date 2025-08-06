import React from 'react'

function Commercial({ commercialPosts, onImageClick, generalDescription }) {
  return (
    <main className="content content-commercial">
      <section className="works-section">
        {/* Descripción general desde Google Sheets */}
        {generalDescription && (
          <div className="general-description" style={{
            marginBottom: '30px',
            padding: '0 1rem',
            fontSize: '16px',
            lineHeight: '1.6',
            color: '#333',
            textAlign: 'left',
            maxWidth: '100%'
          }}>
            {generalDescription}
          </div>
        )}
        
        {/* <h2>commercial work</h2> */}
        <div id="commercial-posts" className="blog-container">
          {commercialPosts.map((post, idx) => {
            const imageUrl = post.imageUrl;
            if (!imageUrl) return null;
            
            // Handle image URL like the original
            let processedUrl;
            if (imageUrl.startsWith('http')) {
              processedUrl = imageUrl;
            } else {
              // For local paths, add the base path
              processedUrl = `${imageUrl.replace(/^\//, '')}`;
            }
            
            return (
              <div key={idx} className="blog-post" data-description={post.description || ''}>
                <img
                  src={processedUrl}
                  alt={post.altText || `commercial ${idx + 1}`}
                  className="work-detail-image"
                  style={{ cursor: 'zoom-in' }}
                  onClick={() => onImageClick(processedUrl, post.description || '')}
                />
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}

export default Commercial 