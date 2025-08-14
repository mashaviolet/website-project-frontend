import React from 'react';
import '../styles/public/Home.css';
import students from '../assets/students.jpg';
import { FaGraduationCap, FaTrophy, FaStar, FaLightbulb, FaHandshake, FaBullseye } from "react-icons/fa";


function Home() {
  return (
    <div className="homepage">
      {/* Hero Section */}
      <section
  className="hero-section"
  style={{
    backgroundImage: `url(${students})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '100%',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }}
>
  {/* Dark card just behind content */}
  <div
    style={{
      backgroundColor: 'white(100,0.8',
      padding: 0,
      borderRadius: '0px',
      height:'100%',
      textAlign: 'center',
      width: '100%'
    }}
  >
    <div className="hero-content">
      <div className="welcome-sec">Welcome To</div>
      <h1>Entebbe Parents Secondary School</h1>
      <div className="school-motto" key="motto">
        <div className="motto-text">
          ★ EDUCATION FOR LIFE ★ ENTEBBE PARENTS SECONDARY SCHOOL ★ EDUCATION FOR LIFE ★
        </div>
      </div>
      <a href="#features" className="cta-button">Discover Our Excellence</a>
    </div>
  </div>
</section>

      {/* Features Section */}
      <section className="features-section" id="features">
        <h2 className="section-title">Why Choose EPSS?</h2>
        <p className="section-subtitle">
          We provide comprehensive education that prepares students for success in academics, character, and life.
        </p>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon"><FaGraduationCap /></div>
            <h3>Academic Excellence</h3>
            <p>
              Our rigorous curriculum and experienced teachers ensure students
              achieve their highest potential in all subjects.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon"><FaTrophy /></div>
            <h3>Character Development</h3>
            <p>
              We foster integrity, leadership, and moral values that shape students
              into responsible global citizens.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon"><FaStar /></div>
            <h3>Holistic Growth</h3>
            <p>
              Beyond academics, we nurture talents in sports, arts, and
              extracurricular activities for well-rounded development.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon"><FaLightbulb /></div>
            <h3>Modern Facilities</h3>
            <p>
              State-of-the-art classrooms, laboratories, and resources provide an
              optimal learning environment.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon"><FaHandshake /></div>
            <h3>Community Support</h3>
            <p>
              Strong partnerships with parents and the community create a
              supportive network for student success.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon"><FaBullseye /></div>
            <h3>Future Ready</h3>
            <p>
              We prepare students for higher education and careers with practical
              skills and critical thinking abilities.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;