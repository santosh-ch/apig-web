import React from 'react';
import { Row } from 'react-bootstrap';
import { toggleCollapse } from '../../common/utils'
import PropTypes from 'prop-types';

const Outputs = (props) => {
    return (
        <Row className="card-body">
            <h5 className="card-title">Outputs</h5>
            {props?.data['build_params'] ?
                <div>
                    <h6>Build Parameters</h6>
                    <ul className="list-group list-group-flush">
                        {props?.data['build_params'] && Object.keys(props?.data['build_params']).map(key =>
                            <li onClick={toggleCollapse} key={key} className="job-list-item list-group-item">
                                <p><strong>{key}</strong></p>
                                <div className="job-child-job-container">
                                    <div className="child-job-info-wrapper">
                                        <p> {props?.data['build_params'][key]}</p>
                                    </div>
                                </div>
                            </li>
                        )}
                    </ul>
                </div> : ''}
            {props?.data['registeredVars'] ?
                <div>
                    <h6>Registered Variables</h6>
                    {props?.data['registeredVars'] && Object.keys(props?.data['registeredVars']).map(key =>
                        <div key={key}>
                            <p><strong>{key}</strong></p>
                            <ul className="list-group list-group-flush">
                                {props?.data['registeredVars'][key] && Object.keys(props?.data['registeredVars'][key]).map(value =>
                                    <li onClick={toggleCollapse} key={value} className="job-list-item list-group-item">
                                        <p><strong>{value}</strong></p>
                                        <div className="job-child-job-container">
                                            <div className="child-job-info-wrapper">
                                                <p> {props?.data['registeredVars'][key][value]}</p>
                                            </div>
                                        </div>
                                    </li>
                                )}
                            </ul>
                        </div>
                    )}
                </div> : ''}
        </Row>
    );
}

const OutputsTypes = {
    data: PropTypes.object
};

Outputs.propTypes = OutputsTypes;

export default Outputs;