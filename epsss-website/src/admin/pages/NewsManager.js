import React, { useEffect, useState } from 'react';
import newsService from '../services/newsService';

const NewsManager = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    title: '',
    content: '',
    summary: '',
    date: '',
    category: '',
    isNew: false,
    image: '' // image URL for now
  });
  const [editingId, setEditingId] = useState(null);

  const load = async () => {
    setError('');
    try {
      const res = await newsService.list();
      setItems(res.data);
    } catch (_) {
      setError('Failed to load news');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (editingId) {
        await newsService.update(editingId, form);
      } else {
        await newsService.create(form);
      }
  setForm({ title: '', content: '', summary: '', date: '', category: '', isNew: false, image: '' });
      setEditingId(null);
      await load();
    } catch (_) {
      setError('Failed to save');
    }
  };

  const edit = (item) => {
    setEditingId(item.id);
    setForm({
      title: item.title || '',
      content: item.content || '',
      summary: item.summary || '',
      date: item.date || '',
      category: item.category || '',
      isNew: !!item.isNew,
      image: item.image || ''
    });
  };

  const del = async (id) => {
    if (!window.confirm('Delete this item?')) return;
    try {
      await newsService.remove(id);
      await load();
    } catch (_) {
      setError('Failed to delete');
    }
  };

    return (
      <div className="aboutus-manager-container">
    <h1 className="page-title" style={{ color: 'var(--primary-green)', textAlign: 'center' }}>Manage News</h1>
        {loading && <div className="feature-card-edit">Loading…</div>}
        {error && <div className="feature-card-edit" style={{ color: 'red' }}>{error}</div>}

        <div className="feature-card-edit">
          <h2 className="card-title">{editingId ? 'Edit News' : 'Add News'}</h2>
          <form className="aboutus-manager-form" onSubmit={submit}>
            <div className="form-group">
              <label>Title</label>
              <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>Summary</label>
              <input value={form.summary} onChange={e => setForm({ ...form, summary: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>Date</label>
              <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>Category</label>
              <input value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>Image URL</label>
              <input value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} />
            </div>
            <div className="form-group">
              <label><input type="checkbox" checked={form.isNew} onChange={e => setForm({ ...form, isNew: e.target.checked })} /> Mark as NEW</label>
            </div>
            <div className="form-group">
              <label>Content</label>
              <textarea value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} rows="5" required />
            </div>
            <div className="form-actions">
              <button className="admin-btn" type="submit">{editingId ? 'Update' : 'Create'}</button>
              {editingId && <button type="button" className="admin-btn admin-btn-secondary" onClick={() => { setEditingId(null); setForm({ title: '', content: '', summary: '', date: '', category: '', isNew: false, image: '' }); }}>Cancel</button>}
            </div>
          </form>
        </div>

        <div className="feature-card-edit">
          <h2 className="card-title">All News</h2>
          <div className="feature-list">
            {items.map((n) => (
              <div className="feature-card-edit" key={n.id} style={{marginBottom:12}}>
                <div style={{display:'flex',alignItems:'center',gap:8}}>
                  <strong>{n.title}</strong> {n.isNew && <span style={{color:'gold',fontWeight:'bold',marginLeft:8}}>[NEW]</span>}
                </div>
                <div style={{margin:'8px 0'}}>
                  <div><b>Date:</b> {n.date}</div>
                  <div><b>Category:</b> {n.category}</div>
                  <div><b>Summary:</b> {n.summary}</div>
                  <div><b>Content:</b> {n.content?.slice(0, 80)}{n.content?.length > 80 ? '…' : ''}</div>
                  {n.image && <div><img src={n.image} alt="news" style={{maxWidth:80, maxHeight:50, marginTop:4}} /></div>}
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button className="admin-btn" onClick={() => edit(n)}>Edit</button>
                  <button className="admin-btn admin-btn-secondary" onClick={() => del(n.id)}>Delete</button>
                </div>
              </div>
            ))}
            {items.length === 0 && !loading && <div>No news yet.</div>}
          </div>
        </div>
      </div>
  );
};

export default NewsManager;

