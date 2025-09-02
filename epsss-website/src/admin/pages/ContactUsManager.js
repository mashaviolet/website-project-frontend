


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/admin/AboutUsManager.css';


const ContactUsManager = () => {
	const [form, setForm] = useState({
		departments: [],
		location: { schoolName: '', address: '', landmark: '', lat: '', lng: '' },
		summary: { phones: [''], emails: [''], officeHours: [''] }
	});
	const [loading, setLoading] = useState(true);
	const [message, setMessage] = useState('');
	const [error, setError] = useState('');

	useEffect(() => {
		axios.get('/api/v1/contactinfo', { withCredentials: true })
			.then(res => {
				setForm(res.data);
				setLoading(false);
			})
			.catch(() => setLoading(false));
	}, []);

	// Department handlers
	const handleDeptChange = (idx, field, value) => {
		setForm(f => ({ ...f, departments: f.departments.map((d, i) => i === idx ? { ...d, [field]: value } : d) }));
	};
	const addDept = () => setForm(f => ({ ...f, departments: [...f.departments, { name: '', head: '', phone: '', email: '' }] }));
	const removeDept = idx => setForm(f => ({ ...f, departments: f.departments.filter((_, i) => i !== idx) }));

	// Location handlers
	const handleLocationChange = (field, value) => setForm(f => ({ ...f, location: { ...f.location, [field]: value } }));

	// Summary handlers
	const handleSummaryChange = (field, idx, value) => {
		setForm(f => ({ ...f, summary: { ...f.summary, [field]: f.summary[field].map((v, i) => i === idx ? value : v) } }));
	};
	const addSummaryField = (field) => setForm(f => ({ ...f, summary: { ...f.summary, [field]: [...f.summary[field], ''] } }));
	const removeSummaryField = (field, idx) => setForm(f => ({ ...f, summary: { ...f.summary, [field]: f.summary[field].filter((_, i) => i !== idx) } }));

	const handleSave = e => {
		e.preventDefault();
		setMessage('');
		setError('');
		axios.put('/api/v1/contactinfo', form, { withCredentials: true })
			.then(() => setMessage('Contact info updated!'))
			.catch(() => setError('Error updating contact info.'));
	};

		if (loading) return <div>Loading...</div>;

		const { departments, location, summary } = form;

		return (
			<div className="aboutus-manager-container">
				<h1 className="page-title" style={{ color: 'var(--primary-green)', textAlign: 'center' }}>Manage Contact Us Page</h1>
				{message && <div className="dashboard-card" style={{ color: 'green' }}>{message}</div>}
				{error && <div className="dashboard-card" style={{ color: 'red' }}>{error}</div>}

				<form className="aboutus-manager-form" onSubmit={handleSave}>
					<div className="dashboard-card">
						<h2 className="card-title" style={{ color: 'var(--primary-green)' }}>Departments</h2>
						<div className="feature-list">
							{departments.map((dept, idx) => (
								<div className="feature-card-edit" key={idx} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 16 }}>
									<div style={{ flex: 1 }}>
										<input value={dept.name} onChange={e => handleDeptChange(idx, 'name', e.target.value)} placeholder="Department Name" required />
										<input value={dept.head} onChange={e => handleDeptChange(idx, 'head', e.target.value)} placeholder="Head of Department" required />
										<input value={dept.phone} onChange={e => handleDeptChange(idx, 'phone', e.target.value)} placeholder="Phone" required />
										<input value={dept.email} onChange={e => handleDeptChange(idx, 'email', e.target.value)} placeholder="Email" required />
									</div>
									<button type="button" className="admin-btn admin-btn-secondary" onClick={() => removeDept(idx)}>Delete</button>
								</div>
							))}
							<button type="button" className="admin-btn" onClick={addDept}>Add Department</button>
						</div>
					</div>

					<div className="dashboard-card">
						<h2 className="card-title" style={{ color: 'var(--primary-green)' }}>School Location</h2>
						<div className="form-group">
							<label>School Name</label>
							<input value={location.schoolName} onChange={e => handleLocationChange('schoolName', e.target.value)} required />
						</div>
						<div className="form-group">
							<label>Address</label>
							<input value={location.address} onChange={e => handleLocationChange('address', e.target.value)} required />
						</div>
						<div className="form-group">
							<label>Landmark</label>
							<input value={location.landmark} onChange={e => handleLocationChange('landmark', e.target.value)} />
						</div>
						<div className="form-group">
							<label>Latitude</label>
							<input value={location.lat} onChange={e => handleLocationChange('lat', e.target.value)} required />
						</div>
						<div className="form-group">
							<label>Longitude</label>
							<input value={location.lng} onChange={e => handleLocationChange('lng', e.target.value)} required />
						</div>
					</div>

					<div className="dashboard-card">
						<h2 className="card-title" style={{ color: 'var(--primary-green)' }}>Contact Summary</h2>
						<div className="form-group">
							<label>Phone Numbers</label>
							{summary.phones.map((phone, idx) => (
								<div key={idx} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
									<input value={phone} onChange={e => handleSummaryChange('phones', idx, e.target.value)} required />
									<button type="button" className="admin-btn admin-btn-secondary" onClick={() => removeSummaryField('phones', idx)}>Delete</button>
								</div>
							))}
							<button type="button" className="admin-btn" onClick={() => addSummaryField('phones')}>Add Phone</button>
						</div>
						<div className="form-group">
							<label>Email Addresses</label>
							{summary.emails.map((email, idx) => (
								<div key={idx} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
									<input value={email} onChange={e => handleSummaryChange('emails', idx, e.target.value)} required />
									<button type="button" className="admin-btn admin-btn-secondary" onClick={() => removeSummaryField('emails', idx)}>Delete</button>
								</div>
							))}
							<button type="button" className="admin-btn" onClick={() => addSummaryField('emails')}>Add Email</button>
						</div>
						<div className="form-group">
							<label>Office Hours</label>
							{summary.officeHours.map((h, idx) => (
								<div key={idx} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
									<input value={h} onChange={e => handleSummaryChange('officeHours', idx, e.target.value)} required />
									<button type="button" className="admin-btn admin-btn-secondary" onClick={() => removeSummaryField('officeHours', idx)}>Delete</button>
								</div>
							))}
							<button type="button" className="admin-btn" onClick={() => addSummaryField('officeHours')}>Add Office Hour</button>
						</div>
					</div>

					<div className="form-actions">
						<button className="admin-btn" type="submit">Save</button>
					</div>
				</form>
			</div>
		);
};

export default ContactUsManager;
