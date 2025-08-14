import React, { useState } from 'react';
import '../styles/public/Programs.css';
import students1 from '../assets/co-curricular7.jpg';

function Programs() {
  const [activeTab, setActiveTab] = useState('academics');

  const programsData = {
    'academics': {
      title: 'Academic Programs',
      description: 'Excellence in education through comprehensive academic offerings',
      programs: [
        {
          name: 'Science Stream',
          description: 'Advanced studies in Physics, Chemistry, Biology, and Mathematics for future scientists and engineers.',
          icon: '🔬'
        },
        {
          name: 'Arts Stream',
          description: 'Literature, History, Geography, and Fine Art for creative and analytical minds.',
          icon: '🎨'
        },
        {
          name: 'Commercial Stream',
          description: 'Entrepreneurship, Commerce, Economics, and for future business leaders.',
          icon: '💼'
        },
        {
          name: 'Computer Studies',
          description: 'Computer skills for the modern world.',
          icon: '💻'
        },
        {
          name: 'Language Programs',
          description: 'English, Kiswahili, and Luganda to enhance communication skills.',
          icon: '🗣️'
        },
        {
          name: 'Mathematics',
          description: 'Pure and Applied Mathematics building strong analytical and problem-solving skills.',
          icon: '📐'
        }
      ]
    },
    'co-curricular': {
      title: 'Co-Curricular Activities',
      description: 'Enriching educational experiences beyond the classroom',
      programs: [
        {
          name: 'Debate Club',
          description: 'Developing critical thinking and public speaking skills through structured debates and competitions.',
          icon: '🎤'
        },
        {
          name: 'Science Club',
          description: 'Hands-on experiments and scientific exploration to foster innovation and discovery.',
          icon: '🔬'
        },
        {
          name: 'Drama Club',
          description: 'Creative expression through theatrical performances and storytelling.',
          icon: '🎭'
        },
        {
          name: 'Patriotism Club',
          description: 'Learn about patriotism, leadership, and the spirit of national pride.',
          icon: '🌱'
        },
        {
          name: 'Scripture Union',
          description: 'Encourages spiritual growth and moral values based on biblical teachings.',
          icon: '📰'
        },
        {
          name: 'iTech Club',
          description: 'Enhancing skills in software development, website creation, and technological innovation.',
          icon: '🎵'
        },
        {
          name: 'Interact Club',
          description: 'Fosters leadership and community service through communication and teamwork.',
          icon: '🎵'
        },
        {
          name: 'Educate Club ',
          description: 'Develops entrepreneurial skills and encourages innovation among students.',
          icon: '🎵'
        },
        {
          name: 'Go Green Club',
          description: 'Focuses on environmental protection and sustainable living.',
          icon: '🎵'
        }
      ]
    },
    'sports': {
      title: 'Sports',
      description: 'Building character, teamwork, and physical fitness through sports',
      programs: [
        {
          name: 'Football',
          description: 'Inter-school competitions and training for both boys and girls teams.',
          icon: '⚽'
        },
        {
          name: 'Netball',
          description: 'Developing coordination and teamwork through competitive basketball.',
          icon: '🏀'
        },
        {
          name: 'Rugby',
          description: 'Building agility and team coordination through rugby training.',
          icon: '🏐'
        },
        {
          name: 'Athletics',
          description: 'Track and field events including running, jumping, and throwing competitions.',
          icon: '🏃'
        },
      ]
    },
    'spiritual': {
      title: 'Spiritual Development',
      description: 'Nurturing moral values and spiritual growth',
      programs: [
        {
          name: 'Moslem Services',
          description: 'Weekly Moslem prayer services fostering spiritual reflection and community.',
          icon: '⛪'
        },
        {
          name: 'Christian Services',
          description: 'Weekly Christian prayer services fostering spiritual reflection and community.',
          icon: '⛪'
        },
        {
          name: 'Community Service',
          description: 'Outreach programs serving the local community and those in need.',
          icon: '🤝'
        },
        {
          name: 'Moral Education',
          description: 'Character building sessions focusing on ethics and values.',
          icon: '💝'
        },
        {
          name: 'Prayer Fellowship',
          description: 'Student-led prayer groups and spiritual mentorship programs.',
          icon: '🙏'
        },
        {
          name: 'Retreat Programs',
          description: 'Annual spiritual retreats for deeper reflection and growth.',
          icon: '🏔️'
        }
      ]
    },
    'leadership': {
      title: 'Leadership',
      description: 'Preparing tomorrow\'s leaders through practical experience',
      programs: [
        {
          name: 'Student Government',
          description: 'Democratic leadership experience through student council participation.',
          icon: '🏛️'
        },
        {
          name: 'Prefect System',
          description: 'Responsible leadership roles maintaining school order and discipline.',
          icon: '👨‍💼'
        },
        {
          name: 'Youth Leadership Summit',
          description: 'Annual conference developing leadership skills and vision.',
          icon: '🌟'
        },
        {
          name: 'Mentorship Programs',
          description: 'Peer-to-peer guidance and support systems for personal growth.',
          icon: '👥'
        },
        {
          name: 'Public Speaking',
          description: 'Developing confidence and communication skills for future leaders.',
          icon: '📢'
        },
        {
          name: 'Life Skills Workshop',
          description: 'Practical skills for personal development and career preparation.',
          icon: '🎯'
        }
      ]
    }
  };

  return (
    <div className="programs-container">
      {/* Hero Section */}
      <div className="programs-hero">
        <section 
          className="hero-section"
          style={{
            position: 'relative',
            backgroundImage: `url(${students1})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'scroll',
            minHeight: '100vh',
            display: 'block',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center'
          }}
        > 
          {/* Dark overlay */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: '100%',
              width: '100%',
              backgroundColor: 'white(100,0.8',
              zIndex: 1,
            }}
          ></div>

          {/* Content */}
          <div 
            className="hero-content"
            style={{
              position: 'relative',
              zIndex: 2,
              color: 'white',
              padding: '2rem',
            }}
          >
            <h1>Our School Programs</h1>
            <p>Comprehensive programs designed to develop well-rounded students at Entebbe Parents Secondary School</p>
          </div>
        </section>
      </div>

      {/* Navigation Tabs */}
      <div className="programs-nav">
        <div className="nav-container">
          <button 
            className={`nav-tab ${activeTab === 'academics' ? 'active' : ''}`}
            onClick={() => setActiveTab('academics')}
          >
            Academics
          </button>
          <button 
            className={`nav-tab ${activeTab === 'co-curricular' ? 'active' : ''}`}
            onClick={() => setActiveTab('co-curricular')}
          >
            Co-Curricular
          </button>
          <button 
            className={`nav-tab ${activeTab === 'sports' ? 'active' : ''}`}
            onClick={() => setActiveTab('sports')}
          >
            Sports
          </button>
          <button 
            className={`nav-tab ${activeTab === 'spiritual' ? 'active' : ''}`}
            onClick={() => setActiveTab('spiritual')}
          >
            Spiritual
          </button>
          <button 
            className={`nav-tab ${activeTab === 'leadership' ? 'active' : ''}`}
            onClick={() => setActiveTab('leadership')}
          >
            Leadership & Development
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="programs-content">
        <div className="content-container">
          <div className="section-header">
            <h2>{programsData[activeTab].title}</h2>
            <p>{programsData[activeTab].description}</p>
          </div>

          <div className="programs-grid">
            {programsData[activeTab].programs.map((program, index) => (
              <div key={index} className="program-card">
                <div className="program-icon">{program.icon}</div>
                <h3>{program.name}</h3>
                <p>{program.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="programs-cta">
        <div className="cta-content">
          <h3>Ready to Get Involved?</h3>
          <p>Join us in creating a vibrant learning community where every student can thrive and discover their potential.</p>
          <button className="cta-button">Contact Us for More Information</button>
        </div>
      </div>
    </div>
  );
}

export default Programs;