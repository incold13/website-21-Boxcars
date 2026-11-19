import React from "react";
import { useLocation } from "react-router-dom";
import "./Footer.scss";
import { Photo } from "../../photo.js";

const companyLinks = [
  "About Us",
  "Blog",
  "Services",
  "FAQs",
  "Terms",
  "Contact Us",
];

const quickLinks = [
  "Get in Touch",
  "Help center",
  "Live chat",
  "How it works",
];

const brandLinks = [
  "Toyota",
  "Porsche",
  "Audi",
  "BMW",
  "Ford",
  "Nissan",
  "Peugeot",
  "Volkswagen",
];

const vehicleTypes = [
  "Sedan",
  "Hatchback",
  "SUV",
  "Hybrid",
  "Electric",
  "Coupe",
  "Truck",
  "Convertible",
];

export default function Footer() {
  const location = useLocation();
  const isDark =
    location.pathname.startsWith("/list") ||
    location.pathname === "/page2" ||
    location.pathname.startsWith("/car") ||
    location.pathname.startsWith("/detail") ||
    location.pathname.startsWith("/page3") ||
    location.pathname.startsWith("/blog") ||
    location.pathname.startsWith("/page4");

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className={`footer ${isDark ? "footer_dark" : ""}`}>
      <div className="footer_all">
        <div className="footer_top">
          <div className="footer_col">
            <h3 className="footer_col_title">Company</h3>
            <div className="footer_list">
              {companyLinks.map((link) => (
                <a key={link} href="#" className="footer_link">
                  {link}
                </a>
              ))}
            </div>
          </div>

          <div className="footer_col">
            <h3 className="footer_col_title">Quick Links</h3>
            <div className="footer_list">
              {quickLinks.map((link) => (
                <a key={link} href="#" className="footer_link">
                  {link}
                </a>
              ))}
            </div>
          </div>

          <div className="footer_col">
            <h3 className="footer_col_title">Our Brands</h3>
            <div className="footer_list">
              {brandLinks.map((link) => (
                <a key={link} href="#" className="footer_link">
                  {link}
                </a>
              ))}
            </div>
          </div>

          <div className="footer_col">
            <h3 className="footer_col_title">Vehicles Type</h3>
            <div className="footer_list">
              {vehicleTypes.map((link) => (
                <a key={link} href="#" className="footer_link">
                  {link}
                </a>
              ))}
            </div>
          </div>

          <div className="footer_col footer_col_info">
            {isDark ? (
              <div className="footer_info_block">
                <h3 className="footer_col_title">Our Mobile App</h3>
                <div className="footer_app_buttons">
                  <a href="#" className="footer_app_btn">
                    <img
                      className="footer_app_icon"
                      src={Photo.footer_apple_icon}
                      alt="Apple"
                    />
                    <div className="footer_app_btn_text">
                      <span className="footer_app_sub">Download on the</span>
                      <span className="footer_app_name">Apple Store</span>
                    </div>
                  </a>

                  <a href="#" className="footer_app_btn">
                    <img
                      className="footer_app_icon"
                      src={Photo.footer_google_play_icon}
                      alt="Google Play"
                    />
                    <div className="footer_app_btn_text">
                      <span className="footer_app_sub">Get it on</span>
                      <span className="footer_app_name">Google Play</span>
                    </div>
                  </a>
                </div>
              </div>
            ) : (
              <div className="footer_info_block">
                <h3 className="footer_col_title">Sale Hours</h3>
                <div className="footer_hours_list">
                  <p className="footer_hour_text">Monday – Friday: 09:00AM – 09:00 PM</p>
                  <p className="footer_hour_text">Saturday: 09:00AM – 07:00PM</p>
                  <p className="footer_hour_text">Sunday: Closed</p>
                </div>
              </div>
            )}

            <div className="footer_info_block">
              <h3 className="footer_col_title">Connect With Us</h3>
              <div className="footer_socials">
                <a href="#" className="footer_social_link" aria-label="Facebook">
                  <img
                    className="footer_social_icon"
                    src={isDark ? Photo.footer_facebook_white : Photo.footer_facebook}
                    alt="Facebook"
                  />
                </a>
                <a href="#" className="footer_social_link" aria-label="Twitter">
                  <img
                    className="footer_social_icon"
                    src={isDark ? Photo.footer_twitter_white : Photo.footer_twitter}
                    alt="Twitter"
                  />
                </a>
                <a href="#" className="footer_social_link" aria-label="Instagram">
                  <img
                    className="footer_social_icon"
                    src={isDark ? Photo.footer_instagram_white : Photo.footer_instagram}
                    alt="Instagram"
                  />
                </a>
                <a href="#" className="footer_social_link" aria-label="LinkedIn">
                  <img
                    className="footer_social_icon"
                    src={isDark ? Photo.footer_linkedin_white : Photo.footer_linkedin}
                    alt="LinkedIn"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="footer_divider" />

        <div className="footer_bottom">
          <p className="footer_copyright">
            © 2024 Boxcars.com. All rights reserved.
          </p>
          <div className="footer_legal">
            <a href="#" className="footer_legal_link">
              Terms & Conditions
            </a>
            <span className="footer_legal_dot">•</span>
            <a href="#" className="footer_legal_link">
              Privacy Notice
            </a>
          </div>
          {isDark && (
            <button
              className="footer_scroll_top_btn"
              onClick={handleScrollTop}
              aria-label="Scroll to top"
            >
              <img
                className="footer_scroll_top_icon"
                src={Photo.footer_scroll_top}
                alt=""
              />
            </button>
          )}
        </div>
      </div>
    </footer>
  );
}