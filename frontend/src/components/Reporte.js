import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';

class Reporte extends Component {
	render() {
		const { match } = this.props;
		console.log(match.params);
		return(
			<div className="container">
				<h1>Reporte</h1>
	
			</div>
		);
	}
	

}
export default withRouter(Reporte);