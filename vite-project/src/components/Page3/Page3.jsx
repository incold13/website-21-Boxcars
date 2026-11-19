import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Page3.scss";
import { fetchCarByIdOrSlug } from "../../api/carsApi.js";
import { carsDatabase } from "../../data/cars.js";
import Detail_sect1 from "./detail_sect1/detail_sect1.jsx";
import Detail_sect2 from "./detail_sect2/detail_sect2.jsx";
import Detail_sect3 from "./detail_sect3/detail_sect3.jsx";
import Detail_sect4 from "./detail_sect4/detail_sect4.jsx";
import Detail_sect5 from "./detail_sect5/detail_sect5.jsx";
import List_sect3 from "../Page2/list_sect3/list_sect3.jsx";

export default function Page3() {
  const { id } = useParams();
  const [car, setCar] = useState(null);

  useEffect(() => {
    let isMounted = true;
    async function loadCar() {
      const result = await fetchCarByIdOrSlug(id || "1");
      if (isMounted) {
        if (result && result.data) {
          setCar(result.data);
        } else {
          setCar(carsDatabase[0]);
        }
      }
    }
    loadCar();
    window.scrollTo({ top: 0, behavior: "smooth" });
    return () => {
      isMounted = false;
    };
  }, [id]);

  if (!car) {
    return (
      <div className="cardetail_loading_wrap">
        <div className="cardetail_loading">Loading vehicle data...</div>
      </div>
    );
  }

  return (
    <div className="cardetail_wrapper">
      <div className="cardetail_white_block">
        <div className="cardetail_top_spacer" />
        <div className="cardetail_all">
          <Detail_sect1 car={car} />
          <Detail_sect2 car={car} />
          <Detail_sect3 car={car} />
          <Detail_sect4 car={car} />
          <Detail_sect5 currentCarId={car.id} />
        </div>
        <div className="cardetail_bottom_spacer" />
      </div>
      <List_sect3 />
    </div>
  );
}