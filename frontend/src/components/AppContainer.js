import React, { Component } from 'react';
import { connect } from 'react-redux'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';


import { isAuthenticated } from '../helpers/auth';
import { getProfile, getCuadromandoUrl } from '../actions/actions';
import Menu from './menu/Menu';
import FormProducto from './producto/FormProducto';
import Exibhidor from './Exibhidor';

class AppContainer extends Component {





	render() {

		//console.log("Profile AppConatiner ")
		//console.log(this.props.profile)

		return (
			<React.Fragment>
				<BrowserRouter >
					<Switch>
						<Route path="/" component={Menu} />
						{/* <Route exact path="/producto/new" component={FormProducto} /> */}
					</Switch>





				</BrowserRouter>
			</React.Fragment>

		);
	}

}

const mapStateToProps = state => ({
	profile: state.profile,
	cuadromandoUrl: state.cuadromandoUrl

})

export default connect(mapStateToProps, { getProfile, getCuadromandoUrl })(AppContainer)