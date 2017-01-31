'use strict';
import React from 'react';
import { Link, withRouter, hashHistory } from 'react-router';
import SessionFeedContainer from './session_feed_container';
import { Component, View } from 'react-native';

class SessionForm extends Component {
	constructor(props) {
		super(props);
		this.state = { username: "", password: "" };
		this.handleSubmit = this.handleSubmit.bind(this);
		this.guestLogin = this.guestLogin.bind(this);
		this.demoButton = this.demoButton.bind(this);
	}

	componentDidUpdate() {
		this.redirectIfLoggedIn();
	}

	redirectIfLoggedIn() {
		if (this.props.loggedIn) {
			this.props.router.replace("/posts");
		}
	}

	update(field) {
		return e => this.setState({
			[field]: e.currentTarget.value
		});
	}

	handleSubmit(e) {
		e.preventDefault();
		const user = this.state;
		this.props.processForm({user});
		this.props.router.replace("/posts");
	}

	navLink() {
		if (this.props.formType === "login") {
			return <Link to="/signup" className="session">sign up instead</Link>;
		} else {
			return <Link to="/login" className="session">log in instead</Link>;
		}
	}


	guestLogin(e) {
		e.preventDefault();
		const user = { username: 'Guest', password: '123456'};
		this.setState({ username: 'Guest', password: '123456'});
		this.props.processForm({user});

	}

	demoButton(){
		return (
			<button className="button" onClick={this.guestLogin} value="Demo">Guest</button>
		);
	}

	renderErrors() {

		return(
			<ul>
				{this.props.errors.map((error, i) => (
					<li key={`error-${i}`}>
						{error}
					</li>
				))}
			</ul>
		);
	}

	render() {
		return (
		<view>
			<div className="login-form-container">
				<form onSubmit={this.handleSubmit} className="login-form-box">

					<h3 className="create-title">Please {this.props.formType} or {this.navLink()}</h3>
					{this.renderErrors()}
					<div className="login-form">
						<br/>
						<label> Username:
							<input type="text"
								value={this.state.username}
								onChange={this.update("username")}
								className="login-input" />
						</label>
						<br/>
						<label> Password:
							<input type="password"
								value={this.state.password}
								onChange={this.update("password")}
								className="login-input" />
						</label>
						<br/>
						<input className="button" type="submit" value="Submit" />
						<br/>
						 {this.props.formType === "login" ? this.demoButton() : "" }
					</div>
				</form>
			</div>
			<footer className="footer">
				 <h1 className="footer-text">Trending Now:
					 <div>

					 </div>
				 </h1>
				<SessionFeedContainer />

			</footer>
		</view>
		);
	}

}

module.exports = SessionForm;

export default withRouter(SessionForm);