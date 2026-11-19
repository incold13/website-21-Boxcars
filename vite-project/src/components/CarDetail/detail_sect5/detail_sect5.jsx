import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./detail_sect5.scss";
import { Photo } from "../../../photo.js";
import { carsDatabase } from "../../../data/cars.js";

export default function Detail_sect5({ currentCarId }) {
  const [startIndex, setStartIndex] = useState(0);

  const relatedList = carsDatabase.filter((c) => c.id !== currentCarId);
  const visibleItems = relatedList.slice(startIndex, startIndex + 4);

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setStartIndex((prev) =>
      prev + 4 < relatedList.length ? prev + 1 : prev
    );
  };

  return (
    <div className="detail_sect5">
      <div className="detail_sect5_divider" />
      <div className="detail_sect5_header">
        <div className="detail_sect5_title_box">
          <h2 className="detail_sect5_title">Related Listings</h2>
          <p className="detail_sect5_sub">Explore other available models and offers</p>
        </div>
        <div className="detail_sect5_arrows">
          <button
            type="button"
            className="detail_sect5_arrow_btn"
            onClick={handlePrev}
          >
            <img src={Photo.p1_s4_arrow_left} alt="" className="detail_sect5_arrow_img" />
          </button>
          <button
            type="button"
            className="detail_sect5_arrow_btn"
            onClick={handleNext}
          >
            <img src={Photo.p1_s4_arrow_right} alt="" className="detail_sect5_arrow_img" />
          </button>
        </div>
      </div>

      <div className="detail_sect5_grid">
        {visibleItems.map((item) => (
          <div key={item.id} className="detail_sect5_card">
            <div className="detail_sect5_img_wrap">
              <img src={item.image} alt={item.name} className="detail_sect5_card_img" />
              {item.badge && (
                <div className={`detail_sect5_badge detail_sect5_badge_${item.badge.type}`}>
                  {item.badge.text}
                </div>
              )}
              <button type="button" className="detail_sect5_card_save">
                <img src={Photo.p1_s4_bookmark} alt="" className="detail_sect5_save_ico" />
              </button>
            </div>

            <div className="detail_sect5_card_body">
              <h3 className="detail_sect5_card_title">{item.name}</h3>
              <p className="detail_sect5_card_sub">{item.subtitle}</p>

              <div className="detail_sect5_specs">
                <div className="detail_sect5_spec">
                  <img src={Photo.p1_s4_speedometer} alt="" className="detail_sect5_spec_ico" />
                  <span>{item.quickSpecs.miles}</span>
                </div>
                <div className="detail_sect5_spec">
                  <img src={Photo.p1_s4_fuel} alt="" className="detail_sect5_spec_ico" />
                  <span>{item.quickSpecs.fuel}</span>
                </div>
                <div className="detail_sect5_spec">
                  <img src={Photo.p1_s4_transmission} alt="" className="detail_sect5_spec_ico" />
                  <span>{item.quickSpecs.transmission}</span>
                </div>
              </div>

              <div className="detail_sect5_bottom">
                <div className="detail_sect5_prices">
                  {item.oldPrice && (
                    <span className="detail_sect5_old_price">{item.formattedOldPrice}</span>
                  )}
                  <span className="detail_sect5_price">{item.formattedPrice}</span>
                </div>
                <Link
                  to={`/car/${item.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="detail_sect5_link"
                >
                  <span>View Details</span>
                  <img src={Photo.p1_s4_arrow_diag} alt="" className="detail_sect5_diag" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
