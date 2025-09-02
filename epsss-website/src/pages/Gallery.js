import React, { useState } from 'react';
import { FaCamera, FaSchool, FaBook, FaFutbol, FaCalendarAlt, FaBuilding, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import '../styles/public/Gallery.css';

function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);
  
  const categories = [
    { id: 'all', name: 'All Photos', icon: <FaCamera /> },
    { id: 'campus', name: 'Campus Life', icon: <FaSchool /> },
    { id: 'academics', name: 'Academic Activities', icon: <FaBook /> },
    { id: 'sports', name: 'Sports & Recreation', icon: <FaFutbol /> },
    { id: 'events', name: 'Events & Celebrations', icon: <FaCalendarAlt /> },
    { id: 'facilities', name: 'School Facilities', icon: <FaBuilding /> }
  ];
  
  // Gallery images using your actual image paths
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
      src: '/images/co-curricular7.jpg',
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
            <div className="no-images-icon">
              <FaCamera />
            </div>
            <h3>No images found</h3>
            <p>No images available for the selected category.</p>
          </div>
        )}
      </div>
      
      {/* Image Modal */}
      {selectedImage && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              <FaTimes />
            </button>
            <button className="modal-prev" onClick={prevImage}>
              <FaChevronLeft />
            </button>
            <button className="modal-next" onClick={nextImage}>
              <FaChevronRight />
            </button>
            
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