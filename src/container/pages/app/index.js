import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "../login";
import Register from "../register";
import { Provider } from 'react-redux';
import { store } from "../../../config/redux";
import Dashboard from '../dashboard';

function App() {
	return (
		<Provider store={store}>
			<Router>
				<Route path="/dashboard" component={Dashboard} />
				<Route path="/register" component={Register} />
				<Route path="/" exact component={Login} />
			</Router>
		</Provider>
	);
}

export default App;
