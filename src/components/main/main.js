import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import Home from '../home';
import JobDetail from '../job-detail';
import JobList from '../job-list';

const Main = () => (
	<main>
		<Switch>
			<Route exact path='/'>
				<Redirect to="/home" />
			</Route>
			<Route path='/home' component={Home} />
			<Route path='/list' component={lists} />
			<Route path='/detail' component={JobDetail} />
		</Switch>
	</main>
);
const lists = ({ match }) => (
	<div>
		<Route path={`${match.path}/:type`} component={JobList} />
	</div>
)
export default Main;
