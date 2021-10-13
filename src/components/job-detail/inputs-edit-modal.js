import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

const InputsEditModal = (props) => {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Modal heading
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5 className="card-title">Edit Job</h5>
                <h6 className="card-subtitle text-muted">{props?.data?.jid}</h6>

                <p className="text-info">{props?.data['orig-req-path']}</p>

                <div style={{marginBottom: '24px'}} className="form-group">
                    <p><strong>Edit Inputs</strong></p>
                    <div id="edit-input-container">
                    </div>
                </div>

                <span id="edit-add-input-btn" className="btn btn-primary" style={{width: '100%', marginBottom: '24px'}}>Add Input</span>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => { props.onHide; }}>Save Changes</Button>
                <Button variant="primary" onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}


const InputsEditModalTypes = {
    data: PropTypes.object,
    onHide: PropTypes.func
};

InputsEditModal.propTypes = InputsEditModalTypes;

export default InputsEditModal;