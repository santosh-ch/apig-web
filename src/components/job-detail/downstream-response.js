import React from "react";
import "./job-detail.scss";
import { Row } from "react-bootstrap";
import { jsonify } from "../../common/utils";

const DownstreamResponse = (props) => {
  return (
    <Row className="card-body">
      <h5 class="card-title">Downstream Response</h5>
      <pre id="job-downstream-response" class="code">
        <code>{jsonify(props?.response)}</code>
      </pre>
    </Row>
  );
};

export default DownstreamResponse;
