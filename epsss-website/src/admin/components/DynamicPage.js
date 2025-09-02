import React, { useState } from 'react';
import '../../styles/admin/DynamicPage.css';

const DynamicPage = () => {
  const [pages, setPages] = useState([
    { id: 1, title: 'Academics', slug: 'academics', lastUpdated: '2023-05-15' },
    { id: 2, title: 'Facilities', slug: 'facilities', lastUpdated: '2023-04-22' },
    { id: 3, title: 'Staff', slug: 'staff', lastUpdated: '2023-06-10' },
    { id: 4, title: 'Alumni', slug: 'alumni', lastUpdated: '2023-03-18' },
  ]);

  const [newPage, setNewPage] = useState({
    title: '',
    slug: '',
    content: ''
  });

  const [editingPage, setEditingPage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPage(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCreatePage = (e) => {
    e.preventDefault();
    // In a real app, you would send this to your API
    const page = {
      id: pages.length + 1,
      title: newPage.title,
      slug: newPage.slug || newPage.title.toLowerCase().replace(/\s+/g, '-'),
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    
    setPages([...pages, page]);
    setNewPage({ title: '', slug: '', content: '' });
    alert('Page created successfully!');
  };

  const handleEditPage = (page) => {
    setEditingPage(page);
    setNewPage({
      title: page.title,
      slug: page.slug,
      content: '' // In a real app, you would fetch the content
    });
  };

  const handleUpdatePage = (e) => {
    e.preventDefault();
    // In a real app, you would send this to your API
    const updatedPages = pages.map(page => 
      page.id === editingPage.id 
        ? { ...page, title: newPage.title, slug: newPage.slug }
        : page
    );
    
    setPages(updatedPages);
    setEditingPage(null);
    setNewPage({ title: '', slug: '', content: '' });
    alert('Page updated successfully!');
  };

  const handleDeletePage = (id) => {
    if (window.confirm('Are you sure you want to delete this page?')) {
      // In a real app, you would send this to your API
      setPages(pages.filter(page => page.id !== id));
      alert('Page deleted successfully!');
    }
  };

  return (
    <div className="dynamic-page-manager">
      <h1 className="page-title">Manage Dynamic Pages</h1>
      
      <div className="page-manager-container">
        <div className="pages-list">
          <h2>Existing Pages</h2>
          <div className="page-table-container">
            <table className="page-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>URL Slug</th>
                  <th>Last Updated</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pages.map(page => (
                  <tr key={page.id}>
                    <td>{page.title}</td>
                    <td>/{page.slug}</td>
                    <td>{page.lastUpdated}</td>
                    <td className="actions">
                      <button 
                        className="admin-btn admin-btn-small" 
                        onClick={() => handleEditPage(page)}
                      >
                        Edit
                      </button>
                      <button 
                        className="admin-btn admin-btn-small admin-btn-danger" 
                        onClick={() => handleDeletePage(page.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="page-form-container">
          <h2>{editingPage ? 'Edit Page' : 'Create New Page'}</h2>
          <form className="page-form" onSubmit={editingPage ? handleUpdatePage : handleCreatePage}>
            <div className="form-group">
              <label htmlFor="title">Page Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={newPage.title}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="slug">URL Slug</label>
              <input
                type="text"
                id="slug"
                name="slug"
                value={newPage.slug}
                onChange={handleInputChange}
                placeholder="auto-generated if empty"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="content">Page Content</label>
              <textarea
                id="content"
                name="content"
                value={newPage.content}
                onChange={handleInputChange}
                rows="10"
                required
              ></textarea>
            </div>
            
            <div className="form-actions">
              <button type="submit" className="admin-btn">
                {editingPage ? 'Update Page' : 'Create Page'}
              </button>
              {editingPage && (
                <button 
                  type="button" 
                  className="admin-btn admin-btn-secondary"
                  onClick={() => {
                    setEditingPage(null);
                    setNewPage({ title: '', slug: '', content: '' });
                  }}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DynamicPage;