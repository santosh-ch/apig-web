import React, { useEffect, useState } from 'react';
import { Offcanvas } from 'react-bootstrap';
import './job-list.scss';
import PropTypes from 'prop-types';

const JobListPreview = props => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const [jobDetails,setJobDetails] = useState({});
    useEffect(() => {
        setShow(true);
        setJobDetails(props.jobDetails);
    }, [props.jobDetails])

    return (
        <Offcanvas show={show} onHide={handleClose} placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Job Information</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <a>{props.jobName}</a>
                <h3>Quick Actions</h3>
                <h3>Micro Functions</h3>
        <div>{jobDetails.microfunction}</div>
            </Offcanvas.Body>
        </Offcanvas>
    )

}


const JobListPropTypes = {
    jobDetails : PropTypes.Object,
    jobName: PropTypes.string
};

JobListPreview.propTypes = JobListPropTypes;

export default JobListPreview;