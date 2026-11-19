import { useState } from "react";
import "./Hero_sect7.scss";
import { Photo } from "../../../photo.js";

const reviewsData = [
  {
    id: 1,
    name: "Ali TUFAN",
    role: "Designer",
    avatar: Photo.p1_s7_team5_150x150,
    quote: "I'd suggest Macklin Motors Nissan Glasgow South to a friend because I had great service from my salesman Patrick and all of the team.",
  },
  {
    id: 2,
    name: "Robert Fox",
    role: "Marketing Manager",
    avatar: Photo.p1_s7_team6_150x150,
    quote: "Fantastic experience purchasing my vehicle with Boxcars! The staff was incredibly knowledgeable, attentive, and made the whole transaction quick and transparent.",
  },
  {
    id: 3,
    name: "Albert Flores",
    role: "Software Engineer",
    avatar: Photo.p1_s7_team8_150x150,
    quote: "Top-notch customer support and exceptional vehicle quality. Everything described online was exact, and the delivery was ahead of schedule. Truly five-star service!",
  },
];

export default function Hero_sect7() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + reviewsData.length) % reviewsData.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % reviewsData.length);
  };

  const currentReview = reviewsData[currentIndex];

  return (
    <section className="sect7">
      <div className="sect7_all">
        <div className="sect7_top">
          <h2 className="sect7_title">What Our Customers Say</h2>
          <div className="sect7_nav">
            <button
              className="sect7_nav_btn"
              onClick={handlePrev}
              aria-label="Previous Review"
            >
              <img
                className="sect7_nav_arrow"
                src={Photo.p1_s4_arrow_left}
                alt="Previous"
              />
            </button>
            <button
              className="sect7_nav_btn"
              onClick={handleNext}
              aria-label="Next Review"
            >
              <img
                className="sect7_nav_arrow"
                src={Photo.p1_s4_arrow_right}
                alt="Next"
              />
            </button>
          </div>
        </div>

        <div className="sect7_content">
          <div className="sect7_trust_col">
            <p className="sect7_trust_rating">Great</p>
            <img
              className="sect7_trust_stars"
              src={Photo.p1_s7_stars}
              alt="5 stars"
            />
            <p className="sect7_trust_count">Based on 5,801 reviews</p>
            <img
              className="sect7_trust_logo"
              src={Photo.p1_s7_trustpilot}
              alt="Trustpilot"
            />
          </div>

          <div className="sect7_review_col">
            <div className="sect7_review_header">
              <div className="sect7_rating_verified">
                <img
                  className="sect7_mini_stars"
                  src={Photo.p1_s7_stars}
                  alt="5 stars"
                />
                <div className="sect7_verified">
                  <img
                    className="sect7_verified_icon"
                    src={Photo.p1_s7_verified}
                    alt="Verified"
                  />
                  <span className="sect7_verified_text">Verified</span>
                </div>
              </div>

              <div className="sect7_author">
                <h3 className="sect7_author_name">{currentReview.name}</h3>
                <p className="sect7_author_role">{currentReview.role}</p>
              </div>
            </div>

            <p className="sect7_quote">{currentReview.quote}</p>

            <div className="sect7_avatars">
              {reviewsData.map((item, idx) => (
                <button
                  key={item.id}
                  className={`sect7_avatar_btn ${currentIndex === idx ? "active" : ""}`}
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={item.name}
                >
                  <img
                    className="sect7_avatar_img"
                    src={item.avatar}
                    alt={item.name}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
