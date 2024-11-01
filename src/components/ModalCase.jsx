import { Button, CssBaseline } from "@mui/material";
import React from "react";
import "./ModalCase.css";

export default function ModalCase({ setIsOpen, orchid }) {
  return (
    <div className="modal-show" onClick={() => setIsOpen(false)}>
      <div
        id="modal1"
        className="modal"
        style={{ display: "block", top: "10%", bottom: "10%" }}
      >
        <div className="align_center modal-content">
          <h4>Trailer of {orchid.title + " " + orchid.code} </h4>
          <p>
            <iframe
              width="540px"
              height="320px"
              src={orchid.clip}
              title={orchid.title}
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </p>
          <div className="modal-footer" style={{ top: "10%", bottom: "10%" }}>
            <a className="modal-close red-text">
              <Button variant="outlined">Close</Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
