import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

const InputsEditModal = (props) => {

    function addInput() {
        return (<div className="edit-input-new">
            <label>Input: </label>
            <input className="edit-input-new-key" style={{ marginLeft: '8px', paddingLeft: '8px' }} type="text" placeholder="Input key" />
            <label style={{ marginLeft: '16px' }}>Value: </label>
            <input className="edit-input-new-val" style={{ marginLeft: '8px', paddingLeft: '8px' }} type=" text" placeholder="Input value" />
            <i className="material-icons" style={{ cursor: 'pointer' }} onClick={removeEditInput}>delete</i>
        </div>);
    }

    var removeEditInput = function (e) {
        e.target.parent().remove();
    }
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Edit Job
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h6 className="card-subtitle text-muted">{props?.data?.jid}</h6>

                <p className="text-info">{props?.data['orig-req-path']}</p>

                <div style={{ marginBottom: '24px' }} className="form-group">
                    <p><strong>Edit Inputs</strong></p>
                    <div id="edit-input-container">
                        {props?.data['apig-payload']['inputs'] && Object.keys(props?.data['apig-payload']['inputs']).map( key =>(
                            <div className="edit-input-new" key={key}>
                            <label>Input: </label>
                            <input id={'job-input-key' + key.trim()} value={key} className="edit-input-new-key" style={{ marginLeft: '8px', paddingLeft: '8px' }} type="text" />
                            <label style={{ marginLeft: '16px' }}>Value: </label>
                            <input id={"job-input-value-" + key.trim()} value={ props?.data['apig-payload']['inputs'][key]} className="edit-input-new-val" style={{ marginLeft: '8px', paddingLeft: '8px' }} type="text" />
                            <Button variant="primary" style={{ marginLeft: '16px' }} onClick={removeEditInput}>delete</Button>
                        </div>
                        ))}
                    </div>
                </div>

                <span id="edit-add-input-btn" className="btn btn-primary"
                    style={{ width: '100%', marginBottom: '24px' }} onClick={() => addInput}>Add Input</span>
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