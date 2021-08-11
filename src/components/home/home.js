import React from 'react';
import { Container, Row, Card, Col,Alert } from 'react-bootstrap';
import ReviewModeList from "./review-mode-list";
import './home.scss';

const Home = () => (
	<div>
		<Container>
			<Alert variant="info" className="margin-top-50">
				Jobs are processing <Alert.Link href="#">(Click to lock processing)</Alert.Link>
			</Alert>
			<Row className="margin-top-100">
				<Col className="d-flex justify-content-center">
					<Card bg="light" style={{ width: '18rem' }}>
						<Card.Body>
							<Card.Title>All Jobs</Card.Title>
							<Card.Subtitle className="mb-2 text-muted">List of All Jobs with Search</Card.Subtitle>
							<Card.Link className="btn btn-primary" href="/list/all">All Jobs</Card.Link>
						</Card.Body>
					</Card>
				</Col>
				<Col className="d-flex justify-content-center">
					<Card bg="light" style={{ width: '18rem' }}>
						<Card.Body>
							<Card.Title>Active Jobs</Card.Title>
							<Card.Subtitle className="mb-2 text-muted">List of Active Jobs with Preview</Card.Subtitle>
							<Card.Link className="btn btn-primary" href="/list/active">Active Jobs</Card.Link>
						</Card.Body>
					</Card>
				</Col>
				<Col className="d-flex justify-content-center">
					<Card bg="light" style={{ width: '18rem' }}>
						<Card.Body>
							<Card.Title>Pending Jobs</Card.Title>
							<Card.Subtitle className="mb-2 text-muted">List of Pending Jobs with Preview</Card.Subtitle>
							<Card.Link className="btn btn-primary" href="/list/pending">Pending Jobs</Card.Link>
						</Card.Body>
					</Card>
				</Col>
			</Row>
			<ReviewModeList></ReviewModeList>
		</Container>
	</div>
);

export default Home;
