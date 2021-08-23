import React, { useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import { JobListType } from '../../common/constants';
import JobList from '../job-list';

const HomeTabs = () => {
	const [key, setKey] = useState('home');
	return (
		<Tabs
			id="controlled-tab-example"
			activeKey={key}
			onSelect={(k) => setKey(k)}
			className="mb-3">
			<Tab eventKey={JobListType.Active} title={JobListType.Active}>
				<JobList type={JobListType.Active} />
			</Tab>
			
			<Tab eventKey={JobListType.Pending} title={JobListType.Pending}>
				<JobList type={JobListType.Pending}/>
			</Tab>

			<Tab eventKey={JobListType.All} title={JobListType.All}>
				<JobList type={JobListType.All}/>
			</Tab>
		</Tabs>
	);
}
export default HomeTabs;
