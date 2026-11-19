import React from "react";
import "./detail_sect2.scss";
import { Photo } from "../../../photo.js";

export default function Detail_sect2({ car }) {
  const address = car?.dealer?.address
    ? `${car.dealer.address}, New York, United States`
    : "943 Broadway, Brooklyn, New York, United States";

  return (
    <div className="detail_sect2">
      <div className="detail_sect2_divider" />
      <div className="detail_sect2_header">
        <h2 className="detail_sect2_title">Location</h2>
      </div>
      <div className="detail_sect2_bar">
        <div className="detail_sect2_address">
          <img src={Photo.detail_pin_icon} alt="" className="detail_sect2_pin" />
          <span>{address}</span>
        </div>
        <a
          href="https://maps.google.com"
          target="_blank"
          rel="noreferrer"
          className="detail_sect2_dir_link"
        >
          Get Direction
        </a>
      </div>
      <div className="detail_sect2_map_box">
        <iframe
          title="Vehicle Location"
          className="detail_sect2_iframe"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.2818619622955!2d-73.93655182397444!3d40.69524097139702!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25c04e2d31989%3A0xc3cfcebfb5971485!2s943%20Broadway%2C%20Brooklyn%2C%20NY%2011206!5e0!3m2!1sen!2sus!4v1711200000000!5m2!1sen!2sus"
          loading="lazy"
        />
      </div>
    </div>
  );
}
