import React from 'react';
import PropTypes from 'prop-types';
import styles from './job-detail.scss';

const JobDetail = props => (
	<div>This is a component called job-detail.</div>
);

// todo: Unless you need to use lifecycle methods or local state,
// write your component in functional form as above and delete
// this section. 
// class job-detail extends React.Component {
//   render() {
//     return <div>This is a component called job-detail.</div>;
//   }
// }

const jobDetailPropTypes = {
	// always use prop types!
};

JobDetail.propTypes = jobDetailPropTypes;

export default JobDetail;
