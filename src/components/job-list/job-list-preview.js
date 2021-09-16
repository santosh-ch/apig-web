import React, { useEffect, useState } from 'react';
import { Offcanvas, Row } from 'react-bootstrap';
import './job-list.scss';
import PropTypes from 'prop-types';

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

    return (
        <Offcanvas show={show} onHide={handleClose} placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Job Information</Offcanvas.Title>
            </Offcanvas.Header>
            {jobDetails ?
                <Offcanvas.Body>
                    <Row className="preview">
                        <a href={"/jobs/" + props.jobName}>{props.jobName}</a>

                        <h6 className="standardMargin">Quick Actions</h6>
                        
                        <h6 className="standardMargin">Micro Function</h6>
                        <p>
                            <a href={"/microfunctions/" + jobDetails['microfunction']}>{jobDetails['microfunction']}</a>
                        </p>
                        
                        <h6 className="standardMargin">Request</h6>
                        <p>
                            <samp>{jobDetails['method']} {jobDetails['path']}</samp>
                        </p>

                        <h6 className="standardMargin">Inputs</h6>
                        <pre className="code"><code>{JSON.stringify(jobDetails['body'] ? jobDetails['body']['inputs'] : '', null, 2)}</code></pre>
                        
                        <h6 className="standardMargin">Active Constraints</h6>
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