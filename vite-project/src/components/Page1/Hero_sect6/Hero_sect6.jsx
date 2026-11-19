import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Hero_sect6.scss";
import { Photo } from "../../../photo.js";
import { fetchCars } from "../../../api/carsApi.js";

const initialRecommendedCars = [
  {
    id: 8,
    image: Photo.p2_car6_660x440,
    badge: { text: "Great Price", type: "green" },
    name: "Mercedes-Benz, C Class",
    subtitle: "2.0 D5 PowerPulse Momentum 5dr AW… Geartronic Estate",
    miles: "100 Miles",
    fuel: "Petrol",
    transmission: "Automatic",
    oldPrice: "$40,000",
    price: "$35,000",
  },
  {
    id: 9,
    image: Photo.p2_car3_660x440,
    badge: { text: "Low Mileage", type: "blue" },
    name: "Ranger White – 2022",
    subtitle: "2.0 D5 PowerPulse Momentum 5dr AW… Geartronic Estate",
    miles: "30000 Miles",
    fuel: "Diesel",
    transmission: "Manual",
    oldPrice: null,
    price: "$25,000",
  },
  {
    id: 10,
    image: Photo.p2_car9_660x440,
    badge: null,
    name: "T-Cross – 2023",
    subtitle: "4.0 D5 PowerPulse Momentum 5dr AW… Geartronic Estate",
    miles: "15 Miles",
    fuel: "Petrol",
    transmission: "CVT",
    oldPrice: null,
    price: "$15,000",
  },
  {
    id: 11,
    image: Photo.p2_car5_660x440,
    badge: null,
    name: "Corolla Altis – 2023",
    subtitle: "3.5 D5 PowerPulse Momentum 5dr AW… Geartronic Estate",
    miles: "15000 Miles",
    fuel: "Petrol",
    transmission: "CVT",
    oldPrice: null,
    price: "$45,000",
  },
];

function resolveCarPhoto(car) {
  if (!car) return Photo.p2_car6_660x440;
  if (car.image && Photo[car.image]) return Photo[car.image];
  if (
    car.image &&
    typeof car.image === "string" &&
    (car.image.startsWith("/") ||
      car.image.startsWith("data:") ||
      car.image.startsWith("http"))
  ) {
    return car.image;
  }
  const n = (car.name || "").toLowerCase();
  if (n.includes("c class") || n.includes("mercedes")) return Photo.p2_car6_660x440;
  if (n.includes("ranger white")) return Photo.p2_car3_660x440;
  if (n.includes("t-cross") || n.includes("cross")) return Photo.p2_car9_660x440;
  if (n.includes("corolla") || n.includes("altis")) return Photo.p2_car5_660x440;
  if (n.includes("ranger black")) return Photo.p2_car11_660x440;
  if (n.includes("camry")) return Photo.p2_car1_660x440;
  if (n.includes("explorer") || n.includes("ford explorer")) return Photo.p2_car13_660x440;
  if (n.includes("audi a6")) return Photo.p2_car14_660x440;
  if (n.includes("audi a4")) return Photo.p2_car8_660x440;
  if (n.includes("glc")) return Photo.p2_car12_660x440;
  if (n.includes("transit")) return Photo.p2_car17_660x440;
  return Photo.p2_car6_660x440;
}

function getBadgeType(badge) {
  if (!badge) return "";
  const t = (badge.type || "").toLowerCase();
  const txt = (badge.text || "").toLowerCase();
  if (t === "green" || txt.includes("great") || txt.includes("price"))
    return "sect6_badge_green";
  return "sect6_badge_blue";
}

