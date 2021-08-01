import React from 'react';
import PropTypes from 'prop-types';
import styles from './job-list.scss';

const JobList = props => (
	<div>This is a component called job-list.</div>
);

// todo: Unless you need to use lifecycle methods or local state,
// write your component in functional form as above and delete
// this section. 
// class job-list extends React.Component {
//   render() {
//     return <div>This is a component called job-list.</div>;
//   }
// }

const jobListPropTypes = {
	// always use prop types!
};

jobList.propTypes = jobListPropTypes;

export default JobList;
