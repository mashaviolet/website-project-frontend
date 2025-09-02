import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { 
  FaFlask,
  FaMicrophone, FaTheaterMasks, FaFlag, FaBook, FaLaptopCode, FaUsers,
  FaGraduationCap, FaLeaf, FaFutbol, FaBasketballBall, FaFootballBall, FaRunning,
  FaMosque, FaChurch, FaHandsHelping, FaHeart, FaPray, FaMountain,
  FaLandmark, FaUserTie, FaStar, FaUserFriends, FaBullhorn, FaBullseye
} from 'react-icons/fa';
import '../styles/public/Programs.css';

function Programs() {
  const [activeTab, setActiveTab] = useState('academics');
  const [pendingScroll, setPendingScroll] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { section } = useParams();

  // Map section IDs to tab keys
  const sectionToTab = {
    academics: 'academics',
    'co-curricular': 'co-curricular',
    sports: 'sports',
    spiritual: 'spiritual',
    leadership: 'leadership',
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
      const scrollToSection = () => {
        const el = document.getElementById(pendingScroll);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          setPendingScroll(null);
        } else {
          requestAnimationFrame(scrollToSection);
        }
      };
      scrollToSection();
    }
  }, [activeTab, pendingScroll]);

  const programsData = {
    academics: {
      title: 'Academic Programs',
      description: 'Excellence in education through comprehensive academic offerings',
      extraSections: [
        {
          title: 'Academic Excellence',
          type: 'grid',
          content: (
            <div className="about-grid">
              <div className="grid-column">
                <p>
                  Our academic program is designed to challenge students while providing 
                  the support they need to succeed. We offer a comprehensive curriculum 
                  that includes:
                </p>
                <ul style={{color: 'var(--text-dark)', lineHeight: '1.8'}}>
                  <li>Sciences (Physics, Chemistry, Biology, Mathematics)</li>
                  <li>Arts (Literature, History, Geography, Economics)</li>
                  <li>Commercial Studies (Accounting, Commerce, Entrepreneurship)</li>
                  <li>Technical Subjects (Computer Studies, Technical Drawing)</li>
                  <li>Languages (English, French, Luganda)</li>
                </ul>
              </div>
              <div className="grid-column">
                <p>
                  Our experienced faculty uses modern teaching methods and technology 
                  to ensure students receive the best education possible. We maintain 
                  small class sizes to provide personalized attention to each student.
                </p>
                <p>
                  Regular assessments, parent-teacher conferences, and academic support 
                  programs ensure that every student reaches their full potential.
                </p>
              </div>
            </div>
          )
        },
        {
          title: 'Community Engagement',
          type: 'plain',
          content: (
            <>
              <p>
                We believe in giving back to our community. Our students and staff regularly 
                participate in community service projects, environmental conservation efforts, 
                and outreach programs to support local initiatives.
              </p>
              <p>
                Through partnerships with local organizations, we provide opportunities for 
                students to gain real-world experience while making a positive impact on society.
              </p>
            </>
          )
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
          icon: <FaMicrophone />
        },
        {
          name: 'Science Club',
          description: 'Hands-on experiments and scientific exploration to foster innovation and discovery.',
          icon: <FaFlask />
        },
        {
          name: 'Drama Club',
          description: 'Creative expression through theatrical performances and storytelling.',
          icon: <FaTheaterMasks />
        },
        {
          name: 'Patriotism Club',
          description: 'Learn about patriotism, leadership, and the spirit of national pride.',
          icon: <FaFlag />
        },
        {
          name: 'Scripture Union',
          description: 'Encourages spiritual growth and moral values based on biblical teachings.',
          icon: <FaBook />
        },
        {
          name: 'iTech Club',
          description: 'Enhancing skills in software development, website creation, and technological innovation.',
          icon: <FaLaptopCode />
        },
        {
          name: 'Interact Club',
          description: 'Fosters leadership and community service through communication and teamwork.',
          icon: <FaUsers />
        },
        {
          name: 'Educate Club ',
          description: 'Develops entrepreneurial skills and encourages innovation among students.',
          icon: <FaGraduationCap />
        },
        {
          name: 'Go Green Club',
          description: 'Focuses on environmental protection and sustainable living.',
          icon: <FaLeaf />
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
          icon: <FaFutbol />
        },
        {
          name: 'Netball',
          description: 'Developing coordination and teamwork through competitive basketball.',
          icon: <FaBasketballBall />
        },
        {
          name: 'Rugby',
          description: 'Building agility and team coordination through rugby training.',
          icon: <FaFootballBall />
        },
        {
          name: 'Athletics',
          description: 'Track and field events including running, jumping, and throwing competitions.',
          icon: <FaRunning />
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
          icon: <FaMosque />
        },
        {
          name: 'Christian Services',
          description: 'Weekly Christian prayer services fostering spiritual reflection and community.',
          icon: <FaChurch />
        },
        {
          name: 'Community Service',
          description: 'Outreach programs serving the local community and those in need.',
          icon: <FaHandsHelping />
        },
        {
          name: 'Moral Education',
          description: 'Character building sessions focusing on ethics and values.',
          icon: <FaHeart />
        },
        {
          name: 'Prayer Fellowship',
          description: 'Student-led prayer groups and spiritual mentorship programs.',
          icon: <FaPray />
        },
        {
          name: 'Retreat Programs',
          description: 'Annual spiritual retreats for deeper reflection and growth.',
          icon: <FaMountain />
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
          icon: <FaLandmark />
        },
        {
          name: 'Prefect System',
          description: 'Responsible leadership roles maintaining school order and discipline.',
          icon: <FaUserTie />
        },
        {
          name: 'Youth Leadership Summit',
          description: 'Annual conference developing leadership skills and vision.',
          icon: <FaStar />
        },
        {
          name: 'Mentorship Programs',
          description: 'Peer-to-peer guidance and support systems for personal growth.',
          icon: <FaUserFriends />
        },
        {
          name: 'Public Speaking',
          description: 'Developing confidence and communication skills for future leaders.',
          icon: <FaBullhorn />
        },
        {
          name: 'Life Skills Workshop',
          description: 'Practical skills for personal development and career preparation.',
          icon: <FaBullseye />
        }
      ]
    }
  };

  const handleContactClick = () => {
    navigate('/contact-us');
  };

  return (
    <div className="programs-container">
      {/* Navigation Tabs */}
      <div className="programs-nav" id="programs-nav">
        <div className="nav-container">
          {Object.keys(programsData).map((tab) => (
            <button 
              key={tab}
              className={`nav-tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
              id={tab}
            >
              {programsData[tab].title}
            </button>
          ))}
        </div>
      </div>
      
      {/* Content Section */}
      <div className="programs-content">
        <div className="content-container">
          <div className="section-header" id={activeTab}>
            <h2>{programsData[activeTab].title}</h2>
            <p>{programsData[activeTab].description}</p>
          </div>
          
          {/* Only render programs grid if it exists */}
          {programsData[activeTab].programs && (
            <div className="programs-grid">
              {programsData[activeTab].programs.map((program, index) => (
                <div key={index} className="program-card">
                  <div className="program-icon">{program.icon}</div>
                  <h3>{program.name}</h3>
                  <p>{program.description}</p>
                </div>
              ))}
            </div>
          )}
          {programsData[activeTab].extraSections && (
            programsData[activeTab].extraSections.map((section, i) => (
              <section key={i} className="about-section">
                <h2>{section.title}</h2>
                {section.content}
              </section>
            ))
          )}
        </div>
      </div>
      {/* Call to Action */}
      <div className="programs-cta">
        <div className="cta-content">
          <h3>Ready to Get Involved?</h3>
          <p>Join us in creating a vibrant learning community where every student can thrive and discover their potential.</p>
          <button className="cta-button" onClick={handleContactClick}>Contact Us for More Information</button>
        </div>
      </div>
    </div>
  );
}

export default Programs;
