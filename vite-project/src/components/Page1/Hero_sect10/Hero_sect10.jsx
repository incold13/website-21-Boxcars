import React from "react";
import "./Hero_sect10.scss";
import { Photo } from "../../../photo.js";

export default function Hero_sect10() {
  return (
    <section className="sect10">
      <div className="sect10_all">
        <div className="sect10_img_box">
          <img
            className="sect10_img"
            src={Photo.p1_s10_h74}
            alt="Have More Questions"
          />
        </div>

        <div className="sect10_content">
          <h2 className="sect10_title">
            Have More Questions? Don't Hesitate To Reach Us
          </h2>

          <p className="sect10_address">
            123 Queensberry Street, North<br />
            Melbourne VIC3051, Australia.
          </p>

          <div className="sect10_contacts">
            <a href="tel:+76956039999" className="sect10_pill">
              <img
                className="sect10_pill_icon"
                src={Photo.p1_s10_phone}
                alt="Phone"
              />
              <span className="sect10_pill_text">+76 956 039 999</span>
            </a>

            <a href="mailto:ali@boxcars.com" className="sect10_pill">
              <img
                className="sect10_pill_icon"
                src={Photo.p1_s10_mail}
                alt="Email"
              />
              <span className="sect10_pill_text">ali@boxcars.com</span>
            </a>
          </div>

          <button className="sect10_btn">
            <span className="sect10_btn_text">Get Started</span>
            <img
              className="sect10_btn_arrow"
              src={Photo.p1_s5_arrow_diag_white}
              alt="Arrow"
            />
          </button>
        </div>
      </div>
    </section>
  );
}
