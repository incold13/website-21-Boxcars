import "./Header.scss";
import { Photo } from "../../photo.js";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  const isDark =
    location.pathname.startsWith("/list") ||
    location.pathname === "/page2" ||
    location.pathname.startsWith("/car") ||
    location.pathname.startsWith("/detail") ||
    location.pathname.startsWith("/page3") ||
    location.pathname.startsWith("/blog") ||
    location.pathname.startsWith("/page4");

  return (
    <header className={`header ${isDark ? "header_dark" : ""}`}>
      <div className="header_all">
        <div className="header_left">
          <Link to="/" className="header_logo_link">
            <img
              className="header_logo"
              src={isDark ? Photo.header_logo_white : Photo.h_logo}
              alt="Boxcars"
            />
          </Link>
          <nav className="header_nav">
            <div className="header_item">
              <Link to="/" className="header_link">Home</Link>
              <img
                className="header_arrow"
                src={isDark ? Photo.header_arrow_white : Photo.h_arrow}
                alt=""
              />
            </div>
            <div className="header_item">
              <Link to="/list" className="header_link">Listings</Link>
              <img
                className="header_arrow"
                src={isDark ? Photo.header_arrow_white : Photo.h_arrow}
                alt=""
              />
            </div>
            <div className="header_item">
              <Link to="/blog" className="header_link">Blog</Link>
              <img
                className="header_arrow"
                src={isDark ? Photo.header_arrow_white : Photo.h_arrow}
                alt=""
              />
            </div>
            <div className="header_item">
              <span className="header_link">Pages</span>
              <img
                className="header_arrow"
                src={isDark ? Photo.header_arrow_white : Photo.h_arrow}
                alt=""
              />
            </div>
            <div className="header_item">
              <Link to="/about" className="header_link">About</Link>
            </div>
            <div className="header_item">
              <Link to="/contact" className="header_link">Contact</Link>
            </div>
            {!isDark && (
              <div className="header_phone_box">
                <img className="header_phone_icon" src={Photo.h_phone} alt="" />
                <a className="header_phone" href="tel:+75123456789">+75 123 456 789</a>
              </div>
            )}
          </nav>
        </div>
        <div className="header_right">
          <div className="header_signin">
            <img
              className="header_signin_icon"
              src={isDark ? Photo.user_icon_white : Photo.h_user}
              alt="Sign in"
            />
            <span className="header_signin_text">Sign in</span>
          </div>
          <button className="header_submit_btn">
            <span className="header_submit_text">Submit Listing</span>
          </button>
        </div>
      </div>
    </header>
  );
}
