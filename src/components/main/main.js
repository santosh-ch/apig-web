import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import HomeTabs from '../home-tabs';
import JobDetail from '../job-detail';
import JobList from '../job-list';
import Settings from '../settings';

const Main = () => (
	<main>
		<Switch>
			<Route exact path='/'>
				<Redirect to="/list/active" />
			</Route>
			<Route path='/list' component={lists} />
			<Route path='/detail' component={JobDetail} />
			<Route path='/settings' component={Settings} />
			<Route path='/hometabs' component={HomeTabs} />
			<Route path="**"><Redirect to="/list/active" /></Route>
		</Switch>
	</main>
);
const lists = ({ match }) => (
	<div>
		<Route path={`${match.path}/:type`} component={JobList} />
	</div>
)
export default Main;
