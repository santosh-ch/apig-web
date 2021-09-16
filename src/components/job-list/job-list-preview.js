import React, { useEffect, useState } from 'react';
import { Offcanvas } from 'react-bootstrap';
import './job-list.scss';
import PropTypes from 'prop-types';

const JobListPreview = props => {
    const [show, setShow] = useState(false);
    const [jobDetails,setJobDetails] = useState({});

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
            { jobDetails ?
                <Offcanvas.Body>
                    <a>{props.jobName}</a>
                    <h3>Quick Actions</h3>
                    <h3>Micro Functions</h3>
                    <div>{jobDetails.microfunction}</div>
                </Offcanvas.Body>
            : ''}
        </Offcanvas>
    )

}


const JobListPropTypes = {
    jobDetails : PropTypes.Object,
    jobName: PropTypes.string,
    setShowPreview: PropTypes.func
};

JobListPreview.propTypes = JobListPropTypes;

export default JobListPreview;