import React, { useState } from 'react';
import './MessagesViewer.css';

const MessagesViewer = () => {
  // State for managing messages
  const [messages, setMessages] = useState([
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      phone: "+256-700-123456",
      subject: "Admission Inquiry",
      message: "Hello, I would like to inquire about the admission process for my daughter who will be joining Senior 1 next year. Could you please provide information about the requirements and application deadlines?",
      dateReceived: "2024-01-15T10:30:00",
      status: "unread",
      priority: "high",
      category: "Admissions"
    },
    {
      id: 2,
      name: "David Mukasa",
      email: "d.mukasa@gmail.com",
      phone: "+256-701-789012",
      subject: "Fee Structure Inquiry",
      message: "Good morning, I need information about the current fee structure for Senior 2 students. Also, do you offer any scholarship programs or payment plans?",
      dateReceived: "2024-01-14T14:15:00",
      status: "read",
      priority: "medium",
      category: "Finance"
    },
    {
      id: 3,
      name: "Grace Nakato",
      email: "grace.nakato@yahoo.com",
      phone: "+256-702-345678",
      subject: "Transport Services",
      message: "I would like to know if the school provides transport services from Kampala to the school. If yes, what are the routes and costs involved?",
      dateReceived: "2024-01-14T09:20:00",
      status: "replied",
      priority: "low",
      category: "Transport"
    },
    {
      id: 4,
      name: "John Ssemwanga",
      email: "j.ssemwanga@outlook.com",
      phone: "+256-703-456789",
      subject: "Academic Programs",
      message: "Could you provide detailed information about the science subjects offered at your school? My son is particularly interested in Physics and Chemistry combinations.",
      dateReceived: "2024-01-13T16:45:00",
      status: "read",
      priority: "medium",
      category: "Academic"
    },
    {
      id: 5,
      name: "Mary Namusoke",
      email: "mnamusoke@gmail.com",
      phone: "+256-704-567890",
      subject: "Complaint - Uniform Issue",
      message: "I am writing to express my concern about the quality of the school uniforms purchased from the recommended supplier. The fabric seems to fade after just a few washes.",
      dateReceived: "2024-01-13T11:10:00",
      status: "unread",
      priority: "high",
      category: "Complaints"
    },
    {
      id: 6,
      name: "Robert Kato",
      email: "robert.kato@email.com",
      phone: "+256-705-678901",
      subject: "Extracurricular Activities",
      message: "Hello, I would like to know about the extracurricular activities available at your school, particularly sports and music programs. Thank you.",
      dateReceived: "2024-01-12T13:25:00",
      status: "replied",
      priority: "low",
      category: "Activities"
    }
  ]);

  // State for filters and view management
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  // Handle message status change
  const updateMessageStatus = (id, newStatus) => {
    setMessages(prev => prev.map(message => 
      message.id === id ? { ...message, status: newStatus } : message
    ));
  };

  // Handle message priority change
  const updateMessagePriority = (id, newPriority) => {
    setMessages(prev => prev.map(message => 
      message.id === id ? { ...message, priority: newPriority } : message
    ));
  };

  // Handle message deletion
  const deleteMessage = (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      setMessages(prev => prev.filter(message => message.id !== id));
      if (selectedMessage && selectedMessage.id === id) {
        setSelectedMessage(null);
      }
    }
  };

  // Handle bulk actions
  const markAllAsRead = () => {
    setMessages(prev => prev.map(message => ({ ...message, status: 'read' })));
  };

  // Filter and search messages
  const filteredMessages = messages.filter(message => {
    const matchesStatus = filterStatus === 'all' || message.status === filterStatus;
    const matchesCategory = filterCategory === 'all' || message.category === filterCategory;
    const matchesPriority = filterPriority === 'all' || message.priority === filterPriority;
    const matchesSearch = message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesStatus && matchesCategory && matchesPriority && matchesSearch;
  });

  // Sort messages
  const sortedMessages = [...filteredMessages].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.dateReceived) - new Date(a.dateReceived);
      case 'oldest':
        return new Date(a.dateReceived) - new Date(b.dateReceived);
      case 'priority':
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  // Get unique categories
  const categories = ['all', ...new Set(messages.map(message => message.category))];

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Handle message selection
  const selectMessage = (message) => {
    setSelectedMessage(message);
    if (message.status === 'unread') {
      updateMessageStatus(message.id, 'read');
    }
  };

  // Get statistics
  const stats = {
    total: messages.length,
    unread: messages.filter(m => m.status === 'unread').length,
    highPriority: messages.filter(m => m.priority === 'high').length,
    filtered: filteredMessages.length
  };

  return (
    <div className="messages-viewer">
      {/* Header Section */}
      <div className="messages-header">
        <div className="header-left">
          <h1>Messages Center</h1>
          <p>Manage incoming messages from website visitors</p>
        </div>
        <div className="header-actions">
          <button className="btn-secondary" onClick={markAllAsRead}>
            Mark All as Read
          </button>
        </div>
      </div>

      {/* Statistics */}
      <div className="messages-stats">
        <div className="stat-card">
          <div className="stat-number">{stats.total}</div>
          <div className="stat-label">Total Messages</div>
        </div>
        <div className="stat-card unread">
          <div className="stat-number">{stats.unread}</div>
          <div className="stat-label">Unread</div>
        </div>
        <div className="stat-card priority">
          <div className="stat-number">{stats.highPriority}</div>
          <div className="stat-label">High Priority</div>
        </div>
        <div className="stat-card filtered">
          <div className="stat-number">{stats.filtered}</div>
          <div className="stat-label">Filtered Results</div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="messages-controls">
        <div className="search-section">
          <input
            type="text"
            placeholder="Search messages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filters-section">
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="all">All Status</option>
            <option value="unread">Unread</option>
            <option value="read">Read</option>
            <option value="replied">Replied</option>
          </select>

          <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
            <option value="all">All Categories</option>
            {categories.slice(1).map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

          <select value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)}>
            <option value="all">All Priority</option>
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </select>

          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="priority">By Priority</option>
            <option value="name">By Name</option>
          </select>
        </div>
      </div>

      {/* Messages Content */}
      <div className="messages-content">
        {/* Messages List */}
        <div className="messages-list">
          {sortedMessages.length === 0 ? (
            <div className="empty-state">
              <p>No messages found matching your criteria.</p>
            </div>
          ) : (
            sortedMessages.map(message => (
              <div 
                key={message.id} 
                className={`message-item ${message.status} ${selectedMessage?.id === message.id ? 'selected' : ''}`}
                onClick={() => selectMessage(message)}
              >
                <div className="message-header">
                  <div className="sender-info">
                    <h3>{message.name}</h3>
                    <span className="email">{message.email}</span>
                  </div>
                  <div className="message-badges">
                    <span className={`priority-badge ${message.priority}`}>
                      {message.priority.toUpperCase()}
                    </span>
                    <span className={`status-badge ${message.status}`}>
                      {message.status.toUpperCase()}
                    </span>
                  </div>
                </div>
                
                <div className="message-preview">
                  <h4>{message.subject}</h4>
                  <p>{message.message.substring(0, 100)}...</p>
                </div>
                
                <div className="message-footer">
                  <span className="category-tag">{message.category}</span>
                  <span className="date">{formatDate(message.dateReceived)}</span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Message Detail View */}
        <div className="message-detail">
          {selectedMessage ? (
            <div className="detail-content">
              <div className="detail-header">
                <div className="sender-details">
                  <h2>{selectedMessage.name}</h2>
                  <div className="contact-info">
                    <p><strong>Email:</strong> {selectedMessage.email}</p>
                    <p><strong>Phone:</strong> {selectedMessage.phone}</p>
                    <p><strong>Date:</strong> {formatDate(selectedMessage.dateReceived)}</p>
                  </div>
                </div>
                
                <div className="detail-actions">
                  <select 
                    value={selectedMessage.status}
                    onChange={(e) => updateMessageStatus(selectedMessage.id, e.target.value)}
                    className="status-select"
                  >
                    <option value="unread">Unread</option>
                    <option value="read">Read</option>
                    <option value="replied">Replied</option>
                  </select>

                  <select 
                    value={selectedMessage.priority}
                    onChange={(e) => updateMessagePriority(selectedMessage.id, e.target.value)}
                    className="priority-select"
                  >
                    <option value="low">Low Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="high">High Priority</option>
                  </select>

                  <button 
                    className="btn-delete"
                    onClick={() => deleteMessage(selectedMessage.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>

              <div className="message-subject">
                <h3>Subject: {selectedMessage.subject}</h3>
                <span className="category-tag">{selectedMessage.category}</span>
              </div>

              <div className="message-body">
                <p>{selectedMessage.message}</p>
              </div>

              <div className="reply-section">
                <h4>Quick Reply</h4>
                <textarea 
                  placeholder="Type your reply here..."
                  rows="4"
                  className="reply-textarea"
                />
                <div className="reply-actions">
                  <button className="btn-secondary">Save Draft</button>
                  <button className="btn-primary">Send Reply</button>
                </div>
              </div>
            </div>
          ) : (
            <div className="no-selection">
              <div className="no-selection-content">
                <h3>Select a message to view details</h3>
                <p>Choose a message from the list to read its full content and manage it.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagesViewer;