import React, { useState } from 'react';
import './Admissions.css';

function Admissions() {
  const [activeTab, setActiveTab] = useState('requirements');

  const admissionRequirements = {
    'S1': [
      'Primary Leaving Examination (PLE) certificate',
      'Birth certificate or baptism card',
      'Passport-size photographs (4 copies)',
      'School fees payment receipt',
      'Medical examination report'
    ],
    'S2-S4': [
      'Previous school academic transcripts',
      'Transfer letter from previous school',
      'Birth certificate or baptism card',
      'Passport-size photographs (4 copies)',
      'School fees payment receipt',
      'Medical examination report'
    ],
    'S5-S6': [
      'Uganda Certificate of Education (UCE) results',
      'Previous school academic transcripts',
      'Birth certificate',
      'Passport-size photographs (4 copies)',
      'School fees payment receipt',
      'Medical examination report'
    ]
  };

  const feeStructure = [
    { level: 'S1 - S2', Day: 'UGX 210,000', Boarding: 'UGX 410,000', },
    { level: 'S3 - S4', Day: 'UGX 230,000', Boarding: 'UGX 450,000', },
    { level: 'S5 - S6', Day: 'UGX 250,000', Boarding: 'UGX 500,000' }
  ];

  const importantDates = [
    { event: 'Application Opens', date: 'September 1st', description: 'Physical applications begin' },
    { event: 'Application Deadline', date: 'January 15th', description: 'Last date for submission' },
    { event: 'Entrance Interviews', date: 'January 20th - 25th', description: 'For selected candidates' },
    { event: 'Results Release', date: 'February 5th', description: 'Admission results published' },
    { event: 'School Opens', date: 'February 15th', description: 'First term begins' }
  ];

  return (
    <div className="admissions-container">
      {/* Hero Section */}
      <div className="admissions-hero">
        <div className="hero-content">
          <h1>Admissions</h1>
          <p className="hero-subtitle">Join Entebbe Parents Secondary School - Where Excellence Meets Opportunity</p>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">95%</span>
              <span className="stat-label">Pass Rate</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">500+</span>
              <span className="stat-label">Students</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">25+</span>
              <span className="stat-label">Years Experience</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="admissions-tabs">
        <button 
          className={`tab-button ${activeTab === 'requirements' ? 'active' : ''}`}
          onClick={() => setActiveTab('requirements')}
        >
          Requirements
        </button>
        <button 
          className={`tab-button ${activeTab === 'fees' ? 'active' : ''}`}
          onClick={() => setActiveTab('fees')}
        >
          Fee Structure
        </button>
        <button 
          className={`tab-button ${activeTab === 'dates' ? 'active' : ''}`}
          onClick={() => setActiveTab('dates')}
        >
          Important Dates
        </button>
        <button 
          className={`tab-button ${activeTab === 'process' ? 'active' : ''}`}
          onClick={() => setActiveTab('process')}
        >
          Application Process
        </button>
      </div>

      {/* Content Sections */}
      <div className="admissions-content">
        {activeTab === 'requirements' && (
          <div className="requirements-section">
            <h2>Admission Requirements</h2>
            <div className="requirements-grid">
              {Object.entries(admissionRequirements).map(([level, requirements]) => (
                <div key={level} className="requirement-card">
                  <h3>{level} Entry</h3>
                  <ul>
                    {requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'fees' && (
          <div className="fees-section">
            <h2>Fee Structure (Per Term)</h2>
            <div className="fees-table-container">
              <table className="fees-table">
                <thead>
                  <tr>
                    <th>Level</th>
                    <th>Day Fees</th>
                    <th>Boarding Fees</th>
                  </tr>
                </thead>
                <tbody>
                  {feeStructure.map((fee, index) => (
                    <tr key={index}>
                      <td>{fee.level}</td>
                      <td>{fee.Day}</td>
                      <td>{fee.Boarding}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="fee-notes">
              <h3>Additional Information</h3>
              <ul>
                <li>School fees are payable at the beginning of each term</li>
                <li>Lunch fees for day students: UGX 50,000 per term</li>
                <li>Uniform and textbooks are additional costs</li>
                <li>Payment can be made in the bank </li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'dates' && (
          <div className="dates-section">
            <h2>Important Dates - 2025 Academic Year</h2>
            <div className="timeline">
              {importantDates.map((item, index) => (
                <div key={index} className="timeline-item">
                  <div className="timeline-date">{item.date}</div>
                  <div className="timeline-content">
                    <h3>{item.event}</h3>
                    <p>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'process' && (
          <div className="process-section">
            <h2>Application Process</h2>
            <div className="process-steps">
              <div className="step">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h3>Obtain Application Form</h3>
                  <p>Visit the school office or download the form from our website. Application fee: UGX 25,000</p>
                </div>
              </div>
              <div className="step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h3>Complete Application</h3>
                  <p>Fill out all required sections and attach necessary documents as listed in requirements</p>
                </div>
              </div>
              <div className="step">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h3>Submit Application</h3>
                  <p>Submit completed form to the school office or mail to our address before the deadline</p>
                </div>
              </div>
              <div className="step">
                <div className="step-number">4</div>
                <div className="step-content">
                  <h3>Interview & Assessment</h3>
                  <p>Selected candidates will be invited for an interview and placement test</p>
                </div>
              </div>
              <div className="step">
                <div className="step-number">5</div>
                <div className="step-content">
                  <h3>Admission Results</h3>
                  <p>Results will be communicated via phone call and posted on the school notice board</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Contact Information */}
      <div className="contact-section">
        <h2>Contact Admissions Office</h2>
        <div className="contact-grid">
          <div className="contact-item">
            <h3>Phone</h3>
            <p>+256 414 320 123</p>
            <p>+256 772 456 789</p>
          </div>
          <div className="contact-item">
            <h3>Email</h3>
            <p>admissions@entebbeprentsss.ac.ug</p>
            <p>info@entebbeprentsss.ac.ug</p>
          </div>
          <div className="contact-item">
            <h3>Address</h3>
            <p>Entebbe Parents Secondary School</p>
            <p>Plot 15, Kampala Road</p>
            <p>Entebbe, Uganda</p>
          </div>
          <div className="contact-item">
            <h3>Office Hours</h3>
            <p>Monday - Friday: 8:00 AM - 5:00 PM</p>
            <p>Saturday: 9:00 AM - 1:00 PM</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admissions;