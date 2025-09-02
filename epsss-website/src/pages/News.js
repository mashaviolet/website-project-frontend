import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { FaClock, FaMapMarkerAlt } from 'react-icons/fa';
import '../styles/public/News.css';

function News() {
  const [expandedNews, setExpandedNews] = useState({});
  const [expandedEvent, setExpandedEvent] = useState({});
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState('');

  // Hide thank you message after 3 seconds
  useEffect(() => {
    if (newsletterStatus === 'Thank you for subscribing!') {
      const timer = setTimeout(() => setNewsletterStatus(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [newsletterStatus]);
  const location = useLocation();
  const { section } = useParams();

  useEffect(() => {
    let target = null;
    if (section) {
      target = section;
    } else if (location.hash) {
      target = location.hash.replace('#', '');
    }
    if (target) {
      const el = document.getElementById(target);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [location, section]);
  const newsArticles = [
    {
      id: 1,
      title: "End of Term Exams",
      date: "July 15, 2025",
      category: "Academic",
      // image: "/api/placeholder/400/250",
      summary: "Students start their end of second term exams,only those who have fully paid off school fees are eligible.",
      isNew: true
    },
    {
      id: 2,
      title: "Closure of Second Term",
      date: "August 10, 2025",
      category: "Academics",
      // image: "/api/placeholder/400/250",
      summary: "The school successfully closes off the second term by God's grace.",
      isNew: true
    },
    {
      id: 3,
      title: "Entebbe Parents Sports Gala",
      date: "August 15, 2025",
      category: "Sports",
      // image: "/api/placeholder/400/250",
      summary: "Our OB's and OG's organise a sports event and the year of 2015 to 2023 wins.",
      isNew: true
    },
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: "Leaver's Party",
      date: "August 25, 2025",
      time: "9:00 AM - 9:00 PM",
      location: "School Main Hall",
      description: "The S.4 and S.6 students will be celebrated."
    },
    {
      id: 2,
      title: "Career Fair",
      date: "August 2, 2025",
      time: "10:00 AM - 2:00 PM",
      location: "Main Hall",
      description: "Meet professionals from various industries and explore career opportunities."
    },
    {
      id: 3,
      title: "Art Exhibition",
      date: "August 14, 2025",
      time: "9:00 AM - 5:00 PM",
      location: "Art Gallery",
      description: "Student artwork display featuring paintings, sculptures, and digital art."
    }
  ];

  return (
    <div className="news-events-container">
      {/* Main Content */}
      <div className="main-content">
        {/* Latest News Section */}
  <section className="news-section" id="latest-news">
          <h2>Latest News</h2>
          <div className="news-grid">
            {newsArticles.map((article) => (
              <div key={article.id} className="news-card">
                {article.isNew && <span className="new-badge">NEW</span>}
                {/* <div className="news-image">
                  <img src={article.image} alt={article.title} />
                  <div className="category-badge">{article.category}</div>
                </div> */}
                <div className="news-content">
                  <h3>{article.title}</h3>
                  <p className="news-date">{article.date}</p>
                  <p className="news-summary">{article.summary}</p>
                  {expandedNews[article.id] && (
                    <div className="news-details">
                      <p>Follow us on our social media handles for more information.</p>
                    </div>
                  )}
                  <button
                    className="read-more-btn"
                    onClick={() => setExpandedNews(prev => ({ ...prev, [article.id]: !prev[article.id] }))}
                  >
                    {expandedNews[article.id] ? 'Show Less' : 'Read More'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Upcoming Events Section */}
  <section className="events-section" id="upcoming-events">
          <h2>Upcoming Events</h2>
          <div className="events-list">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="event-card">
                <div className="event-date">
                  <span className="date-day">{event.date.split(' ')[1].replace(',', '')}</span>
                  <span className="date-month">{event.date.split(' ')[0]}</span>
                </div>
                <div className="event-details">
                  <h3>{event.title}</h3>
                  <p className="event-time">
                    <FaClock className="icon" />
                    {event.time}
                  </p>
                  <p className="event-location">
                    <FaMapMarkerAlt className="icon" />
                    {event.location}
                  </p>
                  <p className="event-description">{event.description}</p>
                  {expandedEvent[event.id] && (
                    <div className="event-more-details">
                      <p>Follow us on our social media handles for more information.</p>
                    </div>
                  )}
                </div>
                <button
                  className="event-btn"
                  onClick={() => setExpandedEvent(prev => ({ ...prev, [event.id]: !prev[event.id] }))}
                >
                  {expandedEvent[event.id] ? 'Show Less' : 'Learn More'}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Newsletter Signup */}
  <section className="newsletter-section" id="newsletter-signup">
          <div className="newsletter-content">
            <h2>Stay Connected</h2>
            <p>Subscribe to our newsletter for the latest updates and announcements</p>
            <form className="newsletter-form" onSubmit={e => {
              e.preventDefault();
              // Basic email validation
              if (!newsletterEmail.match(/^\S+@\S+\.\S+$/)) {
                setNewsletterStatus('Please enter a valid email address.');
                return;
              }
              // Simulate API call
              setNewsletterStatus('Subscribing...');
              setTimeout(() => {
                setNewsletterStatus('Thank you for subscribing!');
                setNewsletterEmail('');
              }, 1200);
            }}>
              <input
                type="email"
                placeholder="Enter your email address"
                value={newsletterEmail}
                onChange={e => {
                  setNewsletterEmail(e.target.value);
                  setNewsletterStatus('');
                }}
                required
              />
              <button type="submit">Subscribe</button>
            </form>
            {newsletterStatus && (
              <div className="newsletter-status">{newsletterStatus}</div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default News;