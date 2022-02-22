import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Exibhidor from '../Exibhidor';
import FormProducto from '../producto/FormProducto';
import Header from './Header';

export default function Menu(props) {



	return <React.Fragment>
		<Header />
		<Header hiden={true}/>

		<BrowserRouter >
					<Switch>
						<Route exact path="/" component={Exibhidor} />
						<Route exact path="/producto/new" component={FormProducto} />
					</Switch>





				</BrowserRouter>
		
		{/* {props.hijo} */}
	</React.Fragment>
}