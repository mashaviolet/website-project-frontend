
import React, { useEffect, useState } from 'react';
import galleryService from '../services/galleryService';
import '../../styles/admin/AboutUsManager.css';

const GalleryManager = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ image_url: '', caption: '' });
  const [editingId, setEditingId] = useState(null);

  const load = async () => {
    setError('');
    try {
      const res = await galleryService.list();
      setItems(res.data);
    } catch (_) {
      setError('Failed to load gallery');
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
        await galleryService.update(editingId, form);
      } else {
        await galleryService.create(form);
      }
      setForm({ image_url: '', caption: '' });
      setEditingId(null);
      await load();
    } catch (_) {
      setError('Failed to save');
    }
  };

  const edit = (item) => {
    setEditingId(item.id);
    setForm({ image_url: item.image_url, caption: item.caption });
  };

  const del = async (id) => {
    if (!window.confirm('Delete this image?')) return;
    try {
      await galleryService.remove(id);
      await load();
    } catch (_) {
      setError('Failed to delete');
    }
  };


  return (
    <div className="aboutus-manager-container">
      <h1 className="page-title" style={{ color: 'var(--primary-green)', textAlign: 'center' }}>Manage Gallery</h1>
      {loading && <div className="dashboard-card">Loading…</div>}
      {error && <div className="dashboard-card" style={{ color: 'red' }}>{error}</div>}

      <div className="dashboard-card">
        <h2 className="card-title" style={{ color: 'var(--primary-green)' }}>{editingId ? 'Edit Image' : 'Add Image'}</h2>
        <form className="aboutus-manager-form" onSubmit={submit}>
          <div className="form-group">
            <label>Image URL</label>
            <input value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} required />
          </div>
          <div className="form-group">
            <label>Caption</label>
            <input value={form.caption} onChange={(e) => setForm({ ...form, caption: e.target.value })} />
          </div>
          <div className="form-actions">
            <button className="admin-btn" type="submit">{editingId ? 'Update' : 'Create'}</button>
            {editingId && <button type="button" className="admin-btn admin-btn-secondary" onClick={() => { setEditingId(null); setForm({ image_url: '', caption: '' }); }}>Cancel</button>}
          </div>
        </form>
      </div>

      <div className="dashboard-card">
        <h2 className="card-title" style={{ color: 'var(--primary-green)' }}>All Images</h2>
        <div className="feature-list">
          {items.map((img) => (
            <div className="feature-card-edit" key={img.id} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 16 }}>
              <div style={{ flex: 1 }}>
                <div style={{ color: 'black', fontWeight: 600 }}>{img.caption || 'No caption'}</div>
                <div style={{ color: '#555', fontSize: 13 }}>{img.image_url}</div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="admin-btn" onClick={() => edit(img)}>Edit</button>
                <button className="admin-btn admin-btn-secondary" onClick={() => del(img.id)}>Delete</button>
              </div>
            </div>
          ))}
          {items.length === 0 && !loading && <div style={{ color: '#555' }}>No images yet.</div>}
        </div>
      </div>
    </div>
  );
};

export default GalleryManager;

