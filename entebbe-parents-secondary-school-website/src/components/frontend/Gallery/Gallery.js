import React, { useState, useEffect } from 'react';
import './Gallery.css';

// Make sure all paths are consistent and point to your actual images
const heroImages = [
  '/images/sch.JPG',
  '/images/school1.JPG',
  '/images/school2.JPG',
  '/images/school3.JPG',
  '/images/academics.JPG',
  '/images/academics1.JPG',
  '/images/sciencelab.JPG',
  '/images/sciencelab1.JPG',
  '/images/library1.JPG',
  '/images/library2.JPG',
  '/images/library3.JPG',
  '/images/library4.JPG',
  '/images/complab.JPG',
  '/images/complab2.JPG',
  '/images/co-curricular1.jpg',
  '/images/co-curricular2.jpg',
  '/images/co-curricular4.jpg',
  '/images/co-curricular3.jpg', // Note: there's a typo in your original filename
  '/images/co-curricular5.jpg',
  '/images/co-curricular6.jpg',
  '/images/sports.JPG',
  '/images/sports1.jpg',
  '/images/sports2.jpg',
  '/images/sports3.jpg', // Fixed: changed from /assets/ to /images/
  '/images/sports4.jpg',
  '/images/sports5.jpg',
  '/images/sports6.jpg',
  '/images/sports7.jpg',
  '/images/sports8.jpg',
  '/images/sports9.jpg',
  '/images/sports11.jpg',
  '/images/watertank.JPG',
  '/images/watertank2.JPG',
  '/images/spiritual1.JPG',
  '/images/spiritual2.JPG',
  '/images/spiritual3.JPG',
  '/images/spiritual5.JPG',
];

