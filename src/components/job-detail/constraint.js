import React from "react";
import { Row } from "react-bootstrap";
import { jsonify } from "../../common/utils";
import "./job-detail.scss";

const Constraint = (props) => {
  return (
    <Row className="card-body">
      <h5 className="card-title">Active Constraints</h5>
      {props?.constraints &&
        Object.keys(props?.constraints).map((key) => (
          <>
            <h6 className="text-primary job-constraint-title">{key}</h6>
            <pre className="code">
              <code id={key}>{jsonify(props?.constraints[key])}</code>
            </pre>
          </>
        ))}
    </Row>
  );
};

export default Constraint;
