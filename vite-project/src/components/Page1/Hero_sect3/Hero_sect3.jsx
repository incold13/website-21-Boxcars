import "./Hero_sect3.scss";
import { Photo } from "../../../photo.js";

const features = [
  {
    id: 1,
    icon: Photo.p1_s3_f_d_1,
    title: "Special Financing Offers",
    description:
      "Our stress-free finance department that can find financial solutions to save you money.",
  },
  {
    id: 2,
    icon: Photo.p1_s3_f_d_2,
    title: "Trusted Car Dealership",
    description:
      "Our stress-free finance department that can find financial solutions to save you money.",
  },
  {
    id: 3,
    icon: Photo.p1_s3_f_d_3,
    title: "Transparent Pricing",
    description:
      "Our stress-free finance department that can find financial solutions to save you money.",
  },
  {
    id: 4,
    icon: Photo.p1_s3_f_d_4,
    title: "Expert Car Service",
    description:
      "Our stress-free finance department that can find financial solutions to save you money.",
  },
];

export default function Hero_sect3() {
  return (
    <section className="sect3">
      <div className="sect3_all">
        <div className="sect3_left">
          <h2 className="sect3_title">
            We're BIG On What<br />Matters To You
          </h2>
        </div>
        <div className="sect3_right">
          {features.map((item) => (
            <div className="sect3_item" key={item.id}>
              <div className="sect3_item_icon_box">
                <img
                  className="sect3_item_icon"
                  src={item.icon}
                  alt={item.title}
                />
              </div>
              <div className="sect3_item_content">
                <h3 className="sect3_item_title">{item.title}</h3>
                <p className="sect3_item_desc">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
