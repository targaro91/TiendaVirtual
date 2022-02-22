import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getTareas } from '../actions/actions'


class Tareas extends Component {

	constructor(props) {
		super(props);
		this.state = {loadUser: false};
	}

	componentDidUpdate() {
		if(this.props.user && !this.state.loadUser) {

			this.setState({loadUser: true});
			this.props.getTareas()
		}
	}

	render() {
		
		let user=this.props.user;
		
		return(<div className="container">
		<h1>Tareas</h1>

		{
			this.props.tareas.map( t => (
				<article className="tarea" key={t.id}>
					<h5>
						{t.nombre+" "+t.id}
					</h5>
				</article>

			))
		}

	</div>);
	}
}

const mapStateToProps = state => ({
	tareas: state.tareas,
	user: state.profile.user
})

export default connect(mapStateToProps, { getTareas }) (Tareas);