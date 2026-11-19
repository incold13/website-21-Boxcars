import React from "react";
import "./Hero_sect9.scss";
import { Photo } from "../../../photo.js";

const brands = [
  {
    id: 1,
    name: "Audi",
    logo: Photo.p1_s9_b1,
  },
  {
    id: 2,
    name: "BMW",
    logo: Photo.p1_s9_b2,
  },
  {
    id: 3,
    name: "Ford",
    logo: Photo.p1_s9_b3,
  },
  {
    id: 4,
    name: "Mercedes Benz",
    logo: Photo.p1_s9_b4,
  },
  {
    id: 5,
    name: "Peugeot",
    logo: Photo.p1_s9_b5,
  },
  {
    id: 6,
    name: "Volkswagen",
    logo: Photo.p1_s9_b6,
  },
];

export default function Hero_sect9() {
  return (
    <section className="sect9">
      <div className="sect9_all">
        <div className="sect9_header">
          <h2 className="sect9_title">Explore Our Premium Brands</h2>
          <button className="sect9_show_all_btn">
            <span className="sect9_show_all_text">Show All Brands</span>
            <img
              className="sect9_show_all_arrow"
              src={Photo.p1_s4_arrow_diag}
              alt="Show All Brands"
            />
          </button>
        </div>

        <div className="sect9_cards">
          {brands.map((brand) => (
            <div className="sect9_card" key={brand.id}>
              <img
                className="sect9_card_logo"
                src={brand.logo}
                alt={brand.name}
              />
              <span className="sect9_card_name">{brand.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