export default function Hero_sect6() {
  const [allCars, setAllCars] = useState(initialRecommendedCars);
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    let isMounted = true;
    fetchCars().then((res) => {
      if (!isMounted || !res.data || res.data.length === 0) return;
      const formatted = res.data.map((item) => ({
        id: item.id,
        image: resolveCarPhoto(item),
        badge: item.badge,
        name: item.name,
        subtitle: item.subtitle,
        miles: item.quickSpecs?.miles || item.miles || "100 Miles",
        fuel: item.quickSpecs?.fuel || item.fuel || "Petrol",
        transmission:
          item.quickSpecs?.transmission || item.transmission || "Automatic",
        oldPrice:
          item.formattedOldPrice ||
          (item.oldPrice ? `$${Number(item.oldPrice).toLocaleString()}` : null),
        price:
          item.formattedPrice ||
          (item.price ? `$${Number(item.price).toLocaleString()}` : "$35,000"),
      }));
      setAllCars(formatted);

      const mercIdx = formatted.findIndex((c) =>
        (c.name || "").toLowerCase().includes("mercedes-benz")
      );
      if (mercIdx !== -1) {
        setStartIndex(mercIdx);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const visibleCars = [];
  const total = allCars.length;
  for (let i = 0; i < 4; i++) {
    const idx = (startIndex + i) % total;
    visibleCars.push(allCars[idx]);
  }

  const handlePrev = () => {
    setStartIndex((prev) => (prev - 1 + total) % total);
  };

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1) % total);
  };

  return (
    <section className="sect6">
      <div className="sect6_all">
        <div className="sect6_header">
          <h2 className="sect6_title">Recommended Cars For You</h2>
        </div>

        <div className="sect6_cards">
          {visibleCars.map((car, idx) => (
            <div className="sect6_card" key={`${car.id}-${idx}`}>
              <Link
                to={`/car/${car.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="sect6_card_img_box"
                style={{ backgroundImage: `url(${car.image})` }}
              >
                <div className="sect6_card_top_bar">
                  {car.badge ? (
                    <div className={`sect6_badge ${getBadgeType(car.badge)}`}>
                      {car.badge.text}
                    </div>
                  ) : (
                    <div className="sect6_badge_placeholder" />
                  )}
                  <button
                    type="button"
                    className="sect6_bookmark_btn"
                    aria-label="Bookmark"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                  >
                    <img
                      className="sect6_bookmark_icon"
                      src={Photo.p1_s4_bookmark}
                      alt="Bookmark"
                    />
                  </button>
                </div>
              </Link>

              <div className="sect6_card_body">
                <div className="sect6_card_content">
                  <div className="sect6_card_info">
                    <Link
                      to={`/car/${car.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="sect6_card_title_link"
                    >
                      <h3 className="sect6_card_title">{car.name}</h3>
                    </Link>
                    <p className="sect6_card_subtitle">{car.subtitle}</p>
                  </div>

                  <div className="sect6_divider" />

                  <div className="sect6_specs">
                    <div className="sect6_spec_item">
                      <img
                        className="sect6_spec_icon"
                        src={Photo.p1_s4_speedometer}
                        alt="Miles"
                      />
                      <span className="sect6_spec_text">{car.miles}</span>
                    </div>
                    <div className="sect6_spec_item">
                      <img
                        className="sect6_spec_icon"
                        src={Photo.p1_s4_fuel}
                        alt="Fuel"
                      />
                      <span className="sect6_spec_text">{car.fuel}</span>
                    </div>
                    <div className="sect6_spec_item">
                      <img
                        className="sect6_spec_icon"
                        src={Photo.p1_s4_transmission}
                        alt="Transmission"
                      />
                      <span className="sect6_spec_text">{car.transmission}</span>
                    </div>
                  </div>

                  <div className="sect6_divider" />

                  <div className="sect6_footer">
                    <div className="sect6_price_box">
                      {car.oldPrice && (
                        <span className="sect6_old_price">{car.oldPrice}</span>
                      )}
                      <span className="sect6_price">{car.price}</span>
                    </div>
                    <Link
                      to={`/car/${car.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="sect6_details_btn"
                    >
                      <span className="sect6_details_text">View Details</span>
                      <img
                        className="sect6_details_arrow"
                        src={Photo.p1_s4_arrow_diag}
                        alt="Arrow"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="sect6_pagination">
          <button
            className="sect6_pag_btn"
            onClick={handlePrev}
            aria-label="Previous Cars"
          >
            <img
              className="sect6_pag_arrow"
              src={Photo.p1_s4_arrow_left}
              alt="Previous"
            />
          </button>
          <button
            className="sect6_pag_btn"
            onClick={handleNext}
            aria-label="Next Cars"
          >
            <img
              className="sect6_pag_arrow"
              src={Photo.p1_s4_arrow_right}
              alt="Next"
            />
          </button>
        </div>
      </div>
    </section>
  );
}