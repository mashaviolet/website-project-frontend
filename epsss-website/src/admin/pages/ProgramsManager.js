
import React, { useEffect, useState } from 'react';
import programsService from '../services/programsService';
import '../../styles/admin/AboutUsManager.css';

const ProgramsManager = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ title: '', description: '', duration: '', requirements: '' });
  const [editingId, setEditingId] = useState(null);

  const load = async () => {
    setError('');
    try {
      const res = await programsService.list();
      setItems(res.data);
    } catch (_) {
      setError('Failed to load programs');
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
        await programsService.update(editingId, form);
      } else {
        await programsService.create(form);
      }
      setForm({ title: '', description: '', duration: '', requirements: '' });
      setEditingId(null);
      await load();
    } catch (_) {
      setError('Failed to save');
    }
  };

  const edit = (item) => {
    setEditingId(item.id);
    setForm({ title: item.title, description: item.description, duration: item.duration, requirements: item.requirements });
  };

  const del = async (id) => {
    if (!window.confirm('Delete this program?')) return;
    try {
      await programsService.remove(id);
      await load();
    } catch (_) {
      setError('Failed to delete');
    }
  };


  return (
    <div className="aboutus-manager-container">
      <h1 className="page-title" style={{ color: 'var(--primary-green)', textAlign: 'center' }}>Manage Programs</h1>
      {loading && <div className="dashboard-card">Loading…</div>}
      {error && <div className="dashboard-card" style={{ color: 'red' }}>{error}</div>}

      <div className="dashboard-card">
        <h2 className="card-title" style={{ color: 'var(--primary-green)' }}>{editingId ? 'Edit Program' : 'Add Program'}</h2>
        <form className="aboutus-manager-form" onSubmit={submit}>
          <div className="form-group">
            <label>Title</label>
            <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows="4" required />
          </div>
          <div className="form-group">
            <label>Duration</label>
            <input value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} />
          </div>
          <div className="form-group">
            <label>Requirements</label>
            <textarea value={form.requirements} onChange={(e) => setForm({ ...form, requirements: e.target.value })} rows="3" />
          </div>
          <div className="form-actions">
            <button className="admin-btn" type="submit">{editingId ? 'Update' : 'Create'}</button>
            {editingId && <button type="button" className="admin-btn admin-btn-secondary" onClick={() => { setEditingId(null); setForm({ title: '', description: '', duration: '', requirements: '' }); }}>Cancel</button>}
          </div>
        </form>
      </div>

      <div className="dashboard-card">
        <h2 className="card-title" style={{ color: 'var(--primary-green)' }}>All Programs</h2>
        <div className="feature-list">
          {items.map((p) => (
            <div className="feature-card-edit" key={p.id} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 16 }}>
              <div style={{ flex: 1 }}>
                <div style={{ color: 'black', fontWeight: 600 }}>{p.title}</div>
                <div style={{ color: '#555', fontSize: 13 }}>{p.description?.slice(0, 80)}{p.description?.length > 80 ? '…' : ''}</div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="admin-btn" onClick={() => edit(p)}>Edit</button>
                <button className="admin-btn admin-btn-secondary" onClick={() => del(p.id)}>Delete</button>
              </div>
            </div>
          ))}
          {items.length === 0 && !loading && <div style={{ color: '#555' }}>No programs yet.</div>}
        </div>
      </div>
    </div>
  );
};

export default ProgramsManager;

