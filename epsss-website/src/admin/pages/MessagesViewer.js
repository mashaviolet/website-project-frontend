import React, { useEffect, useState } from 'react';
import contactService from '../services/contactService';

const MessagesViewer = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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

  const del = async (id) => {
    if (!window.confirm('Delete this message?')) return;
    try {
      await contactService.remove(id);
      await load();
    } catch (_) {
      setError('Failed to delete');
    }
  };

  return (
    <div className="dashboard">
      <h1 className="page-title">Contact Messages</h1>
      {loading && <div className="dashboard-card">Loading…</div>}
      {error && <div className="dashboard-card" style={{ color: 'red' }}>{error}</div>}

      <div className="dashboard-card">
        <h2 className="card-title">Inbox</h2>
        <div className="activity-list">
          {items.map((m) => (
            <div className="activity-item" key={m.id}>
              <div className="activity-action"><strong>{m.full_name}</strong> • {m.email} • {m.phone_number}</div>
              <div className="activity-time">{m.subject}</div>
              <div style={{ marginTop: 6 }}>{m.message}</div>
              <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
                <button className="admin-btn admin-btn-secondary" onClick={() => del(m.id)}>Delete</button>
              </div>
            </div>
          ))}
          {items.length === 0 && !loading && <div>No messages yet.</div>}
        </div>
      </div>
    </div>
  );
};

export default MessagesViewer;

