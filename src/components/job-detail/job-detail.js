import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Container, Row, Alert } from 'react-bootstrap';
import ChildrenJobDetail from './children-job-detail';
import DownstreamResponse from './downstream-response';
import Inputs from './inputs';
import Outputs from './outputs';
import ServiceResponse from './service-response';
import TimeLine from './timeline';
import PropTypes from 'prop-types';


const JobDetail = (props) => {
	let jid = props?.match?.params?.id;
	const [key, setKey] = useState('home');
	const [data, setData] = useState({});
	const [constraints, setConstraints] = useState({})

	useEffect(() => {
		jid = "asp-infrastructure-20210812-164248-3370"; //need to remove later
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
							<Outputs constraints={constraints} />
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
