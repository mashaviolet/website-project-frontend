


import React, { useState, useEffect, useRef } from 'react';
import { MdMailOutline } from 'react-icons/md';
import { FaInbox } from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi';
import contactService from '../services/contactService';
import '../../styles/admin/MessagesViewer.css';

const MessagesViewer = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);
  const [replyModal, setReplyModal] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [readStatus, setReadStatus] = useState({});
  const [animateList, setAnimateList] = useState(false);
  const listRef = useRef(null);

  // Simulate read/unread status in-memory (for demo)
  useEffect(() => {
    setReadStatus(items.reduce((acc, m) => {
      acc[m.id] = acc[m.id] || false;
      return acc;
    }, { ...readStatus }));
    // eslint-disable-next-line
  }, [items]);

  const load = async () => {
    setError('');
    try {
      const res = await contactService.list();
      setItems(res.data);
    } catch (_) {
      setError('Failed to load messages');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);
  useEffect(() => {
    setAnimateList(false);
    setTimeout(() => setAnimateList(true), 100);
  }, [items, search]);

  const del = async (id) => {
    if (!window.confirm('Delete this message?')) return;
    try {
      await contactService.remove(id);
      if (selected && selected.id === id) setSelected(null);
      await load();
    } catch (_) {
      setError('Failed to delete');
    }
  };

  // Mark as read/unread (demo, not persisted)
  const toggleRead = (id) => setReadStatus(s => ({ ...s, [id]: !s[id] }));

  // Filter messages by search
  const filtered = items.filter(m =>
    m.full_name.toLowerCase().includes(search.toLowerCase()) ||
    m.email.toLowerCase().includes(search.toLowerCase()) ||
    m.subject?.toLowerCase().includes(search.toLowerCase()) ||
    m.message?.toLowerCase().includes(search.toLowerCase())
  );

  // Summary stats
  const total = items.length;
  const unread = Object.values(readStatus).filter(v => !v).length;

  // Responsive: stack columns on mobile
  const isMobile = window.innerWidth < 900;

  return (
    <div className="messages-viewer">
      <div className="messages-header">
        <div className="header-left" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <MdMailOutline size={36} style={{ color: '#2d72d9' }} />
          <div>
            <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, letterSpacing: 0.5 }}>Contact Messages</h1>
            <p style={{ margin: 0, color: '#555', fontSize: 16 }}>View and manage messages sent from the Contact Us page.</p>
          </div>
        </div>
        <div className="header-actions">
          <button
            className="btn-secondary"
            onClick={() => setReadStatus(items.reduce((acc, m) => { acc[m.id] = true; return acc; }, {}))}
            aria-label="Mark all as read"
            disabled={unread === 0}
            style={{ display: 'flex', alignItems: 'center', gap: 6 }}
          >
            <FaInbox size={18} /> Mark all as read
          </button>
        </div>
      </div>

      {/* Summary widgets */}
      <div className="messages-stats">
        <div className="stat-card">
          <div className="stat-number">{total}</div>
          <div className="stat-label">Total</div>
        </div>
        <div className={`stat-card${unread > 0 ? ' unread' : ''}`}>
          <div className="stat-number">{unread}</div>
          <div className="stat-label">Unread</div>
        </div>
        <div className="stat-card filtered">
          <div className="stat-number">{filtered.length}</div>
          <div className="stat-label">Filtered</div>
        </div>
      </div>

      <div className="messages-controls">
        <div className="search-section" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <FiSearch size={20} style={{ color: '#888' }} />
          <input
            className="search-input"
            type="text"
            placeholder="Search by name, email, subject, or message..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            aria-label="Search messages"
            style={{ flex: 1, minWidth: 0 }}
          />
        </div>
      </div>

      {loading && <div className="dashboard-card loading">Loading…</div>}
      {error && <div className="dashboard-card" style={{ color: 'red' }}>{error}</div>}

      <div className="messages-content" style={isMobile ? { display: 'block' } : {}}>
        <div
          className={`messages-list${animateList ? ' fade-in' : ''}`}
          style={isMobile ? { marginBottom: 24 } : {}}
          ref={listRef}
        >
          {filtered.length === 0 && !loading && (
            <div className="empty-state" style={{ textAlign: 'center', padding: '48px 0', color: '#888' }}>
              <FaInbox size={56} style={{ marginBottom: 12, color: '#b0b0b0' }} />
              <div style={{ fontWeight: 600, fontSize: 20, marginBottom: 6 }}>No messages found</div>
              <div style={{ fontSize: 15 }}>Try adjusting your search or filters.</div>
            </div>
          )}
          {filtered.map((m, i) => (
            <div
              className={`message-item${selected && selected.id === m.id ? ' selected' : ''}${!readStatus[m.id] ? ' unread' : ''}`}
              key={m.id}
              tabIndex={0}
              style={{ animationDelay: animateList ? `${i * 60}ms` : '0ms' }}
              onClick={() => { setSelected(m); setReadStatus(s => ({ ...s, [m.id]: true })); }}
              onKeyDown={e => { if (e.key === 'Enter') { setSelected(m); setReadStatus(s => ({ ...s, [m.id]: true })); } }}
              aria-label={`Message from ${m.full_name}`}
            >
              <div className="message-header">
                <div className="sender-info">
                  <h3>{m.full_name}</h3>
                  <div className="email">{m.email} • {m.phone_number}</div>
                </div>
                <div className="message-badges">
                  <span className={`status-badge ${!readStatus[m.id] ? 'unread' : 'read'}`}>{!readStatus[m.id] ? 'Unread' : 'Read'}</span>
                </div>
              </div>
              <div className="message-preview">
                <h4>{m.subject}</h4>
                <p>{m.message.length > 80 ? m.message.slice(0, 80) + '…' : m.message}</p>
              </div>
              <div className="message-footer">
                <span className="date">{m.date_sent ? new Date(m.date_sent).toLocaleString() : ''}</span>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button
                    className="admin-btn admin-btn-secondary"
                    onClick={e => { e.stopPropagation(); del(m.id); }}
                    aria-label="Delete message"
                  >Delete</button>
                  <button
                    className="admin-btn"
                    onClick={e => { e.stopPropagation(); toggleRead(m.id); }}
                    aria-label={!readStatus[m.id] ? 'Mark as read' : 'Mark as unread'}
                  >{!readStatus[m.id] ? 'Mark as Read' : 'Mark as Unread'}</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Message detail panel */}
        <div className="message-detail">
          {selected ? (
            <>
              <div className="detail-header">
                <div className="sender-details">
                  <h2>{selected.full_name}</h2>
                  <div className="contact-info">
                    <p><strong>Email:</strong> {selected.email}</p>
                    <p><strong>Phone:</strong> {selected.phone_number}</p>
                  </div>
                </div>
                <div className="detail-actions">
                  <button className="btn-delete" onClick={() => del(selected.id)} aria-label="Delete message">Delete</button>
                  <button className="admin-btn" onClick={() => setReplyModal(true)} aria-label="Reply">Reply</button>
                </div>
              </div>
              <div className="message-subject">
                <h3>{selected.subject}</h3>
                <span className="date">{selected.date_sent ? new Date(selected.date_sent).toLocaleString() : ''}</span>
              </div>
              <div className="message-body">
                <p>{selected.message}</p>
              </div>
            </>
          ) : (
            <div className="no-selection" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
              <div className="no-selection-content" style={{ textAlign: 'center', color: '#888' }}>
                <MdMailOutline size={56} style={{ marginBottom: 12, color: '#b0b0b0' }} />
                <h3 style={{ fontWeight: 600, fontSize: 22, marginBottom: 6 }}>No message selected</h3>
                <div style={{ fontSize: 15 }}>Select a message from the list to view its details here.</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Reply Modal (demo only) */}
      {replyModal && (
        <div className="reply-modal-overlay" role="dialog" aria-modal="true">
          <div className="reply-modal">
            <h3 style={{ color: 'var(--primary-green)', marginBottom: 16 }}>Reply to {selected?.full_name}</h3>
            <textarea
              className="reply-textarea"
              placeholder="Type your reply... (demo only)"
              value={replyText}
              onChange={e => setReplyText(e.target.value)}
              style={{ width: '100%', minHeight: 100, marginBottom: 16 }}
              aria-label="Reply message"
            />
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              <button className="admin-btn admin-btn-secondary" onClick={() => setReplyModal(false)}>Cancel</button>
              <button className="admin-btn" onClick={() => { setReplyModal(false); setReplyText(''); }}>Send</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessagesViewer;