function Gallery() {
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [imageLoadErrors, setImageLoadErrors] = useState(new Set());

  useEffect(() => {
    // Preload all hero images once on mount with error handling
    let loaded = 0;
    const errors = new Set();
    
    heroImages.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loaded++;
        if (loaded === heroImages.length) {
          setImagesLoaded(true);
          setImageLoadErrors(errors);
        }
      };
      img.onerror = () => {
        errors.add(src);
        loaded++;
        console.warn(`Failed to load image: ${src}`);
        if (loaded === heroImages.length) {
          setImagesLoaded(true);
          setImageLoadErrors(errors);
        }
      };
    });
  }, []);

  useEffect(() => {
    if (!imagesLoaded) return;

    const interval = setInterval(() => {
      setCurrentHeroIndex((prevIndex) => {
        // Skip images that failed to load
        let nextIndex = (prevIndex + 1) % heroImages.length;
        let attempts = 0;
        while (imageLoadErrors.has(heroImages[nextIndex]) && attempts < heroImages.length) {
          nextIndex = (nextIndex + 1) % heroImages.length;
          attempts++;
        }
        return nextIndex;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [imagesLoaded, imageLoadErrors]);

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

  // Updated gallery images using your actual image paths
  const galleryImages = [
    {
      id: 1,
      src: '/images/sch.JPG',
      alt: 'Main School Building',
      title: 'Main School Building',
      category: 'facilities',
      description: 'Our modern main building houses administrative offices and classrooms'
    },
    {
      id: 2,
      src: '/images/sciencelab.JPG',
      alt: 'Science Laboratory',
      title: 'Science Laboratory',
      category: 'facilities',
      description: 'Well-equipped science laboratory for hands-on learning'
    },
    {
      id: 3,
      src: '/images/library1.JPG',
      alt: 'Students in Library',
      title: 'School Library',
      category: 'academics',
      description: 'Students studying in our well-stocked library'
    },
    {
      id: 4,
      src: '/images/sports.JPG',
      alt: 'Sports Activities',
      title: 'Sports Activities',
      category: 'sports',
      description: 'Students participating in various sports activities'
    },
    {
      id: 5,
      src: '/images/sports1.JPG',
      alt: 'Football Match',
      title: 'Inter-School Football',
      category: 'sports',
      description: 'Our football team competing in inter-school championship'
    },
    {
      id: 6,
      src: '/images/academics.JPG',
      alt: 'Academic Activities',
      title: 'Academic Excellence',
      category: 'academics',
      description: 'Students engaged in academic activities'
    },
    {
      id: 7,
      src: '/images/complab.JPG',
      alt: 'Computer Lab',
      title: 'Computer Laboratory',
      category: 'facilities',
      description: 'Modern computer lab with latest technology'
    },
    {
      id: 8,
      src: '/images/school1.JPG',
      alt: 'School Campus',
      title: 'Campus View',
      category: 'campus',
      description: 'Beautiful view of our school campus'
    },
    {
      id: 9,
      src: '/images/co-curricular1.JPG',
      alt: 'Co-curricular Activities',
      title: 'Co-curricular Programs',
      category: 'events',
      description: 'Students participating in co-curricular activities'
    },
    {
      id: 10,
      src: '/images/school2.JPG',
      alt: 'Campus Garden',
      title: 'School Grounds',
      category: 'campus',
      description: 'Beautiful landscaped grounds around the campus'
    },
    {
      id: 11,
      src: '/images/sports2.JPG',
      alt: 'Basketball Court',
      title: 'Sports Facilities',
      category: 'sports',
      description: 'Students enjoying various sports during recreation time'
    },
    {
      id: 12,
      src: '/images/spiritual1.JPG',
      alt: 'Spiritual Activities',
      title: 'Spiritual Development',
      category: 'events',
      description: 'Students participating in spiritual development programs'
    },
    {
      id: 13,
      src: '/images/watertank.JPG',
      alt: 'School Infrastructure',
      title: 'School Infrastructure',
      category: 'facilities',
      description: 'Modern infrastructure supporting school operations'
    },
    {
      id: 14,
      src: '/images/academics1.JPG',
      alt: 'Academic Session',
      title: 'Learning Sessions',
      category: 'academics',
      description: 'Interactive learning sessions in progress'
    },
    {
      id: 15,
      src: '/images/school3.JPG',
      alt: 'School Assembly',
      title: 'School Activities',
      category: 'campus',
      description: 'Students participating in school activities'
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

  // Add image error handling
  const handleImageError = (e, imageSrc) => {
    console.error(`Failed to load image: ${imageSrc}`);
    e.target.src = '/images/placeholder.jpg'; // Fallback image
    e.target.alt = 'Image not available';
  };

  return (
    <div className="gallery-container">
      {/* Hero Section */}
      <div className="gallery-hero">
        {!imagesLoaded ? (
          <div className="loading">Loading images...</div>
        ) : (
          <>
            {!imageLoadErrors.has(heroImages[currentHeroIndex]) && (
              <img
                key={currentHeroIndex}
                src={heroImages[currentHeroIndex]}
                alt="School Gallery Slideshow"
                className="hero-bg-image"
                onError={(e) => handleImageError(e, heroImages[currentHeroIndex])}
              />
            )}
            <div className="hero-content">
              <h1>School Gallery</h1>
              <p className="hero-subtitle">
                Discover the vibrant life at Entebbe Parents Secondary School through our photo gallery.
                From academic achievements to sporting events, explore the moments that make our school special.
              </p>
            </div>
          </>
        )}
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
                <img 
                  src={image.src} 
                  alt={image.alt}
                  onError={(e) => handleImageError(e, image.src)}
                />
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
              <img 
                src={selectedImage.src} 
                alt={selectedImage.alt}
                onError={(e) => handleImageError(e, selectedImage.src)}
              />
            </div>
            
            <div className="modal-info">
              <h3>{selectedImage.title}</h3>
              <p>{selectedImage.description}</p>
              <div className="modal-category">Category: {selectedImage.category}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Gallery;