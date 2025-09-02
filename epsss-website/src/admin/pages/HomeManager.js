import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/admin/HomeManager.css';
const HomeManager = () => {
  const [form, setForm] = useState({
    welcome_text: '',
    school_name: '',
    motto: '',
    headline: '',
    intro_text: '',
    image_url: '',
    features: []
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch current home content
    axios.get('/api/v1/home', { withCredentials: true })
      .then(res => {
        setForm(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);


  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Features handlers
  const handleFeatureChange = (idx, field, value) => {
    const updated = form.features.map((f, i) => i === idx ? { ...f, [field]: value } : f);
    setForm({ ...form, features: updated });
  };
  const addFeature = () => {
    setForm({ ...form, features: [...form.features, { title: '', description: '', icon: '' }] });
  };
  const removeFeature = idx => {
    setForm({ ...form, features: form.features.filter((_, i) => i !== idx) });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setMessage('');
    axios.put('/api/v1/home', form, { withCredentials: true })
      .then(() => setMessage('Home content updated!'))
      .catch(() => setMessage('Error updating content.'));
  };

  if (loading) return <div>Loading...</div>;

    return (
      <div className="home-manager-container">
        <h2>Manage Home Page Content</h2>
        {message && <div>{message}</div>}
        <form className="home-manager-form" onSubmit={handleSubmit}>
          <div>
            <label>Welcome Text:</label>
            <input name="welcome_text" value={form.welcome_text} onChange={handleChange} />
          </div>
          <div>
            <label>School Name:</label>
            <input name="school_name" value={form.school_name} onChange={handleChange} />
          </div>
          <div>
            <label>Motto:</label>
            <input name="motto" value={form.motto} onChange={handleChange} />
          </div>
          <div>
            <label>Headline (Section Title):</label>
            <input name="headline" value={form.headline} onChange={handleChange} />
          </div>
          <div>
            <label>Intro Text (Section Subtitle):</label>
            <textarea name="intro_text" value={form.intro_text} onChange={handleChange} />
          </div>
          <div>
            <label>Image URL:</label>
            <input name="image_url" value={form.image_url} onChange={handleChange} />
          </div>
          <div className="feature-list">
            <label>Features:</label>
            {form.features.map((feature, idx) => (
              <div key={idx} className="feature-card-edit">
                <input
                  placeholder="Title"
                  value={feature.title}
                  onChange={e => handleFeatureChange(idx, 'title', e.target.value)}
                />
                <input
                  placeholder="Icon (e.g. FaStar)"
                  value={feature.icon}
                  onChange={e => handleFeatureChange(idx, 'icon', e.target.value)}
                />
                <textarea
                  placeholder="Description"
                  value={feature.description}
                  onChange={e => handleFeatureChange(idx, 'description', e.target.value)}
                />
                <button type="button" onClick={() => removeFeature(idx)}>Remove</button>
              </div>
            ))}
            <button type="button" onClick={addFeature}>Add Feature</button>
          </div>
          <button type="submit">Save</button>
        </form>
      </div>
    );
};

export default HomeManager;
