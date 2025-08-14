import React from 'react';
import '../styles/public/News.css';
import students8 from '../assets/students6.jpg';

function News() {
  const newsArticles = [
    {
      id: 1,
      title: "Annual Science Fair 2025",
      date: "March 15, 2025",
      category: "Academic",
      image: "/api/placeholder/400/250",
      summary: "Students showcase innovative projects in our biggest science fair yet, featuring over 200 exhibits from grades 6-12.",
      isNew: true
    },
    {
      id: 2,
      title: "New Library Wing Opens",
      date: "March 10, 2025",
      category: "Infrastructure",
      image: "/api/placeholder/400/250",
      summary: "State-of-the-art library facility with digital resources, study pods, and collaborative spaces now open to students.",
      isNew: true
    },
    {
      id: 3,
      title: "Inter-School Sports Championship",
      date: "March 8, 2025",
      category: "Sports",
      image: "/api/placeholder/400/250",
      summary: "Our athletics team brings home 5 gold medals from the regional championships, setting new school records.",
      isNew: false
    },
    {
      id: 4,
      title: "Parent-Teacher Conference",
      date: "March 5, 2025",
      category: "Community",
      image: "/api/placeholder/400/250",
      summary: "Successful parent-teacher meetings with 95% attendance, focusing on student progress and development.",
      isNew: false
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: "Spring Concert",
      date: "March 25, 2025",
      time: "7:00 PM",
      location: "School Auditorium",
      description: "Annual spring concert featuring school choir, band, and orchestra performances."
    },
    {
      id: 2,
      title: "Career Fair",
      date: "April 2, 2025",
      time: "10:00 AM - 2:00 PM",
      location: "Main Hall",
      description: "Meet professionals from various industries and explore career opportunities."
    },
    {
      id: 3,
      title: "Art Exhibition",
      date: "April 10, 2025",
      time: "9:00 AM - 5:00 PM",
      location: "Art Gallery",
      description: "Student artwork display featuring paintings, sculptures, and digital art."
    }
  ];

  return (
    <div className="news-events-container">
      {/* Header Section */}
      <div className="news-hero">
        <section 
          className="hero-section"
          style={{
            position: 'relative',
            backgroundImage: `url(${students8})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'scroll',
            minHeight: '100vh',
            display: 'flex',
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
            <h1>News & Events</h1>
            <p>Stay updated with the latest happenings at our school</p>
          </div>
        </section>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Latest News Section */}
        <section className="news-section">
          <h2>Latest News</h2>
          <div className="news-grid">
            {newsArticles.map((article) => (
              <div key={article.id} className="news-card">
                {article.isNew && <span className="new-badge">NEW</span>}
                <div className="news-image">
                  <img src={article.image} alt={article.title} />
                  <div className="category-badge">{article.category}</div>
                </div>
                <div className="news-content">
                  <h3>{article.title}</h3>
                  <p className="news-date">{article.date}</p>
                  <p className="news-summary">{article.summary}</p>
                  <button className="read-more-btn">Read More</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Upcoming Events Section */}
        <section className="events-section">
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
                    <span className="icon">🕐</span>
                    {event.time}
                  </p>
                  <p className="event-location">
                    <span className="icon">📍</span>
                    {event.location}
                  </p>
                  <p className="event-description">{event.description}</p>
                </div>
                <button className="event-btn">Learn More</button>
              </div>
            ))}
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="newsletter-section">
          <div className="newsletter-content">
            <h2>Stay Connected</h2>
            <p>Subscribe to our newsletter for the latest updates and announcements</p>
            <div className="newsletter-form">
              <input type="email" placeholder="Enter your email address" />
              <button type="submit">Subscribe</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default News;
