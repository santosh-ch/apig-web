import React from 'react';
import { Nav, Navbar, Container } from 'react-bootstrap'

const Header = () => (
	<div>
		<Navbar bg="dark" variant="dark">
			<Container>
				<Navbar.Brand href="/home">API Gateway Administration</Navbar.Brand>
				<Nav className="me-auto justify-content-end">
					<Nav.Link href="/list/all">All Jobs</Nav.Link>
					<Nav.Link href="/list/active">Active Jobs</Nav.Link>
					<Nav.Link href="/list/pending">Pending Jobs</Nav.Link>
				</Nav>
				<Navbar.Collapse className="justify-content-end">
					<Navbar.Text>
						User Name (Admin)
					</Navbar.Text>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	</div>
);

export default Header;
