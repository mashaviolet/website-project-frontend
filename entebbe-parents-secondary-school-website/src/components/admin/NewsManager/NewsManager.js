import React, { useState } from 'react';
import './NewsManager.css';

const NewsManager = () => {
  // State for managing news articles
  const [newsArticles, setNewsArticles] = useState([
    {
      id: 1,
      title: "School Annual Sports Day 2024",
      content: "Join us for an exciting day of sports and activities. All students and parents are welcome to participate in this memorable event.",
      author: "Admin",
      date: "2024-01-15",
      status: "published",
      category: "Events"
    },
    {
      id: 2,
      title: "New Science Laboratory Opened",
      content: "We are proud to announce the opening of our state-of-the-art science laboratory equipped with modern facilities.",
      author: "Admin", 
      date: "2024-01-10",
      status: "published",
      category: "Facilities"
    },
    {
      id: 3,
      title: "Mid-Term Examination Schedule",
      content: "Please find below the mid-term examination schedule for all classes. Students are advised to prepare well.",
      author: "Admin",
      date: "2024-01-08",
      status: "draft",
      category: "Academic"
    }
  ]);

  // State for form management
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'General',
    status: 'draft'
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingArticle) {
      // Update existing article
      setNewsArticles(prev => prev.map(article => 
        article.id === editingArticle.id 
          ? { ...article, ...formData, date: new Date().toISOString().split('T')[0] }
          : article
      ));
      setEditingArticle(null);
    } else {
      // Add new article
      const newArticle = {
        id: Date.now(), // Simple ID generation
        ...formData,
        author: 'Admin',
        date: new Date().toISOString().split('T')[0]
      };
      setNewsArticles(prev => [newArticle, ...prev]);
    }

    // Reset form
    setFormData({
      title: '',
      content: '',
      category: 'General',
      status: 'draft'
    });
    setShowAddForm(false);
  };

  // Handle edit
  const handleEdit = (article) => {
    setEditingArticle(article);
    setFormData({
      title: article.title,
      content: article.content,
      category: article.category,
      status: article.status
    });
    setShowAddForm(true);
  };

  // Handle delete
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      setNewsArticles(prev => prev.filter(article => article.id !== id));
    }
  };

  // Cancel form
  const handleCancel = () => {
    setShowAddForm(false);
    setEditingArticle(null);
    setFormData({
      title: '',
      content: '',
      category: 'General',
      status: 'draft'
    });
  };

  return (
    <div className="news-manager">
      <div className="news-manager-header">
        <h1>News Management</h1>
        <button 
          className="btn-primary"
          onClick={() => setShowAddForm(true)}
          disabled={showAddForm}
        >
          + Add New Article
        </button>
      </div>

      {/* Add/Edit Form */}
      {showAddForm && (
        <div className="news-form-container">
          <div className="news-form-header">
            <h2>{editingArticle ? 'Edit Article' : 'Add New Article'}</h2>
          </div>
          
          <form onSubmit={handleSubmit} className="news-form">
            <div className="form-group">
              <label htmlFor="title">Article Title *</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                placeholder="Enter article title"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="category">Category</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                >
                  <option value="General">General</option>
                  <option value="Academic">Academic</option>
                  <option value="Events">Events</option>
                  <option value="Facilities">Facilities</option>
                  <option value="Sports">Sports</option>
                  <option value="Announcements">Announcements</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="status">Status</label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="content">Article Content *</label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                required
                placeholder="Write your article content here..."
                rows="8"
              />
            </div>

            <div className="form-actions">
              <button type="button" className="btn-secondary" onClick={handleCancel}>
                Cancel
              </button>
              <button type="submit" className="btn-primary">
                {editingArticle ? 'Update Article' : 'Publish Article'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* News Articles List */}
      <div className="news-list">
        <h2>Published Articles ({newsArticles.length})</h2>
        
        {newsArticles.length === 0 ? (
          <div className="empty-state">
            <p>No articles found. Create your first article!</p>
          </div>
        ) : (
          <div className="articles-grid">
            {newsArticles.map(article => (
              <div key={article.id} className="article-card">
                <div className="article-header">
                  <h3>{article.title}</h3>
                  <span className={`status-badge ${article.status}`}>
                    {article.status}
                  </span>
                </div>
                
                <div className="article-meta">
                  <span className="category">{article.category}</span>
                  <span className="date">{article.date}</span>
                  <span className="author">By {article.author}</span>
                </div>
                
                <p className="article-excerpt">
                  {article.content.substring(0, 150)}...
                </p>
                
                <div className="article-actions">
                  <button 
                    className="btn-edit"
                    onClick={() => handleEdit(article)}
                  >
                    Edit
                  </button>
                  <button 
                    className="btn-delete"
                    onClick={() => handleDelete(article.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsManager;