import React from 'react';
import {Row} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { jsonify } from '../../common/utils';

const Inputs = (props) => {
    return (
        <Row className="card-body">
            <h5 className="card-title">Inputs</h5>
            <pre className="code"><code id="job-inputs-text">{jsonify(props?.data['apig-payload']['inputs'])}</code></pre>
            {/* <button type="button" className="btn btn-secondary " id="editBtn" ng-if="canEdit()">
                <small>EDIT</small>
            </button> */}
        </Row>

    );
}

const InputsTypes = {
    data: PropTypes.object
};

Inputs.propTypes = InputsTypes;

export default Inputs;