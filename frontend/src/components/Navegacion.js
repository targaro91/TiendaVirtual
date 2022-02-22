import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';

class Navegacion extends Component {
	render() {
		const { history} = this.props;
		return(
			<React.Fragment>
				<div className="container">
					<h1>Principal</h1>
				</div>

				<button 
					onClick={() => history.push('/login')}
				>
					Autentificarse
				</button>
			</React.Fragment>
			
		);
	}
	

}
export default withRouter(Navegacion);