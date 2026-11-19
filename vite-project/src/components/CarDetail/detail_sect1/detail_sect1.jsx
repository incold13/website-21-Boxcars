import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./detail_sect1.scss";
import { Photo } from "../../../photo.js";

export default function Detail_sect1({ car }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [saved, setSaved] = useState(false);

  if (!car) return null;

  const galleryImages = [
    car.image,
    Photo.p1_s4_car1_660x440,
    Photo.p1_s4_car3_660x440,
    Photo.p1_s4_car6_660x440,
    Photo.p1_s3_car9_660x440,
    Photo.p1_s3_car10_660x440,
    Photo.p1_s3_car11_660x440,
    Photo.p1_s3_car20_660x440,
  ];

  const handlePrevImage = () => {
    setActiveImageIndex((prev) =>
      prev === 0 ? galleryImages.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setActiveImageIndex((prev) =>
      prev === galleryImages.length - 1 ? 0 : prev + 1
    );
  };

  const overviewCol1 = [
    { label: "Body", value: car.overview?.body || "Sedan", icon: Photo.ov_body },
    { label: "Mileage", value: (car.overview?.mileage || car.quickSpecs?.miles || "250").replace(/miles?/i, "").trim(), icon: Photo.ov_speedometer },
    { label: "Fuel Type", value: car.overview?.fuelType || car.quickSpecs?.fuel || "Petrol", icon: Photo.ov_fuel },
    { label: "Year", value: car.overview?.year || 2021, icon: Photo.ov_calendar },
    { label: "Transmission", value: car.overview?.transmission || car.quickSpecs?.transmission || "Manual", icon: Photo.ov_transmission },
    { label: "Drive Type", value: car.overview?.driveType || "Rear-Wheel Drive", icon: Photo.ov_wheel },
  ];

  const overviewCol2 = [
    { label: "Condition", value: car.overview?.condition || "Used", icon: Photo.ov_condition },
    { label: "Engine Size", value: (car.overview?.engineSize || "4.0").replace(/l/i, "").trim(), icon: Photo.ov_engine },
    { label: "Door", value: typeof car.overview?.doors === "number" ? `${car.overview.doors} Doors` : (car.overview?.doors || "4 Doors"), icon: Photo.ov_door },
    { label: "Cylinder", value: car.overview?.cylinders || 12, icon: Photo.ov_cylinder },
    { label: "Color", value: car.overview?.color || "Black", icon: Photo.ov_color },
    { label: "VIN", value: car.overview?.vin || "FCB123792", icon: Photo.ov_vin },
  ];

  const features = car.features || {
    interior: ["Air Conditioner", "Digital Odometer", "Heater", "Leather Seats", "Panoramic Moonroof", "Tachometer"],
    safety: ["Anti-lock Braking", "Brake Assist", "Child Safety Locks", "Driver Air Bag", "Power Door Locks"],
    exterior: ["Fog Lights Front", "Rain Sensing Wiper", "Rear Spoiler", "Windows - Electric"],
    comfort: ["Android Auto", "Apple CarPlay", "Bluetooth", "HomeLink", "Power Steering"],
  };

  const cleanVal = (val, regex) => {
    if (val === undefined || val === null) return "";
    return String(val).replace(regex, "").trim();
  };

  const dimensions = car.dimensions || {
    length: "4950mm",
    width: "2140mm",
    height: "1776mm",
    widthWithMirrors: "2240mm",
    wheelbase: "2984mm",
    grossVehicleWeight: "1550",
    heightWithRoofRails: "1876mm",
    maxLoadingWeight: "1200",
    luggageCapacityUp: "450",
    maxRoofLoad: "350",
    luggageCapacityDown: "850",
    seats: 5,
  };

  const dimensionsCol1 = [
    { label: "Length", value: dimensions.length },
    { label: "Height", value: dimensions.height },
    { label: "Wheelbase", value: dimensions.wheelbase },
    { label: "Height (including roof rails)", value: dimensions.heightWithRoofRails },
    { label: "Luggage Capacity (Seats Up - Litres)", value: cleanVal(dimensions.luggageCapacityUp, /litres?/i) },
    { label: "Luggage Capacity (Seats Down - Litres)", value: cleanVal(dimensions.luggageCapacityDown, /litres?/i) },
  ];

  const dimensionsCol2 = [
    { label: "Width", value: dimensions.width },
    { label: "Width (including mirrors)", value: dimensions.widthWithMirrors },
    { label: "Gross Vehicle Weight (kg)", value: cleanVal(dimensions.grossVehicleWeight, /kg/i) },
    { label: "Max. Loading Weight (kg)", value: cleanVal(dimensions.maxLoadingWeight, /kg/i) },
    { label: "Max. Roof Load (kg)", value: cleanVal(dimensions.maxRoofLoad, /kg/i) },
    { label: "No. of Seats", value: dimensions.seats },
  ];

  const engineSpecs = car.engineAndTransmission || {
    fuelTankCapacity: "100",
    minKerbweight: "350",
    maxTowingWeightBraked: "800",
    turningCircle: "4500",
    maxTowingWeightUnbraked: "1000",
  };

  const engineCol1 = [
    { label: "Fuel Tank Capacity (Litres)", value: cleanVal(engineSpecs.fuelTankCapacity, /litres?/i) },
    { label: "Minimum Kerbweight (kg)", value: cleanVal(engineSpecs.minKerbweight, /kg/i) },
    { label: "Max. Towing Weight – Braked (kg)", value: cleanVal(engineSpecs.maxTowingWeightBraked, /kg/i) },
  ];

  const engineCol2 = [
    { label: "Turning Circle – Kerb to Kerb (m)", value: cleanVal(engineSpecs.turningCircle, /m$/i) },
    { label: "Max. Towing Weight – Unbraked (kg)", value: cleanVal(engineSpecs.maxTowingWeightUnbraked, /kg/i) },
  ];

  const instantSaving =
    car.oldPrice && car.oldPrice > car.price
      ? car.oldPrice - car.price
      : 15000;

  return (
    <div className="detail_sect1">
      <div className="detail_sect1_breadcrumbs">
        <Link to="/" className="detail_sect1_crumb_link">Home</Link>
        <span className="detail_sect1_crumb_sep">/</span>
        <Link to="/list" className="detail_sect1_crumb_link">Listings</Link>
        <span className="detail_sect1_crumb_sep">/</span>
        <span className="detail_sect1_crumb_current">{car.name}</span>
      </div>

      <div className="detail_sect1_header_row">
        <div className="detail_sect1_header_left">
          <h1 className="detail_sect1_title">{car.name}</h1>
          <p className="detail_sect1_subtitle">{car.subtitle}</p>
          <div className="detail_sect1_pills">
            <div className="detail_sect1_pill">
              <img src={Photo.detail_pill_calendar} alt="" className="detail_sect1_pill_icon" />
              <span>{car.overview?.year || 2021}</span>
            </div>
            <div className="detail_sect1_pill">
              <img src={Photo.detail_pill_speedometer} alt="" className="detail_sect1_pill_icon" />
              <span>{car.quickSpecs?.miles || "250 miles"}</span>
            </div>
            <div className="detail_sect1_pill">
              <img src={Photo.detail_pill_transmission} alt="" className="detail_sect1_pill_icon" />
              <span>{car.quickSpecs?.transmission || "Manual"}</span>
            </div>
            <div className="detail_sect1_pill">
              <img src={Photo.detail_pill_fuel} alt="" className="detail_sect1_pill_icon" />
              <span>{car.quickSpecs?.fuel || "Petrol"}</span>
            </div>
          </div>
        </div>

        <div className="detail_sect1_header_actions">
          <button
            type="button"
            className="detail_sect1_action_item"
            onClick={() => {
              navigator.clipboard?.writeText(window.location.href);
              alert("Link copied to clipboard!");
            }}
          >
            <span>Share</span>
            <div className="detail_sect1_action_icon_circle">
              <img src={Photo.detail_share_icon_figma} alt="" className="detail_sect1_act_img" />
            </div>
          </button>
          <button
            type="button"
            className={`detail_sect1_action_item ${saved ? "active" : ""}`}
            onClick={() => setSaved(!saved)}
          >
            <span>{saved ? "Saved" : "Save"}</span>
            <div className="detail_sect1_action_icon_circle">
              <img src={Photo.detail_bookmark_icon_figma} alt="" className="detail_sect1_act_img" />
            </div>
          </button>
          <button type="button" className="detail_sect1_action_item">
            <span>Compare</span>
            <div className="detail_sect1_action_icon_circle">
              <img src={Photo.detail_compare_icon_figma} alt="" className="detail_sect1_act_img" />
            </div>
          </button>
        </div>
      </div>

      <div className="detail_sect1_main_grid">
        <div className="detail_sect1_left_col">
          <div className="detail_sect1_gallery">
            <div className="detail_sect1_gallery_main">
              <img
                src={galleryImages[activeImageIndex]}
                alt={car.name}
                className="detail_sect1_main_photo"
              />
              <div className="detail_sect1_badge_wrap">
                <span className="detail_sect1_badge">Sale</span>
              </div>
              <button
                type="button"
                className="detail_sect1_video_btn"
                onClick={() => setIsVideoModalOpen(true)}
              >
                <img src={Photo.detail_play_icon_dark} alt="" className="detail_sect1_video_icon" />
                <span>Video</span>
              </button>
              <button
                type="button"
                className="detail_sect1_arrow detail_sect1_arrow_prev"
                onClick={handlePrevImage}
              >
                <img src={Photo.p1_s4_arrow_left} alt="" className="detail_sect1_nav_icon" />
              </button>
              <button
                type="button"
                className="detail_sect1_arrow detail_sect1_arrow_next"
                onClick={handleNextImage}
              >
                <img src={Photo.p1_s4_arrow_right} alt="" className="detail_sect1_nav_icon" />
              </button>
            </div>
          </div>

          <div className="detail_sect1_block">
            <h2 className="detail_sect1_block_title">Car Overview</h2>
            <div className="detail_sect1_overview_container">
              <div className="detail_sect1_overview_col">
                {overviewCol1.map((item, idx) => (
                  <div key={idx} className="detail_sect1_overview_row">
                    <div className="detail_sect1_overview_left">
                      <img src={item.icon} alt="" className="detail_sect1_ov_icon" />
                      <span className="detail_sect1_ov_label">{item.label}</span>
                    </div>
                    <span className="detail_sect1_ov_value">{item.value}</span>
                  </div>
                ))}
              </div>
              <div className="detail_sect1_overview_col">
                {overviewCol2.map((item, idx) => (
                  <div key={idx} className="detail_sect1_overview_row">
                    <div className="detail_sect1_overview_left">
                      <img src={item.icon} alt="" className="detail_sect1_ov_icon" />
                      <span className="detail_sect1_ov_label">{item.label}</span>
                    </div>
                    <span className="detail_sect1_ov_value">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="detail_sect1_divider" />

          <div className="detail_sect1_block">
            <h2 className="detail_sect1_block_title">Description</h2>
            <div className="detail_sect1_desc_text">
              <p>
                {car.description?.paragraphs?.[0] ||
                  "Quisque imperdiet dignissim enim dictum finibus. Sed consectetutr convallis enim eget laoreet. Aenean vitae nisl mollis, porta risus vel, dapibus lectus. Etiam ac suscipit eros, eget maximus."}
              </p>
              <p>
                {car.description?.paragraphs?.[1] ||
                  "Etiam sit amet ex pharetra, venenatis ante vehicula, gravida sapien. Fusce eleifend vulputate nibh, non cursus augue placerat pellentesque. Sed venenatis risus nec felis mollis, in pharetra urna euismod. Morbi aliquam ut turpis sit amet ultrices. Vestibulum mattis blandit nisl, et tristique elit scelerisque nec."}
              </p>
            </div>
            <div className="detail_sect1_brochure_wrap">
              <a
                href="#download"
                className="detail_sect1_brochure_btn"
                onClick={(e) => {
                  e.preventDefault();
                  alert("Brochure downloaded.");
                }}
              >
                <img src={Photo.detail_pdf_icon} alt="" className="detail_sect1_pdf_icon" />
                <span>Car-Brochure.Pdf</span>
              </a>
            </div>
          </div>

          <div className="detail_sect1_divider" />

          <div className="detail_sect1_block">
            <h2 className="detail_sect1_block_title">Features</h2>
            <div className="detail_sect1_features_grid">
              <div className="detail_sect1_feat_col">
                <h3 className="detail_sect1_feat_cat">Interior</h3>
                <div className="detail_sect1_feat_list">
                  {features.interior.map((f, i) => (
                    <div key={i} className="detail_sect1_feat_item">
                      <img src={Photo.detail_check_icon} alt="" className="detail_sect1_check" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="detail_sect1_feat_col">
                <h3 className="detail_sect1_feat_cat">Safety</h3>
                <div className="detail_sect1_feat_list">
                  {features.safety.map((f, i) => (
                    <div key={i} className="detail_sect1_feat_item">
                      <img src={Photo.detail_check_icon} alt="" className="detail_sect1_check" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="detail_sect1_feat_col">
                <h3 className="detail_sect1_feat_cat">Exterior</h3>
                <div className="detail_sect1_feat_list">
                  {features.exterior.map((f, i) => (
                    <div key={i} className="detail_sect1_feat_item">
                      <img src={Photo.detail_check_icon} alt="" className="detail_sect1_check" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="detail_sect1_feat_col">
                <h3 className="detail_sect1_feat_cat">Comfort & Convenience</h3>
                <div className="detail_sect1_feat_list">
                  {features.comfort.map((f, i) => (
                    <div key={i} className="detail_sect1_feat_item">
                      <img src={Photo.detail_check_icon} alt="" className="detail_sect1_check" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="detail_sect1_divider" />

          <div className="detail_sect1_block">
            <h2 className="detail_sect1_block_title">Dimensions & Capacity</h2>
            <div className="detail_sect1_specs_container">
              <div className="detail_sect1_specs_col detail_sect1_dim_col1">
                {dimensionsCol1.map((spec, i) => (
                  <div key={i} className="detail_sect1_spec_row">
                    <span className="detail_sect1_spec_label">{spec.label}</span>
                    <span className="detail_sect1_spec_value">{spec.value}</span>
                  </div>
                ))}
              </div>
              <div className="detail_sect1_specs_col detail_sect1_dim_col2">
                {dimensionsCol2.map((spec, i) => (
                  <div key={i} className="detail_sect1_spec_row">
                    <span className="detail_sect1_spec_label">{spec.label}</span>
                    <span className="detail_sect1_spec_value">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="detail_sect1_divider" />

          <div className="detail_sect1_block">
            <h2 className="detail_sect1_block_title">Engine and Transmission</h2>
            <div className="detail_sect1_specs_container">
              <div className="detail_sect1_specs_col detail_sect1_engine_col1">
                {engineCol1.map((spec, i) => (
                  <div key={i} className="detail_sect1_spec_row">
                    <span className="detail_sect1_spec_label">{spec.label}</span>
                    <span className="detail_sect1_spec_value">{spec.value}</span>
                  </div>
                ))}
              </div>
              <div className="detail_sect1_specs_col detail_sect1_engine_col2">
                {engineCol2.map((spec, i) => (
                  <div key={i} className="detail_sect1_spec_row">
                    <span className="detail_sect1_spec_label">{spec.label}</span>
                    <span className="detail_sect1_spec_value">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <aside className="detail_sect1_sidebar">
          <div className="detail_sect1_price_card">
            <span className="detail_sect1_price_label">Our Price</span>
            <div className="detail_sect1_price_numbers">
              <span className="detail_sect1_old_price">
                {car.formattedOldPrice || "$180,000"}
              </span>
              <span className="detail_sect1_current_price">
                {car.formattedPrice || "$165,000"}
              </span>
            </div>
            <span className="detail_sect1_saving_text">
              Instant Saving: ${instantSaving.toLocaleString()}
            </span>
            <div className="detail_sect1_price_cta">
              <button
                type="button"
                className="detail_sect1_cta_btn detail_sect1_cta_primary"
                onClick={() => alert("Make An Offer")}
              >
                <img src={Photo.detail_tag_icon_white} alt="" className="detail_sect1_cta_icon" />
                <span>Make An Offer Price</span>
              </button>
              <button
                type="button"
                className="detail_sect1_cta_btn detail_sect1_cta_outline"
                onClick={() => alert("Schedule Test Drive")}
              >
                <img src={Photo.detail_wheel_icon} alt="" className="detail_sect1_cta_icon" />
                <span>Schedule Test Drive</span>
              </button>
            </div>
          </div>

          <div className="detail_sect1_dealer_card">
            <div className="detail_sect1_dealer_avatar_box">
              <img
                src={Photo.p3_team2_150x150}
                alt=""
                className="detail_sect1_dealer_photo"
              />
            </div>
            <h3 className="detail_sect1_dealer_name">admin</h3>
            <p className="detail_sect1_dealer_address">943 Broadway, Brooklyn</p>

            <div className="detail_sect1_dealer_quick_row">
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
                className="detail_sect1_dealer_quick_item"
              >
                <div className="detail_sect1_quick_circle">
                  <img src={Photo.detail_dealer_target_pin} alt="" className="detail_sect1_quick_ico" />
                </div>
                <span>Get Direction</span>
              </a>
              <a
                href="tel:+88-123456789"
                className="detail_sect1_dealer_quick_item"
              >
                <div className="detail_sect1_quick_circle">
                  <img src={Photo.detail_dealer_phone_blue} alt="" className="detail_sect1_quick_ico" />
                </div>
                <span>+88-123456789</span>
              </a>
            </div>

            <div className="detail_sect1_dealer_buttons">
              <button
                type="button"
                className="detail_sect1_dealer_msg_btn"
                onClick={() => alert("Message dealer dialogue opened.")}
              >
                <span>Message Dealer</span>
                <img src={Photo.detail_arrow_diag_blue} alt="" className="detail_sect1_btn_diag" />
              </button>
              <a
                href={`https://wa.me/88123456789`}
                target="_blank"
                rel="noreferrer"
                className="detail_sect1_dealer_wa_btn"
              >
                <span>Chat Via Whatsapp</span>
                <img src={Photo.detail_arrow_diag_green} alt="" className="detail_sect1_btn_diag" />
              </a>
              <Link to="/list" className="detail_sect1_dealer_stock_link">
                <span>View All stock at this dealer</span>
                <img src={Photo.detail_arrow_diag_dark} alt="" className="detail_sect1_link_diag" />
              </Link>
            </div>
          </div>
        </aside>
      </div>

      {isVideoModalOpen && (
        <div className="detail_sect1_modal_bg" onClick={() => setIsVideoModalOpen(false)}>
          <div className="detail_sect1_modal_box" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="detail_sect1_modal_x"
              onClick={() => setIsVideoModalOpen(false)}
            >
              ✕
            </button>
            <div className="detail_sect1_video_player">
              <iframe
                title="Car Video"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
