import React from 'react';
import { Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { jsonify } from '../../common/utils';
import InputsEditModal from './inputs-edit-modal';

const Inputs = (props) => {
    const [modalShow, setModalShow] = React.useState(false);
     function canEdit() {
        // Returns true if job can be edited - SHOULD BE MOVED TO SERVER SIDE LOGIC
        var NON_EDITABLE_STATUSES = ["started", "successful"];
        if (NON_EDITABLE_STATUSES.includes(props?.data.status)) {
          return false;
        } else {
          return true;
        }
      }
    return (
        <Row className="card-body">
            <h5 className="card-title">Inputs</h5>
            <pre className="code"><code id="job-inputs-text">{jsonify(props?.data['apig-payload']['inputs'])}</code></pre>
            { canEdit() ? <button type="button" className="btn btn-secondary " id="editBtn" onClick={() => setModalShow(true)}>
                <small>EDIT</small>
            </button> : ''}
            <InputsEditModal data={props?.data} show={modalShow} onHide={() => setModalShow(false)}></InputsEditModal>
        </Row>
    );
}

const InputsTypes = {
    data: PropTypes.object
};

Inputs.propTypes = InputsTypes;

export default Inputs;