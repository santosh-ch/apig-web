import React from 'react';
import PropTypes from 'prop-types';
import styles from './header.scss';

const Header = props => (
	<div>This is a component called header.</div>
);

// todo: Unless you need to use lifecycle methods or local state,
// write your component in functional form as above and delete
// this section. 
// class header extends React.Component {
//   render() {
//     return <div>This is a component called header.</div>;
//   }
// }

const headerPropTypes = {
	// always use prop types!
};

Header.propTypes = headerPropTypes;

export default Header;
