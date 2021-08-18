import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import './footer.scss';

const Footer = () => (
	<Navbar bg="dark" variant="dark">
		<Container className="footer">
		<Navbar.Text>Copyright ©2021 Kong Healthcare</Navbar.Text>
		</Container>
	</Navbar>
);

export default Footer;
