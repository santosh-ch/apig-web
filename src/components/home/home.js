import React from 'react';
import { Container, Row, Card, Col } from 'react-bootstrap';
import './home.scss';

const Home = () => (
	<div>
		<Container>
			<Row className="margin-top-150">
				<Col>
					<Card bg="light" style={{ width: '18rem' }}>
						<Card.Body>
							<Card.Title>All Jobs</Card.Title>
							<Card.Subtitle className="mb-2 text-muted">List of All Jobs with Search</Card.Subtitle>
							<Card.Link className="btn btn-primary" href="/list/all">All Jobs</Card.Link>
						</Card.Body>
					</Card>
				</Col>
				<Col>
					<Card bg="light" style={{ width: '18rem' }}>
						<Card.Body>
							<Card.Title>Pending Jobs</Card.Title>
							<Card.Subtitle className="mb-2 text-muted">List of Pending Jobs with Preview</Card.Subtitle>
							<Card.Link className="btn btn-primary" href="/list/pending">Pending Jobs</Card.Link>
						</Card.Body>
					</Card>
				</Col>
				<Col>
					<Card bg="light" style={{ width: '18rem' }}>
						<Card.Body>
							<Card.Title>Active Jobs</Card.Title>
							<Card.Subtitle className="mb-2 text-muted">List of Active Jobs with Preview</Card.Subtitle>
							<Card.Link className="btn btn-primary" href="/list/active">Active Jobs</Card.Link>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	</div>
);

export default Home;
