import React, { useState, useEffect } from "react";
import "./job-details.scss";
import { Row } from "react-bootstrap";

const JobDuration = (props) => {
  let duration_in_seconds = props?.duration;
  const [duration, setDuration] = useState("");

  useEffect(() => {
    jobDuration();
  }, []);

  function jobDuration() {
    console.log(duration_in_seconds);
    var dateObj = new Date(duration_in_seconds * 1000);
    var hours = dateObj.getUTCHours();
    var minutes = dateObj.getUTCMinutes();
    var seconds = dateObj.getSeconds();

    var timeString =
      hours.toString().padStart(2, "0") +
      ":" +
      minutes.toString().padStart(2, "0") +
      ":" +
      seconds.toString().padStart(2, "0");
    console.log(timeString);
    setDuration(timeString);
  }
  return (
    <Row className="card-body">
      <h5 style={{ color: "green" }}>
        Job Duration: <span>{duration}</span>
      </h5>
    </Row>
  );
};

export default JobDuration;
