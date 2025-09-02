
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/admin/AdmissionsManager.css';

const defaultLevels = [
  'Nursery',
  'Primary',
  'Secondary',
  'Other'
];

const AdmissionsManager = () => {
  const [admissionsContent, setAdmissionsContent] = useState({
    requirements: {},
    fee_structure: [], // [{level, day, boarding}]
    fee_notes: [], // [string]
    important_dates: [], // [{event, date, description}]
    procedure: [], // [{title, description}]
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [newLevel, setNewLevel] = useState('');

    useEffect(() => {
      axios.get('/api/admissions')
        .then(res => {
          // Ensure all default levels exist
          const data = res.data || {};
          const reqs = { ...data.requirements };
          defaultLevels.forEach(lvl => {
            if (!reqs[lvl]) reqs[lvl] = [];
          });
          setAdmissionsContent({
            requirements: reqs,
            fee_structure: data.fee_structure || [],
            fee_notes: data.fee_notes || [],
            important_dates: data.important_dates || [],
            procedure: data.procedure || [],
          });
          setLoading(false);
        })
        .catch(() => {
          setError('Failed to load admissions content.');
          setLoading(false);
        });
    }, []);

    // Requirements handlers
    const handleRequirementChange = (level, idx, value) => {
      setAdmissionsContent(prev => {
        const updated = { ...prev };
        updated.requirements = { ...updated.requirements };
        updated.requirements[level] = [...(updated.requirements[level] || [])];
        updated.requirements[level][idx] = value;
        return updated;
      });
    };
    const handleAddRequirement = (level) => {
      setAdmissionsContent(prev => {
        const updated = { ...prev };
        updated.requirements = { ...updated.requirements };
        updated.requirements[level] = [...(updated.requirements[level] || []), ''];
        return updated;
      });
    };
    const handleRemoveRequirement = (level, idx) => {
      setAdmissionsContent(prev => {
        const updated = { ...prev };
        updated.requirements = { ...updated.requirements };
        updated.requirements[level] = updated.requirements[level].filter((_, i) => i !== idx);
        return updated;
      });
    };
    const handleAddLevel = () => {
      if (!newLevel.trim()) return;
      setAdmissionsContent(prev => {
        const updated = { ...prev };
        updated.requirements = { ...updated.requirements };
        if (!updated.requirements[newLevel]) {
          updated.requirements[newLevel] = [];
        }
        return updated;
      });
      setNewLevel('');
    };
    const handleRemoveLevel = (level) => {
      setAdmissionsContent(prev => {
        const updated = { ...prev };
        updated.requirements = { ...updated.requirements };
        delete updated.requirements[level];
        return updated;
      });
    };

    // Fee structure handlers (table)
    const handleFeeChange = (idx, field, value) => {
      setAdmissionsContent(prev => {
        const updated = { ...prev };
        updated.fee_structure = [...(updated.fee_structure || [])];
        updated.fee_structure[idx] = { ...updated.fee_structure[idx], [field]: value };
        return updated;
      });
    };
    const handleAddFee = () => {
      setAdmissionsContent(prev => {
        const updated = { ...prev };
        updated.fee_structure = [...(updated.fee_structure || []), { level: '', day: '', boarding: '' }];
        return updated;
      });
    };
    const handleRemoveFee = (idx) => {
      setAdmissionsContent(prev => {
        const updated = { ...prev };
        updated.fee_structure = updated.fee_structure.filter((_, i) => i !== idx);
        return updated;
      });
    };
    // Fee notes handlers
    const handleFeeNoteChange = (idx, value) => {
      setAdmissionsContent(prev => {
        const updated = { ...prev };
        updated.fee_notes = [...(updated.fee_notes || [])];
        updated.fee_notes[idx] = value;
        return updated;
      });
    };
    const handleAddFeeNote = () => {
      setAdmissionsContent(prev => {
        const updated = { ...prev };
        updated.fee_notes = [...(updated.fee_notes || []), ''];
        return updated;
      });
    };
    const handleRemoveFeeNote = (idx) => {
      setAdmissionsContent(prev => {
        const updated = { ...prev };
        updated.fee_notes = updated.fee_notes.filter((_, i) => i !== idx);
        return updated;
      });
    };

    // Important dates handlers (event, date, description)
    const handleDateChange = (idx, field, value) => {
      setAdmissionsContent(prev => {
        const updated = { ...prev };
        updated.important_dates = [...(updated.important_dates || [])];
        updated.important_dates[idx] = { ...updated.important_dates[idx], [field]: value };
        return updated;
      });
    };
    const handleAddDate = () => {
      setAdmissionsContent(prev => {
        const updated = { ...prev };
        updated.important_dates = [...(updated.important_dates || []), { event: '', date: '', description: '' }];
        return updated;
      });
    };
    const handleRemoveDate = (idx) => {
      setAdmissionsContent(prev => {
        const updated = { ...prev };
        updated.important_dates = updated.important_dates.filter((_, i) => i !== idx);
        return updated;
      });
    };
    // Application process handlers (procedure)
    const handleProcessChange = (idx, field, value) => {
      setAdmissionsContent(prev => {
        const updated = { ...prev };
        updated.procedure = [...(updated.procedure || [])];
        updated.procedure[idx] = { ...updated.procedure[idx], [field]: value };
        return updated;
      });
    };
    const handleAddProcess = () => {
      setAdmissionsContent(prev => {
        const updated = { ...prev };
        updated.procedure = [...(updated.procedure || []), { title: '', description: '' }];
        return updated;
      });
    };
    const handleRemoveProcess = (idx) => {
      setAdmissionsContent(prev => {
        const updated = { ...prev };
        updated.procedure = updated.procedure.filter((_, i) => i !== idx);
        return updated;
      });
    };

    // Save handler
    const handleSave = () => {
      setSaving(true);
      setError('');
      setSuccess('');
      // Prepare payload for backend
      const payload = {
        ...admissionsContent,
        fee_structure: admissionsContent.fee_structure,
        fee_notes: admissionsContent.fee_notes,
        important_dates: admissionsContent.important_dates,
        procedure: admissionsContent.procedure,
      };
      axios.post('/api/admissions', payload)
        .then(() => {
          setSuccess('Admissions content saved successfully.');
          setSaving(false);
        })
        .catch(() => {
          setError('Failed to save admissions content.');
          setSaving(false);
        });
    };

    if (loading) return <div className="admin-loading">Loading...</div>;

    return (
      <div className="admin-page-container admissions-manager">
        <h2>Admissions Manager</h2>
        {error && <div className="admin-error">{error}</div>}
        {success && <div className="admin-success">{success}</div>}

        <div className="admin-section">
          <h3>Requirements</h3>
          <div className="admin-add-level-row">
            <input
              type="text"
              value={newLevel}
              onChange={e => setNewLevel(e.target.value)}
              placeholder="Add new level (e.g. Pre-Nursery)"
              className="admin-input"
            />
            <button onClick={handleAddLevel} className="admin-add-btn">Add Level</button>
          </div>
          {Object.keys(admissionsContent.requirements || {}).map(level => (
            <div key={level} className="admin-subsection">
              <div className="admin-subsection-header">
                <h4>{level}</h4>
                {!defaultLevels.includes(level) && (
                  <button onClick={() => handleRemoveLevel(level)} className="admin-remove-btn">Remove Level</button>
                )}
              </div>
              {(admissionsContent.requirements[level] || []).map((req, idx) => (
                <div key={idx} className="admin-list-item">
                  <input
                    type="text"
                    value={req}
                    onChange={e => handleRequirementChange(level, idx, e.target.value)}
                    className="admin-input"
                  />
                  <button onClick={() => handleRemoveRequirement(level, idx)} className="admin-remove-btn">Remove</button>
                </div>
              ))}
              <button onClick={() => handleAddRequirement(level)} className="admin-add-btn">Add Requirement</button>
            </div>
          ))}
        </div>

        <div className="admin-section">
          <h3>Fee Structure</h3>
          <div className="admin-fee-table">
            <div className="admin-fee-table-header admin-list-item">
              <span className="admin-input" style={{fontWeight:'bold'}}>Level</span>
              <span className="admin-input" style={{fontWeight:'bold'}}>Day</span>
              <span className="admin-input" style={{fontWeight:'bold'}}>Boarding</span>
              <span style={{width:40}}></span>
            </div>
            {(admissionsContent.fee_structure || []).map((fee, idx) => (
              <div key={idx} className="admin-list-item">
                <input
                  type="text"
                  value={fee.level}
                  onChange={e => handleFeeChange(idx, 'level', e.target.value)}
                  placeholder="Level"
                  className="admin-input"
                />
                <input
                  type="text"
                  value={fee.day}
                  onChange={e => handleFeeChange(idx, 'day', e.target.value)}
                  placeholder="Day Fees"
                  className="admin-input"
                />
                <input
                  type="text"
                  value={fee.boarding}
                  onChange={e => handleFeeChange(idx, 'boarding', e.target.value)}
                  placeholder="Boarding Fees"
                  className="admin-input"
                />
                <button onClick={() => handleRemoveFee(idx)} className="admin-remove-btn">Remove</button>
              </div>
            ))}
            <button onClick={handleAddFee} className="admin-add-btn">Add Fee Row</button>
          </div>
          <div className="admin-fee-notes">
            <h4>Additional Information</h4>
            {(admissionsContent.fee_notes || []).map((note, idx) => (
              <div key={idx} className="admin-list-item">
                <input
                  type="text"
                  value={note}
                  onChange={e => handleFeeNoteChange(idx, e.target.value)}
                  placeholder="Fee note"
                  className="admin-input"
                />
                <button onClick={() => handleRemoveFeeNote(idx)} className="admin-remove-btn">Remove</button>
              </div>
            ))}
            <button onClick={handleAddFeeNote} className="admin-add-btn">Add Fee Note</button>
          </div>
        </div>

        <div className="admin-section">
          <h3>Important Dates</h3>
          {(admissionsContent.important_dates || []).map((date, idx) => (
            <div key={idx} className="admin-list-item">
              <input
                type="text"
                value={date.event}
                onChange={e => handleDateChange(idx, 'event', e.target.value)}
                placeholder="Event"
                className="admin-input"
              />
              <input
                type="text"
                value={date.date}
                onChange={e => handleDateChange(idx, 'date', e.target.value)}
                placeholder="Date"
                className="admin-input"
              />
              <input
                type="text"
                value={date.description}
                onChange={e => handleDateChange(idx, 'description', e.target.value)}
                placeholder="Description"
                className="admin-input"
              />
              <button onClick={() => handleRemoveDate(idx)} className="admin-remove-btn">Remove</button>
            </div>
          ))}
          <button onClick={handleAddDate} className="admin-add-btn">Add Date</button>
        </div>
        <div className="admin-section">
          <h3>Application Process</h3>
          {(admissionsContent.procedure || []).map((step, idx) => (
            <div key={idx} className="admin-list-item">
              <input
                type="text"
                value={step.title}
                onChange={e => handleProcessChange(idx, 'title', e.target.value)}
                placeholder={`Step Title (e.g. Step ${idx+1})`}
                className="admin-input"
              />
              <input
                type="text"
                value={step.description}
                onChange={e => handleProcessChange(idx, 'description', e.target.value)}
                placeholder="Description"
                className="admin-input"
              />
              <button onClick={() => handleRemoveProcess(idx)} className="admin-remove-btn">Remove</button>
            </div>
          ))}
          <button onClick={handleAddProcess} className="admin-add-btn">Add Step</button>
        </div>

        <button onClick={handleSave} className="admin-save-btn" disabled={saving}>
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    );
  };

  export default AdmissionsManager;

