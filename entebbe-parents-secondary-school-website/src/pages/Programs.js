import React, { useState } from 'react';
import '../styles/Programs.css';

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
          description: 'Literature, History, Geography, and Fine Arts for creative and analytical minds.',
          icon: '🎨'
        },
        {
          name: 'Commercial Stream',
          description: 'Business Studies, Accounting, Economics, and Entrepreneurship for future business leaders.',
          icon: '💼'
        },
        {
          name: 'Computer Studies',
          description: 'Information Technology, Programming, and Digital Literacy for the modern world.',
          icon: '💻'
        },
        {
          name: 'Language Programs',
          description: 'English, French, and local languages to enhance communication skills.',
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
          name: 'Drama Society',
          description: 'Creative expression through theatrical performances and storytelling.',
          icon: '🎭'
        },
        {
          name: 'Environmental Club',
          description: 'Promoting environmental awareness and sustainability practices.',
          icon: '🌱'
        },
        {
          name: 'Journalism Club',
          description: 'Developing writing skills and producing the school newsletter.',
          icon: '📰'
        },
        {
          name: 'Music Band',
          description: 'Musical talent development through instruments and vocal training.',
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
          description: 'Building agility and team coordination through volleyball training.',
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
          name: 'Church Services',
          description: 'Weekly worship services fostering spiritual reflection and community.',
          icon: '⛪'
        },
        {
          name: 'Bible Study Groups',
          description: 'Small group discussions exploring faith and biblical teachings.',
          icon: '📖'
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
          name: 'Mentorship Program',
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
        <div className="hero-content">
          <h1>Our School Programs</h1>
          <p>Comprehensive programs designed to develop well-rounded students at Entebbe Parents Secondary School</p>
        </div>
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