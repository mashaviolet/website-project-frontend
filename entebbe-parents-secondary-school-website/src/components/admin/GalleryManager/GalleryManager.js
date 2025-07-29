import React, { useState } from 'react';
import './GalleryManager.css';

const GalleryManager = () => {
  // State for managing gallery images
  const [galleryImages, setGalleryImages] = useState([
    {
      id: 1,
      title: "Science Laboratory",
      description: "Students conducting experiments in our new science lab",
      imageUrl: "https://via.placeholder.com/400x300/2E7D32/FFFFFF?text=Science+Lab",
      category: "Facilities",
      uploadDate: "2024-01-15",
      isActive: true
    },
    {
      id: 2,
      title: "Sports Day 2024",
      description: "Annual sports day celebrations with students and parents",
      imageUrl: "https://via.placeholder.com/400x300/66BB6A/FFFFFF?text=Sports+Day",
      category: "Events",
      uploadDate: "2024-01-12",
      isActive: true
    },
    {
      id: 3,
      title: "Library Reading Corner",
      description: "Students enjoying quiet study time in our library",
      imageUrl: "https://via.placeholder.com/400x300/FFC107/000000?text=Library",
      category: "Academic",
      uploadDate: "2024-01-10",
      isActive: true
    },
    {
      id: 4,
      title: "Art Exhibition",
      description: "Student artwork displayed during parent-teacher meeting",
      imageUrl: "https://via.placeholder.com/400x300/FF8F00/FFFFFF?text=Art+Exhibition",
      category: "Events",
      uploadDate: "2024-01-08",
      isActive: false
    },
    {
      id: 5,
      title: "Computer Lab",
      description: "Students learning programming and digital skills",
      imageUrl: "https://via.placeholder.com/400x300/1B5E20/FFFFFF?text=Computer+Lab",
      category: "Facilities",
      uploadDate: "2024-01-05",
      isActive: true
    },
    {
      id: 6,
      title: "School Garden",
      description: "Environmental club maintaining the school garden",
      imageUrl: "https://via.placeholder.com/400x300/388E3C/FFFFFF?text=Garden",
      category: "Activities",
      uploadDate: "2024-01-03",
      isActive: true
    }
  ]);

  // State for form management
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [editingImage, setEditingImage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Events',
    isActive: true
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Handle file upload (simulated)
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // In a real app, you'd upload to a server here
      // For now, we'll create a placeholder URL
      const imageUrl = URL.createObjectURL(file);
      setFormData(prev => ({ ...prev, imageUrl }));
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingImage) {
      // Update existing image
      setGalleryImages(prev => prev.map(image => 
        image.id === editingImage.id 
          ? { ...image, ...formData, uploadDate: new Date().toISOString().split('T')[0] }
          : image
      ));
      setEditingImage(null);
    } else {
      // Add new image
      const newImage = {
        id: Date.now(),
        ...formData,
        imageUrl: formData.imageUrl || `https://via.placeholder.com/400x300/2E7D32/FFFFFF?text=${encodeURIComponent(formData.title)}`,
        uploadDate: new Date().toISOString().split('T')[0]
      };
      setGalleryImages(prev => [newImage, ...prev]);
    }

    // Reset form
    resetForm();
  };

  // Reset form data
  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: 'Events',
      isActive: true
    });
    setShowUploadForm(false);
    setEditingImage(null);
  };

  // Handle edit
  const handleEdit = (image) => {
    setEditingImage(image);
    setFormData({
      title: image.title,
      description: image.description,
      category: image.category,
      isActive: image.isActive
    });
    setShowUploadForm(true);
  };

  // Handle delete
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this image?')) {
      setGalleryImages(prev => prev.filter(image => image.id !== id));
    }
  };

  // Toggle image active status
  const toggleImageStatus = (id) => {
    setGalleryImages(prev => prev.map(image => 
      image.id === id ? { ...image, isActive: !image.isActive } : image
    ));
  };

  // Filter images by category
  const filteredImages = selectedCategory === 'All' 
    ? galleryImages 
    : galleryImages.filter(image => image.category === selectedCategory);

  // Get unique categories
  const categories = ['All', ...new Set(galleryImages.map(image => image.category))];

  return (
    <div className="gallery-manager">
      {/* Header Section */}
      <div className="gallery-header">
        <div className="header-left">
          <h1>Gallery Management</h1>
          <p>Manage your school's image gallery</p>
        </div>
        <button 
          className="btn-primary"
          onClick={() => setShowUploadForm(true)}
          disabled={showUploadForm}
        >
          + Upload New Image
        </button>
      </div>

      {/* Controls Section */}
      <div className="gallery-controls">
        <div className="filter-section">
          <label htmlFor="category-filter">Filter by Category:</label>
          <select 
            id="category-filter"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div className="view-controls">
          <button 
            className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => setViewMode('grid')}
          >
            📊 Grid View
          </button>
          <button 
            className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => setViewMode('list')}
          >
            📋 List View
          </button>
        </div>

        <div className="stats">
          <span className="stat">Total: {galleryImages.length}</span>
          <span className="stat">Active: {galleryImages.filter(img => img.isActive).length}</span>
          <span className="stat">Filtered: {filteredImages.length}</span>
        </div>
      </div>

      {/* Upload/Edit Form */}
      {showUploadForm && (
        <div className="upload-form-container">
          <div className="form-header">
            <h2>{editingImage ? 'Edit Image' : 'Upload New Image'}</h2>
          </div>
          
          <form onSubmit={handleSubmit} className="upload-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="title">Image Title *</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter image title"
                />
              </div>

              <div className="form-group">
                <label htmlFor="category">Category</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                >
                  <option value="Events">Events</option>
                  <option value="Facilities">Facilities</option>
                  <option value="Academic">Academic</option>
                  <option value="Activities">Activities</option>
                  <option value="Sports">Sports</option>
                  <option value="Achievements">Achievements</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter image description"
                rows="3"
              />
            </div>

            {!editingImage && (
              <div className="form-group">
                <label htmlFor="image-upload">Upload Image</label>
                <input
                  type="file"
                  id="image-upload"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="file-input"
                />
                <div className="file-input-help">
                  Supported formats: JPG, PNG, GIF. Max size: 5MB
                </div>
              </div>
            )}

            <div className="form-group checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleInputChange}
                />
                <span className="checkbox-text">Make image active (visible on website)</span>
              </label>
            </div>

            <div className="form-actions">
              <button type="button" className="btn-secondary" onClick={resetForm}>
                Cancel
              </button>
              <button type="submit" className="btn-primary">
                {editingImage ? 'Update Image' : 'Upload Image'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Gallery Display */}
      <div className="gallery-content">
        {filteredImages.length === 0 ? (
          <div className="empty-state">
            <p>No images found for the selected category.</p>
          </div>
        ) : (
          <div className={`gallery-${viewMode}`}>
            {filteredImages.map(image => (
              <div key={image.id} className="image-item">
                <div className="image-container">
                  <img src={image.imageUrl} alt={image.title} />
                  <div className="image-overlay">
                    <div className="overlay-actions">
                      <button 
                        className="overlay-btn edit-btn"
                        onClick={() => handleEdit(image)}
                        title="Edit Image"
                      >
                        ✏️
                      </button>
                      <button 
                        className="overlay-btn delete-btn"
                        onClick={() => handleDelete(image.id)}
                        title="Delete Image"
                      >
                        🗑️
                      </button>
                      <button 
                        className={`overlay-btn status-btn ${image.isActive ? 'active' : 'inactive'}`}
                        onClick={() => toggleImageStatus(image.id)}
                        title={image.isActive ? 'Deactivate' : 'Activate'}
                      >
                        {image.isActive ? '👁️' : '🙈'}
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="image-info">
                  <div className="image-header">
                    <h3>{image.title}</h3>
                    <span className={`status-indicator ${image.isActive ? 'active' : 'inactive'}`}>
                      {image.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  
                  <p className="image-description">{image.description}</p>
                  
                  <div className="image-meta">
                    <span className="category-tag">{image.category}</span>
                    <span className="upload-date">{image.uploadDate}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryManager;