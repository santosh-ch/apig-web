import React from 'react';
import { Container, Alert } from 'react-bootstrap';
import ReviewModeList from "./review-mode-list";
import './settings.scss';

const Settings = () => (
	<div>
		<Container>
			<Alert variant="info" className="margin-top-50">
				Jobs are processing <Alert.Link href="#">(Click to lock processing)</Alert.Link>
			</Alert>
			<ReviewModeList></ReviewModeList> 
		</Container>
	</div>
);

export default Settings;
