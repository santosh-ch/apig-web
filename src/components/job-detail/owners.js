import React from "react";
import "./job-details.scss";
import { Row } from "react-bootstrap";

const Owners = (props) => {
  return (
    <Row className="card-body">
      <h5 className="card-title">Owners</h5>
      <ul>
        {props?.owners?.length > 0 &&
          props?.owners.map((owner) => (
            <li key={owner}>
              <a href={"mailto:" + owner}>{owner}</a>
            </li>
          ))}
      </ul>
    </Row>
  );
};

export default Owners;
