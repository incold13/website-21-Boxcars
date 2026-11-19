import "./Hero_sect1.scss";
import { Photo } from "../../../photo.js";

export default function Hero_sect1() {
  return (
    <section className="sect1">
      <div className="sect1_all">
        <div className="sect1_banner">
          <div className="sect1_content">
            <p className="sect1_subtitle">The World's Largest Used Car Dealership</p>
            <h1 className="sect1_title">Find Your Perfect Vehicle Online</h1>
          </div>
          <div className="sect1_arrows">
            <button className="sect1_arrow_btn">
              <img className="sect1_arrow" src={Photo.hero_arrow_l} alt="" />
            </button>
            <button className="sect1_arrow_btn">
              <img className="sect1_arrow" src={Photo.hero_arrow_r} alt="" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
