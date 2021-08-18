import React, { useEffect, useState } from 'react';
import { Container, Row, Form, Card } from 'react-bootstrap';
import './home.scss';

const ReviewModeList = () => {
    const [reviewModeList, setReviewModeList] = useState([])

    useEffect(() => {
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
    }, [])

    return (<Container>
        <Row className="margin-top-100 margin-bottom-50">
            <Card bg="light">
                <Card.Body>
                    <Card.Title>Review Mode List </Card.Title>
                    <Form>

                        <div className="form-group">
                            <input type="text" className="form-control" id="mfReviewModeAddition" placeholder="Add micro function to review mode..." />
                        </div>
                        {reviewModeList?.length > 0 ?
                            <div className="review-mode-mfs-container">
                                {reviewModeList?.map(row =>
                                    <p className="review-mode-mf-box" key={row}>{row}<span className="rem-mf-span" ng-click="removeFromReviewModeList(item)">x</span></p>
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
