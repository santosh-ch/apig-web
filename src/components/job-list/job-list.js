import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Breadcrumb, Button } from 'react-bootstrap';
import './job-list.scss';
import { useParams } from 'react-router-dom';
import data from '../../api/search.json';

const JobList = () => {
	let { type } = useParams();
	const [duration, setDuration] = useState('1');
	const [status, setStatus] = useState('successful');
	const [searchString, setSearchString] = useState('');
	const [jobSearchResults, setJobSearchResults] = useState({ information: { jobs: [] } })

	useEffect(() => {
		console.log(data);
		let d = { information: { jobs: data } };
		setJobSearchResults(d);
	}, [])
	
	function searchJobs() {
		// const filterUrl = "/api/v1/search/?days=" + duration + "&status=" + status;
		fetch('../../api/search.json', {
			"headers": {
				"content-type": "application/json;charset=UTF-8",
			}
		}).then(response => {
			return response.json().then((response) => {
				let data = { information: { jobs: response } };
				setJobSearchResults(data);
			})
		}).catch(
			function (err) {
				console.log(err, ' error')
			}
		)
	}

	return (
		<Container>
			<Breadcrumb>
				<Breadcrumb.Item href="/home">HOME</Breadcrumb.Item>

				<Breadcrumb.Item active>{type.toString().toUpperCase()} JOBS</Breadcrumb.Item>
			</Breadcrumb>
			<Form>
				<Row>
					<Col><h3>Find Jobs</h3></Col>
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
			<Row>
				<Col>
					<table className="table table-responsive">
						<thead>
							<tr>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{!jobSearchResults.information.jobs ? '0 Jobs Found' : ''}
						</tbody>
						<tbody>
							{jobSearchResults.information?.jobs?.map(job =>
								<tr key={job.apig_jid}>
									<td><a href={"/details/" + job.apig_jid}>{job.apig_jid}</a></td>
								</tr>
							)}
						</tbody>
					</table>
				</Col>
			</Row>
		</Container>
	);
};

export default JobList;
