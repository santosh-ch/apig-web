import React, { useEffect, useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import './job-list.scss';
import { JobListType } from '../../common/constants';
import PropTypes from 'prop-types';
import { propTypes } from 'react-bootstrap/esm/Image';
import JobListPreview from './job-list-preview';

const JobListTable = props => {

    const [jobSearchResults, setJobSearchResults] = useState([]);
    const [previewDetails, setPreviewDetails] = useState(null);
    const [previewJobName, setPreviewJobName] = useState('');
    const type = props.type;

    useEffect(() => {
        setJobSearchResults(props.jobSearchResults);
    }, [props.jobSearchResults])

    function setShowPreview(e, job, value) {
        if(value){
            setPreviewDetails({...jobSearchResults[job]});
            setPreviewJobName(job);
        } else {
            setPreviewDetails(null);
            setPreviewJobName('');
        }
    }

    return (<Row>
        <Col>
            <table className="table table-responsive margin-top-10">
                <thead>
                    <tr className={!jobSearchResults?.length > 0 || type === JobListType.Pending.toLowerCase() ? 'hide' : ''} >
                        <th>JID</th>
                        <th>Created On</th>
                        <th>Completed On</th>
                    </tr>
                    <tr className={!jobSearchResults || type !== JobListType.Pending.toLowerCase() ? 'hide' : ''} >
                        <th>JID</th>
                        <th>MicroFunction</th>
                        <th></th>
                    </tr>
                </thead>
                {type !== JobListType.Pending.toLowerCase() ?
                    !jobSearchResults?.length > 0 ?
                        <tbody>
                            0 Jobs Found
                        </tbody> :
                        <tbody>
                            {jobSearchResults.map(job =>
                                <tr key={job.apig_jid}>
                                    <td>
                                        <a href={"/detail/" + job.apig_jid}>{job.apig_jid}
                                            {job?.children_jobs ?
                                                <div>
                                                    <span className="badge badge-primary">Conductor</span>
                                                </div>
                                                : ""}
                                        </a>
                                    </td>
                                    <td>{job.job_created_timestamp}</td>
                                    <td>{job.job_finished_timestamp}</td>
                                </tr>
                            )}
                        </tbody>
                    : !jobSearchResults || !Object.keys(jobSearchResults).length > 0 ?
                        <tbody>
                            0 Jobs Found
                        </tbody> :
                        <tbody>
                            {Object.keys(jobSearchResults).map(job =>
                                <tr key={job}>
                                    <td>
                                        <a href={"/detail/" + job}>{job}
                                            {jobSearchResults[job]['constraints'] ?
                                                Object.keys(jobSearchResults[job]['constraints']).map(constraint =>
                                                    <div key={constraint}>
                                                        <span className="badge badge-primary">{constraint}</span>
                                                    </div>)
                                                : ""}
                                        </a>
                                    </td>
                                    <td>{jobSearchResults[job]['microfunction']}</td>
                                    <td>
                                        <Button variant="link" onClick={e => setShowPreview(e, job, true)}>Preview</Button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                }
            </table>
        </Col>
        <JobListPreview jobDetails={previewDetails} jobName={previewJobName} setShowPreview={setShowPreview}></JobListPreview>
    </Row>
    )
}


const JobListPropTypes = {
    jobSearchResults: PropTypes.any,
    type: propTypes.string
};

JobListTable.propTypes = JobListPropTypes;

export default JobListTable;