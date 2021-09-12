import React, { useEffect, useState } from 'react';
import { Container, Alert } from 'react-bootstrap';
import ReviewModeList from "./review-mode-list";
import './settings.scss';

const Settings = () => {
	const [processLock, setProcessLock] = useState(false)

	useEffect(() => {
		fetchProcessLockState()
	}, [])

	function fetchProcessLockState() {
		// fetch('/api/v1/getprocesslockstate').then(response => {
		fetch('../api/processing.json').then(response => {
			return response.json().then((response) => {
				if (response != null && response.result != null && response.result.unlocked != null) {
					setProcessLock(response.result.unlocked.unlocked);
				}
			})
		}).catch(
			function (err) {
				console.log('error fetching process lock ' + err)
			}
		)
	}

	function toggleProcessing() {
		var url = processLock ? '/api/v1/jobs/lockprocessing' : '/api/v1/jobs/unlockprocessing';
		fetch(url).then(() => fetchProcessLockState());
	}

	return (
		<div>
			<Container>
				{processLock ?
					<Alert variant="info" className="margin-top-50">
						Jobs are processing <Alert.Link href="#" onClick={toggleProcessing}>(Click to lock processing)</Alert.Link>
					</Alert>
					:
					<Alert variant="info" className="margin-top-50">
						Jobs are not processing <Alert.Link href="#" onClick={toggleProcessing}>(click to unlock processing)</Alert.Link>
					</Alert>}
				<ReviewModeList></ReviewModeList>
			</Container>
		</div>
	);
}

export default Settings;
