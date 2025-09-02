import React, { useState, useEffect } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaLightbulb } from 'react-icons/fa'; // Updated to use react-icons
import '../styles/public/Admissions.css';
import students1 from '../assets/students1.jpg';
import students8 from '../assets/students8.jpg'; // Add second image

function Admissions() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('requirements');
  const [pendingScroll, setPendingScroll] = useState(null);
  const location = useLocation();
  const { section } = useParams();

  // Map section IDs to tab keys
  const sectionToTab = {
    requirements: 'requirements',
    'fee-structure': 'fees',
    'important-dates': 'dates',
    'application-process': 'process',
  };

  // On mount and location/params change, sync tab with section or hash
  useEffect(() => {
    let target = null;
    if (sectionToTab[section]) {
      setActiveTab(sectionToTab[section]);
      target = section;
    } else if (location.hash) {
      const hash = location.hash.replace('#', '');
      if (sectionToTab[hash]) {
        setActiveTab(sectionToTab[hash]);
        target = hash;
      }
    }
    if (target) setPendingScroll(target);
  }, [location, section]);

  // After tab is set, scroll to the section if needed
  useEffect(() => {
    if (pendingScroll) {
      // Wait for the element to exist in the DOM before scrolling
      const scrollToSection = () => {
        const el = document.getElementById(pendingScroll);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          setPendingScroll(null);
        } else {
          // Try again on next animation frame
          requestAnimationFrame(scrollToSection);
        }
      };
      scrollToSection();
    }
  }, [activeTab, pendingScroll]);
  // const navigate = useNavigate(); // Uncomment in actual app
  
  const handleContactClick = () => {
    navigate('/contact-us');
  };

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
      {/* Hero Section with Divided Images */}
  <div className="admissions-hero" id="admissions-hero">
        <section className="hero-section">
          {/* Left Image */}
          <div 
            className="hero-image-left"
            style={{
              backgroundImage: `url(${students1})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          ></div>
          
          {/* Right Image */}
          <div 
            className="hero-image-right"
            style={{
              backgroundImage: `url(${students8})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          ></div>
          
          {/* Dark Overlay Container */}
          <div className="hero-overlay">
            <div className="hero-content-container">
              <h1>Admissions</h1>
              <p>Join Entebbe Parents Secondary School - Where Excellence Meets Opportunity</p>
              
              {/* Stats Cards with Dark Container */}
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
                  <span className="stat-number">28</span>
                  <span className="stat-label">Years Experience</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Navigation Tabs */}
  <div className="admissions-tabs" id="admissions-tabs">
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
          Fees Structure
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
          <div className="requirements-section" id="requirements">
            <h2>Admission Requirements</h2>
            <div className="requirements-grid">
              {Object.entries(admissionRequirements).map(([level, requirements]) => (
                <div key={level} className="requirement-card">
                  <h3>{level} Entry</h3>
                  <ul>
                    {requirements.map((req, index) => (
                      <li key={index}>
                        <FaCheckCircle className="requirement-icon" /> {/* Updated icon */}
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'fees' && (
          <div className="fees-section" id="fee-structure">
            <h2>Fees Structure (Per Term)</h2>
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
                <li>
                  <FaLightbulb className="fee-note-icon" /> {/* Updated icon */}
                  School fees are payable at the beginning of each term
                </li>
                <li>
                  <FaLightbulb className="fee-note-icon" /> {/* Updated icon */}
                  Lunch fees for day students: UGX 50,000 per term
                </li>
                <li>
                  <FaLightbulb className="fee-note-icon" /> {/* Updated icon */}
                  Uniform and textbooks are additional costs
                </li>
                <li>
                  <FaLightbulb className="fee-note-icon" /> {/* Updated icon */}
                  Payment can be made in the bank
                </li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'dates' && (
          <div className="dates-section" id="important-dates">
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
          <div className="process-section" id="application-process">
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
  <div className="admissions-cta" id="admissions-cta">
        <div className='cta-content'>
          <button className="cta-button" onClick={handleContactClick}>
            Contact Admissions Office
          </button>
        </div>
      </div>
    </div>
  );
}

export default Admissions;