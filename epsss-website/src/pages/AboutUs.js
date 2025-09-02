import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/public/AboutUs.css';
import { MdTrackChanges, MdVisibility, MdStar} from 'react-icons/md';


function AboutUs() {
  const location = useLocation();

  useEffect(() => {
    // Support both /about-us/section and /about-us#section
    let section = null;
    if (location.pathname.startsWith('/about-us/')) {
      section = location.pathname.replace('/about-us/', '');
    } else if (location.hash) {
      section = location.hash.replace('#', '');
    }
    if (section) {
      const el = document.getElementById(section);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [location]);

  return (
    <div> 
 {/* Split Section - Single Image on left, History on right */}
      <section className="split-hero">
        {/* Left side - Single Image */}
        <div className="image-section">
          <div className="image-container">
            <img 
              src="/images/school1.JPG" 
              alt="School Building" 
              className="hero-image"
            />
          </div>
        </div>

        {/* Right side - School History */}
        <div className="content-section">
          <div className="content-wrapper">
            <h1>About Entebbe Parents Secondary School</h1>
            <p className="subtitle">Nurturing Excellence in Education Since 1988</p>
            
            <div className="history-content" id="our-history">
              <h2>Our History</h2>
              <p>
                Entebbe parents was founded in 1988 by the African Muslim community based in Bukoto-Nateete.
                It's a private community school. It was established with the aim of helping children have access
                to education at affordable prices.
              </p>
              <p>
                It provides a holistic education as evidenced by a number of responsible and outstanding personalities
                in the region and the country at large. You can never regret with us.
              </p> 
              <p>
                Over the years, we have maintained our commitment to academic excellence while adapting 
                to modern educational needs. Our graduates have gone on to excel in various fields, 
                contributing positively to society both locally and internationally.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* Main Content - Rest remains the same */}
      <div className="about-content">

        {/* Mission, Vision, Values */}
        <section className="about-section" id="our-foundation">
          <h2>Our Foundation</h2>
          <div className="mvv-container">
            <div className="mvv-item">
              <span className="mvv-icon"><MdTrackChanges /></span>
              <h3>Mission</h3>
              <p>
                TO PROVIDE ALL ROUND, SELF RELIANT CITIZENS.
              </p>
            </div>
            <div className="mvv-item">
              <span className="mvv-icon"><MdVisibility /></span>
              <h3>Vision</h3>
              <p>
                TO PROVIDE KNOWLEDGE AND SKILLS, DEVELOP TALENTS AND MORAL VALUES FOR SCHOOL AND STUDENTS' EXCELLENCE.
              </p>
            </div>
            <div className="mvv-item">
              <span className="mvv-icon"><MdStar /></span>
              <h3>Values</h3>
              <p>
                INTEGRITY, EXCELLENCE, RESPECT, INNOVATION, COMMUNITY SERVICE, AND LIFE LONG LEARNING 
                FROM THE CORE OF EVERYTHING WE DO.
              </p>
            </div>
          </div>
        </section>

        {/* Leadership */}
<section className="about-section" id="our-leadership">
  <h2>Our Leadership</h2>
  <div className="leadership-grid">
    <div className="leader-card">
      <div className="leader-avatar">
        <img src="/images/sch.JPG" alt="Madam Aisha Doka" style={{width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%'}} />
      </div>
      <h4>Madam Aisha.M Doka</h4>
      <div className="role">Head Teacher</div>
    </div>
    <div className="leader-card">
      <div className="leader-avatar">
        <img src="/images/sch.JPG" alt="Mr.Kizito Musa" style={{width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%'}} />
      </div>
      <h4>Mr. Kizito Musa</h4>
      <div className="role">Deputy Head Teacher</div>
    </div>
    <div className="leader-card">
      <div className="leader-avatar">
        <img src="/images/sch.JPG" alt="Mr. Kaggwa Andrew" style={{width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%'}} />
      </div>
      <h4>Mr. Kaggwa Andrew</h4>
      <div className="role">DOS A'level</div>
    </div>
    <div className="leader-card">
      <div className="leader-avatar">
        <img src="/images/sch.JPG" alt="Mr. Mugisa Arthur" style={{width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%'}} />
      </div>
      <h4>Mr. Mugisa Arthur</h4>
      <div className="role">DOS O'level</div>
    </div>
  </div>
</section>

        {/* Stats Section */}
        <section className="about-stats" id="our-achievements">
          <h2 style={{color: 'var(--text-dark)', marginBottom: '20px'}}>Our Achievements</h2>
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-number">700+</span>
              <span className="stat-label">Students</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">15+</span>
              <span className="stat-label">Teachers</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">28</span>
              <span className="stat-label">Years of Excellence</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">95%</span>
              <span className="stat-label">Success Rate</span>
            </div>
          </div>
        </section>

        {/* Facilities */}
        <section className="about-section" id="our-facilities">
          <h2>Our Facilities</h2>
          <p>
            EPSS boasts modern facilities designed to enhance the learning experience:
          </p>
          <div className="about-grid">
            <div style={{color: 'var(--text-dark)', lineHeight: '1.8'}}>
              <div>Well-equipped library with over 5,000 reading materials</div>
              <div>Modern science laboratories</div>
              <div>Computer laboratory with internet access</div>
              <div>Sports facilities and playground</div>
            </div>
            <div style={{color: 'var(--text-dark)', lineHeight: '1.8'}}>
              <div>Main hall for events</div>
              <div>School canteens and kitchen facilities</div>
              <div>Boarding facilities for boarding students</div>
              <div>School medical services</div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

export default AboutUs;