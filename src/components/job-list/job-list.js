import React from 'react';
import {useParams} from 'react-router-dom';

const JobList = () => {
	let { type }  = useParams();
	return (
		<div>This is a component called job-list for {type} </div>
	);
};

export default JobList;
