import React, { useState, useEffect } from "react";
import "./job-details.scss";
import ChildrenJobs from "./children-jobs";
import FailureResults from "./failure-results";
import Timeline from "./timeline";
import DownstreamResponse from "./downstream-response";
import { Row, Container, Tab, Tabs, Alert } from "react-bootstrap";
import Inputs from "./inputs";
import Outputs from "./outputs";
import Constraints from "./constraints";
import Owners from "./owners";
import JobDuration from "./job-duration";

const JobDetails = (props) => {
  let jid = props?.match?.params?.id;
  const [key, setKey] = useState("home");
  const [data, setData] = useState({});
  const [constraints, setConstraints] = useState({});

  useEffect(() => {
    getJidData();
  }, []);

  function getJidData() {
    fetch("/api/jobs/" + jid)
      .then((response) => {
        return response.json().then((response) => {
          console.log(response);
          if (response != null && response.data == null) {
            //response.data exists for 500 status code
            setData(response);
            let constraints = {};
            if (response["constraints"]) {
              var fetchedConstraintsList = response["constraints"];
              for (var i = 0; i < fetchedConstraintsList.length; i++) {
                var type = fetchedConstraintsList[i]["type"];
                var val = fetchedConstraintsList[i]["attributes"];
                constraints[type] = val;
              }
            }
            setConstraints(constraints);
          }
        });
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  function isValidJob() {
    if (data.hasOwnProperty("apig_jid")) {
      return true;
    } else {
      return false;
    }
  }

  function isPending() {
    if (data.status === "pending") {
      return true;
    } else {
      return false;
    }
  }

  function isRunning() {
    if (data.status === "started") {
      return true;
    } else {
      return false;
    }
  }

  function hasUpstreamJob() {
    var payload = data["apig-payload"]["inputs"];
    if (payload.hasOwnProperty("upstream_jid")) {
      return true;
    } else {
      return false;
    }
  }

  function hasChildrenJobs() {
    if (data.hasOwnProperty("children_jobs")) {
      return true;
    } else {
      return false;
    }
  }

  function isCurrentlyFailed() {
    var FAILURE_STATUSES = ["failed"];
    if (FAILURE_STATUSES.includes(data["status"])) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <Container className="margin-top-10">
      {isValidJob() ? (
        <Row>
          <Row>
            <h1 class="card-title">
              <a href={"/microfunctions/" + data["microfunction"]}>
                {data["microfunction"]}
              </a>
            </h1>
            <h4 class="card-subtitle text-muted apig-job-subtitle">{jid}</h4>
            <h6 class="text-muted">
              {data["status"].toLowerCase() === "successful" ? (
                <span className="apig-jobs-status text-success">
                  <strong>{data["status"]}</strong>
                </span>
              ) : data["status"].toLowerCase() === "started" ? (
                <span className="apig-jobs-status text-info">
                  <strong>{data["status"]}</strong>
                </span>
              ) : data["status"].toLowerCase() === "pending" ? (
                <span className="apig-jobs-status text-primary">
                  <strong>{data["status"]}</strong>
                </span>
              ) : data["status"].toLowerCase() === "failed" ? (
                <span className="apig-jobs-status text-danger">
                  <strong>{data["status"]}</strong>
                </span>
              ) : data["status"].toLowerCase() === "orphaned" ? (
                <span className="apig-jobs-status text-danger">
                  <strong>{data["status"]}</strong>
                </span>
              ) : data["status"].toLowerCase() === "terminated" ? (
                <span className="apig-jobs-status text-warning">
                  <strong>{data["status"]}</strong>
                </span>
              ) : (
                ""
              )}
            </h6>
          </Row>
          <Tabs
            id="controlled-tab"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3"
          >
            <Tab eventKey="home" title="Home">
              <div
                class="flex-container flex-container-sm"
                id="job-flex-container"
              >
                <div
                  class="flex-container flex-container-sm"
                  id="job-container-left"
                >
                  <Inputs data={data} />
                  {isPending() ? <Constraints constraints={constraints} /> : ""}
                </div>
                <div
                  class="flex-container flex-container-sm"
                  id="job-container-right"
                >
                  <Owners owners={data["owners"]} />
                  {!isPending() && !isRunning() ? (
                    <JobDuration duration={data["job_duration_seconds"]} />
                  ) : (
                    ""
                  )}
                  {data["build_params"] || data["registeredVars"] ? (
                    <Outputs data={data} />
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </Tab>
            {hasUpstreamJob() || hasChildrenJobs() ? (
              <Tab eventKey="children-jobs" title="Children Jobs">
                <ChildrenJobs data={data} />
              </Tab>
            ) : (
              ""
            )}
            {data["downstream_response"] ? (
              <Tab eventKey="downstream-response" title="Downstream Response">
                <DownstreamResponse response={data["downstream_response"]} />
              </Tab>
            ) : (
              ""
            )}
            {isCurrentlyFailed() ? (
              <Tab eventKey="failure-results" title="Failure Results">
                <FailureResults result={data["failuresResults"]} />
              </Tab>
            ) : (
              ""
            )}
            <Tab eventKey="timeline" title="TimeLine">
              <Timeline data={data} />
            </Tab>
          </Tabs>
        </Row>
      ) : (
        <Row>
          <Alert variant="warning">CANNOT FIND JOB</Alert>
        </Row>
      )}
    </Container>
  );
};

export default JobDetails;
