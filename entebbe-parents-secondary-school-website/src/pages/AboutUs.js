import React from 'react';
import '../styles/AboutUs.css';

function AboutUs() {
  return (
    <div className="about-container">
      {/* Hero Section */}
      <section className="about-hero">
        <h1>About Entebbe Parents Secondary School</h1>
        <p>Nurturing Excellence in Education Since 1998</p>
      </section>

      {/* Main Content */}
      <div className="about-content">
        
        {/* History Section */}
        <section className="about-section">
          <h2>Our History</h2>
          <p>
            Entebbe parents was founded in 1988 by the African Muslim community based in Bukoto-Nateete.
            It’s a private community school. It was established with the aim of helping children have access
            to education at affordable prices.
            It provides a holistic education as evidenced by a number of responsible and outstanding personalities
            in the region and the country at large.
            You can never regret with us.
          </p> 
          <p>
            Over the years, we have maintained our commitment to academic excellence while adapting 
            to modern educational needs. Our graduates have gone on to excel in various fields, 
            contributing positively to society both locally and internationally.
          </p>
        </section>

        {/* Stats Section */}
        <section className="about-stats">
          <h2 style={{color: 'var(--text-dark)', marginBottom: '20px'}}>Our Achievements</h2>
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-number">800+</span>
              <span className="stat-label">Students</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">45+</span>
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

        {/* Mission, Vision, Values */}
        <section className="about-section">
          <h2>Our Foundation</h2>
          <div className="mvv-container">
            <div className="mvv-item">
              <span className="mvv-icon">🎯</span>
              <h3>Mission</h3>
              <p>
                To provide quality education that develops students intellectually, morally, 
                and socially, preparing them to become responsible citizens and leaders of tomorrow.
              </p>
            </div>
            <div className="mvv-item">
              <span className="mvv-icon">👁️</span>
              <h3>Vision</h3>
              <p>
                To be the leading secondary school in Uganda, known for academic excellence, 
                character development, and producing well-rounded individuals.
              </p>
            </div>
            <div className="mvv-item">
              <span className="mvv-icon">⭐</span>
              <h3>Values</h3>
              <p>
                Integrity, Excellence, Respect, Innovation, Community Service, and Lifelong Learning 
                form the core of everything we do.
              </p>
            </div>
          </div>
        </section>

        {/* Academic Excellence */}
        <section className="about-section">
          <h2>Academic Excellence</h2>
          <div className="about-grid">
            <div>
              <p>
                Our academic program is designed to challenge students while providing the support 
                they need to succeed. We offer a comprehensive curriculum that includes:
              </p>
              <ul style={{color: 'var(--text-dark)', lineHeight: '1.8'}}>
                <li>Sciences (Physics, Chemistry, Biology, Mathematics)</li>
                <li>Arts (Literature, History, Geography, Economics)</li>
                <li>Commercial Studies (Accounting, Commerce, Entrepreneurship)</li>
                <li>Technical Subjects (Computer Studies, Technical Drawing)</li>
                <li>Languages (English, French, Luganda)</li>
              </ul>
            </div>
            <div>
              <p>
                Our experienced faculty uses modern teaching methods and technology to ensure 
                students receive the best education possible. We maintain small class sizes 
                to provide personalized attention to each student.
              </p>
              <p>
                Regular assessments, parent-teacher conferences, and academic support programs 
                ensure that every student reaches their full potential.
              </p>
            </div>
          </div>
        </section>

        {/* Leadership */}
        <section className="about-section">
          <h2>Our Leadership</h2>
          <div className="leadership-grid">
            <div className="leader-card">
              <div className="leader-avatar">👨‍🎓</div>
              <h4>Mr. James Mukasa</h4>
              <div className="role">Head Teacher</div>
              <p>M.Ed. Educational Leadership, 20 years experience in education</p>
            </div>
            <div className="leader-card">
              <div className="leader-avatar">👩‍🏫</div>
              <h4>Ms. Sarah Nakato</h4>
              <div className="role">Deputy Head Teacher</div>
              <p>B.Ed. Mathematics, 15 years teaching experience</p>
            </div>
            <div className="leader-card">
              <div className="leader-avatar">👨‍💼</div>
              <h4>Mr. Peter Ssali</h4>
              <div className="role">Director of Studies</div>
              <p>M.A. Education Administration, Former MOE Official</p>
            </div>
            <div className="leader-card">
              <div className="leader-avatar">👩‍💼</div>
              <h4>Mrs. Grace Nambi</h4>
              <div className="role">Dean of Students</div>
              <p>B.Ed. Guidance & Counseling, Student welfare specialist</p>
            </div>
          </div>
        </section>

        {/* Facilities */}
        <section className="about-section">
          <h2>Our Facilities</h2>
          <p>
            EPSS boasts modern facilities designed to enhance the learning experience:
          </p>
          <div className="about-grid">
            <div>
              <ul style={{color: 'var(--text-dark)', lineHeight: '1.8'}}>
                <li>📚 Well-equipped library with over 5,000 books</li>
                <li>🔬 Modern science laboratories</li>
                <li>💻 Computer laboratory with internet access</li>
                <li>🏃‍♂️ Sports facilities and playground</li>
              </ul>
            </div>
            <div>
              <ul style={{color: 'var(--text-dark)', lineHeight: '1.8'}}>
                <li>🎭 Multi-purpose hall for events</li>
                <li>🍽️ Dining hall and kitchen facilities</li>
                <li>🏠 Boarding facilities for students</li>
                <li>🚌 School transport service</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Community Engagement */}
        <section className="about-section">
          <h2>Community Engagement</h2>
          <p>
            We believe in giving back to our community. Our students and staff regularly 
            participate in community service projects, environmental conservation efforts, 
            and outreach programs to support local initiatives.
          </p>
          <p>
            Through partnerships with local organizations, we provide opportunities for 
            students to gain real-world experience while making a positive impact on society.
          </p>
        </section>

      </div>
    </div>
  );
}

export default AboutUs;