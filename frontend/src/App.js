import React, { Component } from 'react';

import { Provider } from 'react-redux'
import store from './store'

//import logo from './logo.svg';
import "bootstrap-icons/font/bootstrap-icons.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';
import './main.css'
import { initAxiosInterceptors } from './helpers/auth-helpers'
import AppContainer from './components/AppContainer';


//inicializar Axios
initAxiosInterceptors()
//

class App extends Component {

	
	render() {
		return(
			<Provider store={store}>
				<AppContainer />
			</Provider>
			);
	}

}


export default App;
