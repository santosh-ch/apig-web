import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Breadcrumb, Button } from 'react-bootstrap';
import './job-list.scss';
import { useParams } from 'react-router-dom';
import { JobListType } from '../../common/constants';

const JobList = () => {
	let { type } = useParams();
	let [displayJobListType, setDisplayJobListType] = useState('');
	const [duration, setDuration] = useState('1');
	const [status, setStatus] = useState('successful');
	const [searchString, setSearchString] = useState('');
	const [jobSearchResults, setJobSearchResults] = useState([]);

	useEffect(() => {
		if (type.toString().toLowerCase().trim() === JobListType.Active.toLowerCase()) {
			setDisplayJobListType(JobListType.Active);
			getRunningJobs();
		} else if (type.toString().toLowerCase().trim() === JobListType.Pending.toLowerCase()) {
			setDisplayJobListType(JobListType.Pending);
			getRunningJobs();
		} else {
			setDisplayJobListType(JobListType.All);
		}
	}, [])

	function searchJobs() {
		// const filterUrl = "/api/v1/search/?days=" + duration + "&status=" + status;
		fetch('../api/search.json').then(response => {
			return response.json().then((response) => {
				if (response != null && response.data != null && response.data.length > 0) {
					if (searchString && searchString != '') {
						let filterData = response.data.filter(x => x.apig_jid.includes(searchString));
						setJobSearchResults(filterData);
					}
					else {
						setJobSearchResults(response.data);
					}
				}
			})
		}).catch(
			function (err) {
				console.log(err)
			}
		);
	}

	function getRunningJobs() {
		fetch('../api/running.json').then(response => {
			return response.json().then((response) => {
				if (response != null && response.result != null && response.result.jobs != null && response.result.jobs.length > 0) {
					setJobSearchResults(response.result.jobs);
				}
			})
		}).catch(
			function (err) {
				console.log(err)
			}
		)
	}

	return (
		<Container>
			<Breadcrumb className="margin-top-10">
				<Breadcrumb.Item href="/home">Home</Breadcrumb.Item>

				<Breadcrumb.Item active>{displayJobListType} Jobs</Breadcrumb.Item>
			</Breadcrumb>
			{displayJobListType === JobListType.All ?
				<Form>
					<Row>
						<Col>
							<h3>Find Jobs</h3>
						</Col>
					</Row>
					<Row>
						<Col>
							<Form.Select aria-label="duration" value={duration} onChange={(e) => { setDuration(e.currentTarget.value) }}>
								<option value="1">Today</option>
								<option value="2">Last 24 hours</option>
								<option value="7">Last 7 days</option>
								<option value="28">Last 28 days</option>
								<option value="90">Last 90 days</option>
							</Form.Select>
						</Col>
						<Col>
							<Form.Select aria-label="status" value={status} onChange={(e) => { setStatus(e.currentTarget.value) }}>
								<option value="successful">Successful</option>
								<option value="failed">Failed</option>
								<option value="started">Started</option>
								<option value="orphaned">Orphaned</option>
								<option value="terminated">Terminated</option>
								<option value="pending">Pending</option>
							</Form.Select>
						</Col>
						<Col>
							<Form.Control type="text" placeholder="Name Contains..." id="searchString" value={searchString} onChange={(e) => { setSearchString(e.currentTarget.value) }} />
						</Col>
						<Col>
							<Button variant="primary" type="button" onClick={searchJobs}>
								Submit
							</Button>
						</Col>
					</Row>
				</Form>
				: <h3>{displayJobListType} Jobs ({jobSearchResults?.length})</h3>}
			<Row>
				<Col>
					<table className="table table-responsive margin-top-10">
						<thead>
							<tr className={!jobSearchResults?.length > 0 ? 'hide' : ''} >
								<th>JID</th>
								<th>Created On</th>
								<th>Completed On</th>
							</tr>
						</thead>
						{!jobSearchResults?.length > 0 ?
							<tbody>
								0 Jobs Found
							</tbody> :
							<tbody>
								{jobSearchResults.map(job =>
									<tr key={job.apig_jid}>
										<td><a href={"/details/" + job.apig_jid}>{job.apig_jid}</a></td>
										<td>{job.job_created_timestamp}</td>
										<td>{job.job_finished_timestamp}</td>
									</tr>
								)}
							</tbody>
						}
					</table>
				</Col>
			</Row>
		</Container>
	);
};

export default JobList;
