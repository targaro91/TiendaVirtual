import React, { Component } from 'react';
import { connect } from 'react-redux'

class RowTarea extends Component {
	constructor(props) {
		super(props);
		this.state = { nombre: '', fecha: '' };

		this.handleChangeNombre = this.handleChangeNombre.bind(this);
		this.handleChangeFecha = this.handleChangeFecha.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChangeNombre(event) {
		this.setState({ nombre: event.target.value });
	}


	handleChangeFecha(event) {
		this.setState({ fecha: event.target.value });
	}

	handleSubmit(event) {
		event.preventDefault();
		this.props.agregarTarea(this.state);
	}

	render() {
		return (
			<tr>
				<td >{this.props.tarea}</td>
				<td >{this.props.responsable}</td>
				<td>{this.props.clasificacion}</td>
				<td>{this.props.etiqueta}</td>
				<td>{this.props.cumplimiento}</td>
				<td>{this.props.cierre}</td>

			</tr>


		);
	}


}

const mapStateToProps = state => ({
	tareas: state.tareas
});

const mapDispatchToProps = dispatch => ({
	agregarTarea(tarea) {
		dispatch({
			type: 'AGREGAR_TAREA', tareas: { id: 31, nombre: tarea.nombre, fecha: tarea.fecha }
		})
	}
});
export default connect(mapStateToProps, mapDispatchToProps)(RowTarea);