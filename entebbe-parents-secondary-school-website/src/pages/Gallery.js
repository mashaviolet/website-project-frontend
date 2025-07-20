import React, { useState } from 'react';
import '../styles/Gallery.css';

function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);

  const categories = [
    { id: 'all', name: 'All Photos', icon: '📸' },
    { id: 'campus', name: 'Campus Life', icon: '🏫' },
    { id: 'academics', name: 'Academic Activities', icon: '📚' },
    { id: 'sports', name: 'Sports & Recreation', icon: '⚽' },
    { id: 'events', name: 'Events & Celebrations', icon: '🎉' },
    { id: 'facilities', name: 'School Facilities', icon: '🏢' },
    { id: 'achievements', name: 'Awards & Achievements', icon: '🏆' }
  ];

  const galleryImages = [
    {
      id: 1,
      src: '/api/placeholder/400/300',
      alt: 'Main School Building',
      title: 'Main School Building',
      category: 'facilities',
      description: 'Our modern main building houses administrative offices and classrooms'
    },
    {
      id: 2,
      src: '/api/placeholder/400/300',
      alt: 'Science Laboratory',
      title: 'Science Laboratory',
      category: 'facilities',
      description: 'Well-equipped science laboratory for hands-on learning'
    },
    {
      id: 3,
      src: '/api/placeholder/400/300',
      alt: 'Students in Library',
      title: 'School Library',
      category: 'academics',
      description: 'Students studying in our well-stocked library'
    },
    {
      id: 4,
      src: '/api/placeholder/400/300',
      alt: 'Sports Day Event',
      title: 'Annual Sports Day',
      category: 'events',
      description: 'Students participating in our annual sports day celebration'
    },
    {
      id: 5,
      src: '/api/placeholder/400/300',
      alt: 'Football Match',
      title: 'Inter-School Football',
      category: 'sports',
      description: 'Our football team competing in inter-school championship'
    },
    {
      id: 6,
      src: '/api/placeholder/400/300',
      alt: 'Graduation Ceremony',
      title: 'Graduation Day 2024',
      category: 'events',
      description: 'Celebrating our graduating class of 2024'
    },
    {
      id: 7,
      src: '/api/placeholder/400/300',
      alt: 'Computer Lab',
      title: 'Computer Laboratory',
      category: 'facilities',
      description: 'Modern computer lab with latest technology'
    },
    {
      id: 8,
      src: '/api/placeholder/400/300',
      alt: 'Students in Classroom',
      title: 'Classroom Session',
      category: 'academics',
      description: 'Interactive learning session in progress'
    },
    {
      id: 9,
      src: '/api/placeholder/400/300',
      alt: 'Award Ceremony',
      title: 'Academic Excellence Awards',
      category: 'achievements',
      description: 'Recognizing outstanding academic performance'
    },
    {
      id: 10,
      src: '/api/placeholder/400/300',
      alt: 'Campus Garden',
      title: 'School Garden',
      category: 'campus',
      description: 'Beautiful landscaped gardens around the campus'
    },
    {
      id: 11,
      src: '/api/placeholder/400/300',
      alt: 'Basketball Court',
      title: 'Basketball Court',
      category: 'sports',
      description: 'Students enjoying basketball during recreation time'
    },
    {
      id: 12,
      src: '/api/placeholder/400/300',
      alt: 'Cultural Festival',
      title: 'Cultural Day Celebration',
      category: 'events',
      description: 'Students showcasing Ugandan culture and traditions'
    },
    {
      id: 13,
      src: '/api/placeholder/400/300',
      alt: 'Dining Hall',
      title: 'School Dining Hall',
      category: 'facilities',
      description: 'Spacious dining hall where students enjoy their meals'
    },
    {
      id: 14,
      src: '/api/placeholder/400/300',
      alt: 'Art Class',
      title: 'Art & Craft Session',
      category: 'academics',
      description: 'Students expressing creativity in art class'
    },
    {
      id: 15,
      src: '/api/placeholder/400/300',
      alt: 'School Assembly',
      title: 'Morning Assembly',
      category: 'campus',
      description: 'Students gathering for morning assembly'
    }
  ];

  const filteredImages = selectedCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  const openModal = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
    const nextIndex = (currentIndex + 1) % filteredImages.length;
    setSelectedImage(filteredImages[nextIndex]);
  };

  const prevImage = () => {
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
    const prevIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    setSelectedImage(filteredImages[prevIndex]);
  };

  return (
    <div className="gallery-container">
      {/* Hero Section */}
      <div className="gallery-hero">
        <div className="hero-content">
          <h1>School Gallery</h1>
          <p className="hero-subtitle">
            Discover the vibrant life at Entebbe Parents Secondary School through our photo gallery. 
            From academic achievements to sporting events, explore the moments that make our school special.
          </p>
        </div>
      </div>

      {/* Gallery Stats */}
      <div className="gallery-stats">
        <div className="stats-container">
          <div className="stat-card">
            <div className="stat-icon">📸</div>
            <div className="stat-number">{galleryImages.length}</div>
            <div className="stat-label">Total Photos</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🏆</div>
            <div className="stat-number">50+</div>
            <div className="stat-label">Achievement Moments</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🎉</div>
            <div className="stat-number">25+</div>
            <div className="stat-label">Events Captured</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⚽</div>
            <div className="stat-number">15+</div>
            <div className="stat-label">Sports Activities</div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="gallery-filter">
        <h2>Browse by Category</h2>
        <div className="filter-buttons">
          {categories.map(category => (
            <button
              key={category.id}
              className={`filter-btn ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <span className="filter-icon">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="gallery-content">
        <div className="gallery-grid">
          {filteredImages.map(image => (
            <div key={image.id} className="gallery-item" onClick={() => openModal(image)}>
              <div className="image-container">
                <img src={image.src} alt={image.alt} />
                <div className="image-overlay">
                  <div className="overlay-content">
                    <h3>{image.title}</h3>
                    <p>{image.description}</p>
                    <button className="view-btn">View Full Size</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredImages.length === 0 && (
          <div className="no-images">
            <div className="no-images-icon">📷</div>
            <h3>No images found</h3>
            <p>No images available for the selected category.</p>
          </div>
        )}
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>
            <button className="modal-prev" onClick={prevImage}>‹</button>
            <button className="modal-next" onClick={nextImage}>›</button>
            
            <div className="modal-image-container">
              <img src={selectedImage.src} alt={selectedImage.alt} />
            </div>
            
            <div className="modal-info">
              <h3>{selectedImage.title}</h3>
              <p>{selectedImage.description}</p>
              <div className="modal-category">
                <span className="category-badge">
                  {categories.find(cat => cat.id === selectedImage.category)?.name}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Gallery Info Section */}
      <div className="gallery-info">
        <div className="info-content">
          <h2>About Our Gallery</h2>
          <div className="info-grid">
            <div className="info-card">
              <div className="info-icon">🎓</div>
              <h3>Academic Excellence</h3>
              <p>Capturing moments of learning, discovery, and academic achievements that showcase our commitment to educational excellence.</p>
            </div>
            <div className="info-card">
              <div className="info-icon">🏃</div>
              <h3>Sports & Recreation</h3>
              <p>From inter-school competitions to recreational activities, see how our students stay active and healthy.</p>
            </div>
            <div className="info-card">
              <div className="info-icon">🌟</div>
              <h3>School Events</h3>
              <p>Celebrating cultural diversity, graduation ceremonies, and special events that bring our school community together.</p>
            </div>
            <div className="info-card">
              <div className="info-icon">🏢</div>
              <h3>Modern Facilities</h3>
              <p>Tour our state-of-the-art facilities including laboratories, libraries, sports facilities, and comfortable learning spaces.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="gallery-cta">
        <div className="cta-content">
          <h2>Want to Visit Our School?</h2>
          <p>Experience the vibrant atmosphere of Entebbe Parents Secondary School firsthand. Schedule a visit to see our facilities and meet our community.</p>
          <div className="cta-buttons">
            <button className="cta-btn primary">Schedule a Visit</button>
            <button className="cta-btn secondary">Contact Admissions</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Gallery;