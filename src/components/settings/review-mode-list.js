import React, { useEffect, useState } from 'react';
import { Container, Row, Form, Card } from 'react-bootstrap';
import './settings.scss';

const ReviewModeList = () => {
    const [reviewModeList, setReviewModeList] = useState([])
    const [jobName, setJobName] = useState('')

    useEffect(() => {
        fetchReviewModeList()
    }, [])

    function fetchReviewModeList() {
        // fetch('/api/v1/getreviewmodelist').then(response => {
        fetch('../api/reviewmodelist.json').then(response => {
            return response.json().then((response) => {
                if (response != null && response.result != null && response.result.length > 0) {
                    setReviewModeList(response.result);
                }
            })
        }).catch(
            function (err) {
                console.log(err)
            }
        )
    }

    function addToReviewModeList() {
        let url = '/api/v1/jobs/addtoreviewmodelist/' + jobName;
        fetch(url).then(() => {
            fetchReviewModeList();
            setJobName('');
        });
    }

    function removeFromReviewModeList(mf) {
        let url = '/api/v1/jobs/removefromreviewmodelist/' + mf;
        fetch(url).then(() => {
            fetchReviewModeList();
            setJobName('');
        });
      }

    return (<Container>
        <Row className="margin-top-50">
            <Card bg="light">
                <Card.Body>
                    <Card.Title>Review Mode List </Card.Title>
                    <Form onSubmit={addToReviewModeList}>
                        <div className="form-group">
                            <input type="text" className="form-control" id="mfReviewModeAddition" onChange={(e) => setJobName(e.target.value)} placeholder="Add micro function to review mode..." />
                        </div>
                        {reviewModeList?.length > 0 ?
                            <div className="review-mode-mfs-container">
                                {reviewModeList?.map(row =>
                                    <p className="review-mode-mf-box" key={row}>{row}
                                        <span className="rem-mf-span" onClick={() => removeFromReviewModeList(row)}>x</span>
                                    </p>
                                )}
                            </div>
                            : ''}
                    </Form>
                </Card.Body>
            </Card>
        </Row>
    </Container>)
};

export default ReviewModeList;
