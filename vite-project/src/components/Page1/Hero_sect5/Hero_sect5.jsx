import "./Hero_sect5.scss";
import { Photo } from "../../../photo.js";

const promoCards = [
  {
    id: 1,
    theme: "blue",
    title: (
      <>
        Are You Looking<br />For a Car ?
      </>
    ),
    description:
      "We are committed to providing our customers with exceptional service.",
    btnText: "Get Started",
    btnTheme: "blue",
    illustration: Photo.p1_s5_electric_car,
  },
  {
    id: 2,
    theme: "pink",
    title: (
      <>
        Do You Want to<br />Sell a Car ?
      </>
    ),
    description:
      "We are committed to providing our customers with exceptional service.",
    btnText: "Get Started",
    btnTheme: "black",
    illustration: Photo.p1_s5_electric_car2,
  },
];

export default function Hero_sect5() {
  return (
    <section className="sect5">
      <div className="sect5_all">
        {promoCards.map((card) => (
          <div className={`sect5_card sect5_card_${card.theme}`} key={card.id}>
            <div className="sect5_card_all">
              <div className="sect5_card_left">
                <h3 className="sect5_card_title">{card.title}</h3>
                <p className="sect5_card_desc">{card.description}</p>
                <button
                  className={`sect5_card_btn sect5_card_btn_${card.btnTheme}`}
                >
                  <span className="sect5_card_btn_text">{card.btnText}</span>
                  <img
                    className="sect5_card_btn_arrow"
                    src={Photo.p1_s5_arrow_diag_white}
                    alt="Arrow"
                  />
                </button>
              </div>
              <div className="sect5_card_right">
                <img
                  className="sect5_card_ill"
                  src={card.illustration}
                  alt="Illustration"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
