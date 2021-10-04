import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Container, Row, Alert } from 'react-bootstrap';
import ChildrenJobDetail from './children-job-detail';
import DownstreamResponse from './downstream-response';
// import JobDetailHeader from './job-detail-header';
import Inputs from './inputs';
import Outputs from './outputs';
import ServiceResponse from './service-response';
import TimeLine from './timeline';
import PropTypes from 'prop-types';
import './job-detail.scss';
import Constraint from './constraint';


const JobDetail = (props) => {
	let jid = props?.match?.params?.id;
	const [key, setKey] = useState('home');
	const [data, setData] = useState({});
	const [constraints, setConstraints] = useState({})

	useEffect(() => {
		jid = "asp-infrastructure-20210812-164248-3370.json"; //need to remove later
		getJobDetail();
	}, [])

	function getJobDetail() {
		fetch('../api/' + jid).then(response => {
			return response.json().then((response) => {
				if (response != null && response.data != null) {
					setData(response.data);
					let constraints = {};
					if (response.data['constraints']) {
						var fetchedConstraintsList = response.data['constraints'];
						for (var i = 0; i < fetchedConstraintsList.length; i++) {
							var type = fetchedConstraintsList[i]['type'];
							var val = fetchedConstraintsList[i]['attributes'];
							constraints[type] = val;
						}
					}
					setConstraints(constraints);
				}
			})
		}).catch(
			function (err) {
				console.log(err)
			}
		);
	}

	function isValidJob() {
		// eslint-disable-next-line no-prototype-builtins
		if (data.hasOwnProperty("apig_jid")) {
			return true;
		} else {
			return false;
		}
	}


	return (
		<Container className="margin-top-10">
			{isValidJob() ?
				<Row>
					<Row>
						<h1 className="card-title"><a href={"/microfunctions/" + data['microfunction']}>{data['microfunction']}</a></h1>
						<h4 className="card-subtitle text-muted">{jid}</h4>
						<h6 className="text-muted">
							{data['status'].toLowerCase() == 'successful' ? <span className="text-success"><strong>{data['status']}</strong></span> :
								data['status'].toLowerCase() == 'started' ? <span className="text-info"><strong>{data['status']}</strong></span> :
									data['status'].toLowerCase() == 'pending' ? <span className="text-primary"><strong>{data['status']}</strong></span> :
										data['status'].toLowerCase() == 'failed' ? <span className="text-danger"><strong>{data['status']}</strong></span> :
											data['status'].toLowerCase() == 'orphaned' ? <span className="text-danger"><strong>{data['status']}</strong></span> :
												data['status'].toLowerCase() == 'terminated' ? <span className="text-warning"><strong>{data['status']}</strong></span> : ''}
						</h6>
					</Row>
					<Tabs
						id="controlled-tab"
						activeKey={key}
						onSelect={(k) => setKey(k)}
						className="mb-3">
						<Tab eventKey="1" title="Children Jobs" hidden={!data['apig-payload']['inputs']['upstream_jid']}>
							<ChildrenJobDetail data={data} />
						</Tab>

						<Tab eventKey="2" title="Inputs">
							<Inputs data={data} />
						</Tab>

						<Tab eventKey="3" title="Constraints">
							<Constraint constraints={constraints} data={data}/>
						</Tab>

						<Tab eventKey="4" title="Outputs">
							<Outputs data={data} />
						</Tab>

						<Tab eventKey="5" title="Service Response">
							<ServiceResponse data={data} />
						</Tab>

						<Tab eventKey="6" title="Downstream Response">
							<DownstreamResponse data={data} />
						</Tab>

						<Tab eventKey="7" title="TimeLine">
							<TimeLine data={data} />
						</Tab>
					</Tabs>
				</Row>
				: <Row>
					<Alert variant="warning">
						CANNOT FIND JOB
					</Alert>
				</Row>
			}
		</Container>
	);
}
const JobDetailPropTypes = {
	match: PropTypes.object
};

JobDetail.propTypes = JobDetailPropTypes;

export default JobDetail;
