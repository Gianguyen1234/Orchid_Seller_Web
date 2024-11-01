import React from "react";
import "./OrchidCard.css";
import Star from "../assets/star.png";
import { Link } from "react-router-dom";

export default function OrchidCard({ orchid }) {
  return (
    <div className="orchid_card">
      <Link to={`detail/${orchid.id}`}>
        <img src={orchid.image} alt="" className="orchid_poster" />
        <div className="orchid_details">
          <h3 className="orchid_details_heading">{orchid.orchidName}</h3>
          
          <div className="align_center orchid_date_rate">
          <p>Natural:  {orchid.isNatural ? "Yes" : "No"} </p>
          <p>Special:  {orchid.isAttractive ? "Yes" : "No"} </p>
            <p className="align_center">
              5.0
              <img src={Star} alt="rating icon" className="card_emoji" />
            </p>
            
          </div>
          <p className="orchid_description">
            {orchid.description.slice(0, 50) + "..."}
          </p>
        </div>
      </Link>
    </div>
  );
}
