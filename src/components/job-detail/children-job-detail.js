import React, { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { toggleCollapse } from '../../common/utils';


const ChildrenJobDetail = (props) => {
    let totalJobs = 0;
    let readyJobs = 0;
    let completedJobs = 0;
    let runningJobs = 0;
    let waitingJobs = 0;
    let failedJobs = 0;
    let undefinedJobs = 0;
    const [childrenJobsStatusMap, setChildrenJobsStatusMap] = useState({});
    const [childrenJobTypeStyles, setChildrenJobTypeStyles] = useState({});
    const childJobFailureStatusList = ["failed", "failure", "fail", "error", "unsuccessful", "orphan", "orphaned", "timeout", "terminated"];

    // Establish the allowable values
    const STATUS_READY = ["ready"]
    const STATUS_WAITING = ["waiting"]
    const STATUS_FAILED = ["failed", "failure", "fail", "error", "unsuccessful", "orphan", "orphaned", "timeout", "terminated"]
    const STATUS_RUNNING = ["running"]
    const STATUS_COMPLETED = ["completed"]
    useEffect(() => {
        let childrenJobsStatus = {};
        if (props?.data['children_jobs']) {

            // Read the total keys in the object
            totalJobs = Object.keys(props?.data['children_jobs']).length;

            // Check all the states in children jobs
            for (let childJob in props?.data['children_jobs']) {
                let childJobStatus = props?.data['children_jobs'][childJob]['status'];
                if (STATUS_READY.indexOf(childJobStatus) > -1) {
                    readyJobs += 1;
                } else if (STATUS_WAITING.indexOf(childJobStatus) > -1) {
                    waitingJobs += 1;
                } else if (STATUS_FAILED.indexOf(childJobStatus) > -1) {
                    failedJobs += 1;
                } else if (STATUS_RUNNING.indexOf(childJobStatus) > -1) {
                    runningJobs += 1;
                } else if (STATUS_COMPLETED.indexOf(childJobStatus) > -1) {
                    completedJobs += 1;
                } else {
                    undefinedJobs += 1;
                }
            }
        }
        childrenJobsStatus['total'] = totalJobs;
        childrenJobsStatus['ready'] = readyJobs;
        childrenJobsStatus['waiting'] = waitingJobs;
        childrenJobsStatus['failed'] = failedJobs;
        childrenJobsStatus['running'] = runningJobs;
        childrenJobsStatus['completed'] = completedJobs;
        childrenJobsStatus['undefined'] = undefinedJobs;
        setChildrenJobsStatusMap(childrenJobsStatus);
        // updateStyles childrenJobTypeStyles object here
        setChildrenJobTypeStyles({
            'jobCompletion': Math.ceil(completedJobs / totalJobs * 100).toString() + '%',
            'total': {
                'width': '100%'
            },
            'ready': {
                'width': (readyJobs / totalJobs * 100).toString() + '%'
            },
            'waiting': {
                'width': (waitingJobs / totalJobs * 100).toString() + '%'
            },
            'failed': {
                'width': (failedJobs / totalJobs * 100).toString() + '%'
            },
            'running': {
                'width': (runningJobs / totalJobs * 100).toString() + '%'
            },
            'completed': {
                'width': (completedJobs / totalJobs * 100).toString() + '%'
            }
        });

    }, [])
    return (
        <Container>
                {props?.data['apig-payload']['inputs']['upstream_jid'] ?
                        <Row>
                            <h5 className="card-title">Parent Job</h5>
                            <h6 className="text-muted"><small>This job belongs to a conductor</small></h6>
                            <strong>
                                <a href={"/jobs/" + props?.data['apig-payload']['inputs']['upstream_jid']}>
                                    {props?.data['apig-payload']['inputs']['upstream_jid']}
                                </a>
                            </strong>
                        </Row> : ''
                }
            {props?.data['children_jobs'] ?
                <Row style={{ marginTop: '24px' }}>
                    <h5 className="card-title">Children Jobs <span className="badge badge-secondary">{childrenJobsStatusMap['total']}</span></h5>
                    <h6 className="text-muted"><small>This job is a conductor</small></h6>
                    <p><strong>{childrenJobTypeStyles['jobCompletion']} complete</strong></p>

                    <div style={{ marginBottom: '24px' }} className="progress">
                        <div className="progress-bar bg-success" role="progressbar" style={childrenJobTypeStyles['completed']}></div>
                        <div className="progress-bar bg-warning" role="progressbar" style={childrenJobTypeStyles['waiting']}></div>
                        <div className="progress-bar progress-bar-striped progress-bar-animated bg-primary" role="progressbar" style={childrenJobTypeStyles['ready']}></div>
                        <div className="progress-bar progress-bar-striped progress-bar-animated bg-primary" role="progressbar" style={childrenJobTypeStyles['running']}></div>
                        <div className="progress-bar bg-danger" role="progressbar" style={childrenJobTypeStyles['failed']}></div>
                    </div>

                    <ul className="list-group list-group-flush" id="job-children-jobs-unordered-list-container">
                        {props?.data['children_jobs'] && Object.keys(props?.data['children_jobs']).map(key =>
                            <li className="job-list-item list-group-item" key={key} onClick={toggleCollapse}>
                                <p style={{ marginBottom: '0px', paddingBottom: '0px' }}><strong>{key}</strong>
                                    {props?.data['children_jobs'][key].status == 'completed' ? <span className="badge badge-success" style={{ float: 'right', marginRight: '8px' }}> {props?.data['children_jobs'][key].status}</span> :
                                        props?.data['children_jobs'][key].status == 'waiting' ? <span className="badge badge-warning" style={{ float: 'right', marginRight: '8px' }}> {props?.data['children_jobs'][key].status}</span> :
                                            props?.data['children_jobs'][key].status == 'running' ? <span className="badge badge-info" style={{ float: 'right', marginRight: '8px' }} > {props?.data['children_jobs'][key].status}</span> :
                                                props?.data['children_jobs'][key].status == 'ready' ? <span className="badge badge-primary" style={{ float: 'right', marginRight: '8px' }} > {props?.data['children_jobs'][key].status}</span> :
                                                    childJobFailureStatusList.indexOf(props?.data['children_jobs'][key].status) > -1 ? <span className="badge badge-danger" style={{ float: 'right', marginRight: '8px' }}> {props?.data['children_jobs'][key].status}</span> : ''}
                                </p>

                                <div className="job-child-job-container">
                                    <div className="child-job-info-wrapper">
                                        <p><a href={"/detail/" + props?.data['children_jobs'][key].jid}>{props?.data['children_jobs'][key].jid}</a></p>
                                        <p>Started: <span>{props?.data['children_jobs'][key].begin_wait_time}</span></p>
                                    </div>
                                </div>

                            </li>)}
                    </ul>
                </Row> : ''}
        </Container>
    );
}

const ChildrenJobDetailTypes = {
    data: PropTypes.object
};

ChildrenJobDetail.propTypes = ChildrenJobDetailTypes;

export default ChildrenJobDetail;