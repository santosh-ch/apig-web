import React from 'react';
import PropTypes from 'prop-types';
import styles from './home.scss';

const home = props => (
	<div>
		<Card style={{ width: '18rem' }}>
		<Card.Body>
			<Card.Title>All Jobs</Card.Title>
			<Card.Subtitle className="mb-2 text-muted">List of all Jobs</Card.Subtitle>
				<Card.Link href="#">All Jobs</Card.Link>
			</Card.Body>
		</Card>
		<Card style={{ width: '18rem' }}>
		<Card.Body>
			<Card.Title>Pending Jobs</Card.Title>
			<Card.Subtitle className="mb-2 text-muted">List of Pending Jobs</Card.Subtitle>
				<Card.Link href="#">Pending Jobs</Card.Link>
			</Card.Body>
		</Card>
		<Card style={{ width: '18rem' }}>
		<Card.Body>
			<Card.Title>Active Jobs</Card.Title>
			<Card.Subtitle className="mb-2 text-muted">List of Active Jobs</Card.Subtitle>
				<Card.Link href="#">Active Jobs</Card.Link>
			</Card.Body>
		</Card>
	</div>
);

// todo: Unless you need to use lifecycle methods or local state,
// write your component in functional form as above and delete
// this section. 
// class home extends React.Component {
//   render() {
//     return <div>This is a component called home.</div>;
//   }
// }

const homePropTypes = {
	// always use prop types!
};

home.propTypes = homePropTypes;

export default home;
