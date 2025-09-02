import React, { useEffect, useState } from 'react';
import '../../styles/admin/AboutUsManager.css';
import aboutService from '../services/aboutService';

const AboutUsManager = () => {
  const [aboutData, setAboutData] = useState({
    subtitle: '',
    overview: ['', '', ''], // array of paragraphs
    mission: '',
    vision: '',
    values: '',
    image_url: '',
    leaders: [ { name: '', role: '', image: '' } ]
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await aboutService.get();
        if (!cancelled) setAboutData(res.data);
      } catch (_) {
        // no existing content yet is fine
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setAboutData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleOverviewChange = (idx, value) => {
    setAboutData(prev => {
      const overview = [...prev.overview];
      overview[idx] = value;
      return { ...prev, overview };
    });
  };

  const handleLeaderChange = (idx, field, value) => {
    setAboutData(prev => {
      const leaders = [...prev.leaders];
      leaders[idx][field] = value;
      return { ...prev, leaders };
    });
  };
  const addLeader = () => setAboutData(prev => ({ ...prev, leaders: [...prev.leaders, { name: '', role: '', image: '' }] }));
  const removeLeader = (idx) => setAboutData(prev => ({ ...prev, leaders: prev.leaders.filter((_, i) => i !== idx) }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (aboutData && (aboutData.overview || aboutData.mission || aboutData.vision || aboutData.image_url)) {
        // try update first, if 404 then create
        try {
          await aboutService.update(aboutData);
        } catch (err) {
          if (err && err.response && err.response.status === 404) {
            await aboutService.create(aboutData);
          } else {
            throw err;
          }
        }
        alert('About Us information saved');
      }
    } catch (err) {
      setError('Failed to save About Us');
    }
  };

  return (
    <div className="aboutus-manager-container">
      <h2>Manage About Us</h2>
      {loading && <div>Loading…</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <form className="aboutus-manager-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="subtitle">Subtitle</label>
          <input
            id="subtitle"
            name="subtitle"
            value={aboutData.subtitle}
            onChange={handleChange}
            placeholder="e.g. Nurturing Excellence in Education Since 1988"
          />
        </div>
        <div className="form-group">
          <label>Overview / History Paragraphs</label>
          {aboutData.overview.map((para, idx) => (
            <textarea
              key={idx}
              value={para}
              onChange={e => handleOverviewChange(idx, e.target.value)}
              rows="3"
              placeholder={`Paragraph ${idx+1}`}
              required
            />
          ))}
          <button type="button" onClick={() => setAboutData(prev => ({ ...prev, overview: [...prev.overview, ''] }))}>Add Paragraph</button>
          {aboutData.overview.length > 1 && (
            <button type="button" onClick={() => setAboutData(prev => ({ ...prev, overview: prev.overview.slice(0, -1) }))}>Remove Last Paragraph</button>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="mission">Mission Statement</label>
          <textarea
            id="mission"
            name="mission"
            value={aboutData.mission}
            onChange={handleChange}
            rows="3"
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="vision">Vision Statement</label>
          <textarea
            id="vision"
            name="vision"
            value={aboutData.vision}
            onChange={handleChange}
            rows="3"
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="values">Values</label>
          <textarea
            id="values"
            name="values"
            value={aboutData.values}
            onChange={handleChange}
            rows="2"
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="image_url">Hero Image URL</label>
          <input
            type="text"
            id="image_url"
            name="image_url"
            value={aboutData.image_url}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Leadership</label>
          {aboutData.leaders.map((leader, idx) => (
            <div className="feature-card-edit" key={idx}>
              <input
                placeholder="Name"
                value={leader.name}
                onChange={e => handleLeaderChange(idx, 'name', e.target.value)}
              />
              <input
                placeholder="Role"
                value={leader.role}
                onChange={e => handleLeaderChange(idx, 'role', e.target.value)}
              />
              <input
                placeholder="Image URL"
                value={leader.image}
                onChange={e => handleLeaderChange(idx, 'image', e.target.value)}
              />
              <button type="button" onClick={() => removeLeader(idx)} disabled={aboutData.leaders.length === 1}>Remove</button>
            </div>
          ))}
          <button type="button" onClick={addLeader}>Add Leader</button>
        </div>
        <div>
          <button type="submit">Save Changes</button>
        </div>
      </form>
    </div>
  );
};

export default AboutUsManager;