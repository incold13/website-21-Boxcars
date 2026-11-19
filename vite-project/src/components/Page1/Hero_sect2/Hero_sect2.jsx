import "./Hero_sect2.scss";
import { Photo } from "../../../photo.js";

const bodyStyles = [
  { id: 1, title: "Sedan", image: Photo.p1_s2_sedan },
  { id: 2, title: "Coupe", image: Photo.p1_s2_coupe },
  { id: 3, title: "SUV", image: Photo.p1_s2_suv },
  { id: 4, title: "Truck", image: Photo.p1_s2_truck },
  { id: 5, title: "Hatchback", image: Photo.p1_s2_hat },
  { id: 6, title: "Convertible", image: Photo.p1_s2_mini },
];

export default function Hero_sect2() {
  return (
    <section className="sect2">
      <div className="sect2_all">
        <div className="sect2_header">
          <h2 className="sect2_title">Select a Body Style</h2>
        </div>
        <div className="sect2_cards">
          {bodyStyles.map((item) => (
            <div className="sect2_card" key={item.id}>
              <div className="sect2_card_img_box">
                <img className="sect2_card_img" src={item.image} alt={item.title} />
              </div>
              <p className="sect2_card_name">{item.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
