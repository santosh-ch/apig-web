import React from 'react';
import { Switch, Route } from 'react-router-dom'
import Home from './components/home/home';
import JobDetail from './components/job-detail/job-detail';
import JobList from './components/job-list/job-list';

const Main = props => (<main>
		<Switch>
		<Route exact path='/' component={Home}/>
		<Route path='/list' component={JobList}/>
		<Route path='/detail' component={JobDetail}/>
		</Switch>
	</main>
);

const mainPropTypes = {
};

Main.propTypes = mainPropTypes;

export default Main;
