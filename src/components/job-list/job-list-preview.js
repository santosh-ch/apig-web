import React, { useEffect, useState } from 'react';
import { Offcanvas, Row } from 'react-bootstrap';
import './job-list.scss';
import PropTypes from 'prop-types';
import { jsonify, toggleCollapse } from '../../common/utils'

const JobListPreview = props => {
    const [show, setShow] = useState(false);
    const [jobDetails, setJobDetails] = useState({});

    useEffect(() => {
        setShow(props.jobName ? true : false);
        setJobDetails(props.jobDetails);
    }, [props.jobName])

    function handleClose() {
        props.setShowPreview(null, props.jobName, false);
        setShow(false);
    }

    function removeJob() {
        var remUrl = '/api/v1/job/remove/' + props.jobName;
        fetch(remUrl);
    }

    function resumeJob() {
        var resumeUrl = '/api/v1/job/resume/' + props.jobName;
        fetch(resumeUrl);
    }

    function pauseJob() {
        var pauseUrl = '/api/v1/job/pause/' + props.jobName;
        fetch(pauseUrl);
    }

    function approveJob() {
        var approveUrl = '/api/v1/job/approve/' + props.jobName;
        fetch(approveUrl);
    }

    return (
        <Offcanvas show={show} onHide={handleClose} placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Job Information</Offcanvas.Title>
            </Offcanvas.Header>
            {jobDetails ?
                <Offcanvas.Body>
                    <Row className="preview card-body">
                        <a href={"/jobs/" + props.jobName}>{props.jobName}</a>

                        <h6 className="standardMargin">Quick Actions</h6>
                        <p>
                            {jobDetails['constraints'] && jobDetails['constraints']['pause'] ?
                                <button type="button" className="btn btn-warning btn-sm" onClick={pauseJob}>Pause</button>
                                :
                                <button type="button" className="btn btn-info btn-sm" onClick={resumeJob}>Unpause</button>
                            }
                            {jobDetails['constraints'] && jobDetails['constraints']['approval'] ?
                                <span>
                                    <button type="button" className="btn btn-success btn-sm" onClick={approveJob}>Approve</button>
                                    <button type="button" className="btn btn-danger btn-sm" onClick={removeJob}>Deny</button>
                                </span> :
                                <button type="button" className="btn btn-danger btn-sm" onClick={removeJob}>Delete</button>
                            }
                        </p>

                        <h6 className="standardMargin">Micro Function</h6>
                        <p>
                            <a href={"/microfunctions/" + jobDetails['microfunction']}>{jobDetails['microfunction']}</a>
                        </p>

                        <h6 className="standardMargin">Request</h6>
                        <p>
                            <samp>{jobDetails['method']} {jobDetails['path']}</samp>
                        </p>

                        <h6 className="standardMargin">Inputs</h6>
                        <p>
                            <pre className="code"><code>{jsonify(jobDetails['body'] ? jobDetails['body']['inputs'] : '')}</code></pre>
                        </p>

                        <h6 className="standardMargin">Active Constraints</h6>
                        <p>
                            <ul className="list-group list-group-flush">
                                {jobDetails['constraints'] && Object.keys(jobDetails['constraints']).map(constraint =>
                                    <li style={{ paddingLeft: '0px' }} onClick={toggleCollapse} key={constraint} className="job-list-item list-group-item">
                                        <p className="apig-jobview-constraint-title">
                                            <small>{constraint} Constraint</small>
                                        </p>

                                        <div className="job-child-job-container">
                                            <div className="child-job-info-wrapper">
                                                <pre className="code"><code>{jsonify(jobDetails['constraints'][constraint])}</code></pre>
                                            </div>
                                        </div>
                                    </li>
                                )}
                            </ul>
                        </p>

                        <h6 className="standardMargin">Owners</h6>
                        <p>
                            <ul>
                                {jobDetails['owners']?.length > 0 && jobDetails['owners'].map(owner =>
                                    <li key={owner}>
                                        <a href={"mailto:" + owner}>{owner}</a>
                                    </li>
                                )}
                            </ul>
                        </p>
                    </Row>
                </Offcanvas.Body>
                : ''}
        </Offcanvas>
    )

}


const JobListPropTypes = {
    jobDetails: PropTypes.Object,
    jobName: PropTypes.string,
    setShowPreview: PropTypes.func
};

JobListPreview.propTypes = JobListPropTypes;

export default JobListPreview;