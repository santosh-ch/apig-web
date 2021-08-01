import React from 'react';
import PropTypes from 'prop-types';
import styles from './micro-function.scss';

const micro-function = props => (
	<div>This is a component called micro-function.</div>
);

// todo: Unless you need to use lifecycle methods or local state,
// write your component in functional form as above and delete
// this section. 
// class micro-function extends React.Component {
//   render() {
//     return <div>This is a component called micro-function.</div>;
//   }
// }

const micro-functionPropTypes = {
	// always use prop types!
};

micro-function.propTypes = micro-functionPropTypes;

export default micro-function;
