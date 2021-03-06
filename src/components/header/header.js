import React from 'react';
import { useLocation } from 'react-router-dom'
import { Navbar, Container, Nav, InputGroup, Form } from 'react-bootstrap'
import { JobListType } from '../../common/constants';
import './header.scss';

const Header = () => {
	const location = useLocation();
	const key = location.pathname;
	return (
		<div>
			<Navbar bg="dark" variant="dark">
				<Container>
					<Navbar.Brand href={"/list/" + JobListType.Active.toLowerCase()}>
						API Gateway Administration
					</Navbar.Brand>
					{/* <Nav className="me-auto justify-content-end">
						<Nav.Link href={"/list/" + JobListType.Active.toLowerCase()} >
							{JobListType.Active} Jobs
						</Nav.Link>
						<Nav.Link href={"/list/" + JobListType.Pending.toLowerCase()}>
							{JobListType.Pending} Jobs
						</Nav.Link>
						<Nav.Link href={"/list/" + JobListType.All.toLowerCase()}>
							{JobListType.All} Jobs
						</Nav.Link>
						<Nav.Link href="/settings">
							Settings
						</Nav.Link>
					</Nav> */}
					<Nav fill variant="pills" activeKey={key}>
						<Nav.Item>
							<Nav.Link href={"/list/" + JobListType.Active.toLowerCase()} eventKey={"/list/" + JobListType.Active.toLowerCase()}>
								{JobListType.Active} Jobs
							</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							<Nav.Link href={"/list/" + JobListType.Pending.toLowerCase()} eventKey={"/list/" + JobListType.Pending.toLowerCase()}>
								{JobListType.Pending} Jobs
							</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							<Nav.Link href={"/list/" + JobListType.All.toLowerCase()} eventKey={"/list/" + JobListType.All.toLowerCase()}>
								{JobListType.All} Jobs
							</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							<Nav.Link href="/settings" eventKey="/settings">
								Settings
							</Nav.Link>
						</Nav.Item>
						<Nav.Item className="search-container">
							<InputGroup>
								<Form.Control type="text" placeholder="Search with exact JID..."/>
								<InputGroup.Text><i className="fa fa-search"></i></InputGroup.Text>
							</InputGroup>
						</Nav.Item>
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
}

export default Header;
