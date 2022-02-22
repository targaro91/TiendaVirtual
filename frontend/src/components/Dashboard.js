import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Navbar, Nav, NavDropdown, Modal, Button } from 'react-bootstrap';
import axios from "axios";
import './Dashboard.css';
import { ROL_PROCESADOR_DEPENDENCIA_PARTES, ROL_SUPERADMIN, ROL_SUPERVISOR_ENTIDAD, ROL_SUPERVISOR, ROL_PLAN, PARTE_PRODUCTIVO, PARTE_ENERGIA, PARTE_ENTREGAS, PARTE_COBERTURA, ROL_PROCESADOR_PARTES, ROL_PLAN_ENTIDAD, SERVER_API, MESSAGE_PASSWORD } from '../helpers/static';
import { PATTERN_PASS } from '../helpers/pattern';

import RLink from '../helpers/RLink';



class Dashboard extends Component {

	constructor(props) {
		super(props);

		this.state = {
			showModal: false,
			newpass: '',
			newpass1: '',
		}

		this.handleModalClose = this.handleModalClose.bind(this);
		this.handleModalShow = this.handleModalShow.bind(this);
		this.handleChangeNewPass = this.handleChangeNewPass.bind(this);
		this.handleChangeNewPass1 = this.handleChangeNewPass1.bind(this);

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(event) {
		event.preventDefault();
		this.setState({ fail: null, ok: null });

		const URL = '/usuario/' + this.props.profile.user;

		if (this.state.newpass && this.state.newpass != this.state.newpass1 && this.state.newpass.length > 0)
			this.setState({ fail: 'No coinciden las contraseñas' });
		else
			axios.post(SERVER_API + URL, { password: this.state.newpass })
				.then(res => {
					console.log("Respuesta de: " + SERVER_API + URL);
					console.log(res.data);
					if (res.data.OK) {
						this.setState({ ok: 'Contraseña cambiada' });

					}
					else if (res.data.ERROR)
						this.setState({ fail: res.data.ERROR });

					this.setState({ newpass: '', newpass1: '' });


				});




	}

	handleChangeNewPass(event) {
		this.setState({ newpass: event.target.value });
	}

	handleChangeNewPass1(event) {
		this.setState({ newpass1: event.target.value });
	}


	handleModalClose() {
		this.setState({ showModal: false });
	}
	handleModalShow() {
		this.setState({ showModal: true });
	}


	isActive(param) {
		if (param === this.props.section)
			return "btn btn-info"
		else
			return "nav-link link-inactive"


	}
	componentDidMount() {


	}

	loadData() {
	}

	render() {

		const menuStyle = {
			width: 'auto'
		}

		//console.log("History:")
		//console.log(this.props.history)
		//console.log("Match1 :")
		//console.log(this.props.match)
		//console.log("Subordinados: "+this.props.subordinados)
		const navLinks = () => {
			let arr = []

			const subLinksInformes = (clasificaciones) => {
				let comportamientos = []
				let informes = []
				comportamientos.push(<React.Fragment><NavDropdown.Divider /><p className="text-muted" style={{ padding: "0rem 1.5rem" }}>Comportamientos</p><NavDropdown.Divider /></React.Fragment>)
				informes.push(<React.Fragment><p className="text-muted" style={{ padding: "0rem 1.5rem" }}>Informes</p><NavDropdown.Divider /></React.Fragment>)
				clasificaciones.forEach(element => {


					informes.push(<NavDropdown.Item href={this.props.match.path + "/informe/" + element}>{element}</NavDropdown.Item>)


				})

				let arr = comportamientos.length > 1 ? informes.concat(comportamientos) : informes

				return arr

			}

			const subLinksInformesDependencias = (clasificaciones) => {

				let informes = []
				informes.push(<React.Fragment><p className="text-muted" style={{ padding: "0rem 1.5rem" }}>Informes</p><NavDropdown.Divider /></React.Fragment>)
				clasificaciones.forEach(element => {
					informes.push(<NavDropdown.Item href={this.props.match.path + "/informe/dependencias/" + element}>{element}</NavDropdown.Item>)

				})

				return informes

			}

			const subLinksPartes = (clasificaciones) => {
				let subLinks = []
				clasificaciones.forEach(element => {
					switch (element) {
						case PARTE_PRODUCTIVO:
						case PARTE_ENTREGAS:
						case PARTE_ENERGIA:
						case PARTE_COBERTURA:
							subLinks.push(<NavDropdown.Item href={this.props.match.path + "/parte/" + element}>{element}</NavDropdown.Item>)
							subLinks.push(<NavDropdown.Divider />)
							break
						default:
							subLinks.push(<NavDropdown.Item href={this.props.match.path + "/parte/" + element}>{element}</NavDropdown.Item>)
							subLinks.push(<NavDropdown.Divider />)
							break

					}

				})

				return subLinks

			}


			const subLinksCierreMensual = (clasificaciones) => {
				let subLinks = []
				clasificaciones.forEach(element => {
					switch (element) {
						case PARTE_PRODUCTIVO:
						case PARTE_ENTREGAS:
						case PARTE_ENERGIA:
							subLinks.push(<NavDropdown.Item href={this.props.match.path + "/parte/" + element + "?p=cierreMensual"}>{element}</NavDropdown.Item>)
							subLinks.push(<NavDropdown.Divider />)
							break

					}

				})

				return subLinks

			}

			const subLinksPlanes = (clasificaciones) => {
				let subLinks = []
				clasificaciones.forEach(element => {
					switch (element) {
						case PARTE_PRODUCTIVO:
						case PARTE_ENTREGAS:
						case PARTE_ENERGIA:
						case PARTE_COBERTURA:
							subLinks.push(<NavDropdown.Item href={this.props.match.path + "/plan/" + element}>{element}</NavDropdown.Item>)
							subLinks.push(<NavDropdown.Divider />)
							break
						default:
							subLinks.push(<NavDropdown.Item href={this.props.match.path + "/plan/" + element}>{element}</NavDropdown.Item>)
							subLinks.push(<NavDropdown.Divider />)
							break

					}

				})

				return subLinks

			}
			console.log("+++++++++++++++++++++++++++++++++++++")
			console.log(this.props.profile)

			switch (this.props.profile.rol) {
				case ROL_PROCESADOR_DEPENDENCIA_PARTES:
					arr.push(<NavDropdown alignRight title="Partes" id="basic-nav-dropdown">

						{subLinksPartes(this.props.profile.clasificacionesmodelo).map(e => (e))}
					</NavDropdown>)
					arr.push(<NavDropdown alignRight title="Estadísticas" id="basic-nav-dropdown">
						{subLinksInformes(this.props.profile.clasificacionesmodelo).map(e => (e))}
					</NavDropdown>)

					break;
				case ROL_PROCESADOR_PARTES:
					arr.push(<NavDropdown alignRight title="Partes" id="basic-nav-dropdown">

						{subLinksPartes(this.props.profile.clasificacionesmodelo).map(e => (e))}
					</NavDropdown>)
					arr.push(<NavDropdown alignRight title="Cierre Mes Anterior" id="basic-nav-dropdown">

						{subLinksCierreMensual(this.props.profile.clasificacionesmodelo).map(e => (e))}
					</NavDropdown>)
					arr.push(<NavDropdown alignRight title="Estadísticas" id="basic-nav-dropdown">
						{subLinksInformes(this.props.profile.clasificacionesmodelo).map(e => (e))}
					</NavDropdown>)
					if (this.props.profile.dependencias && this.props.profile.dependencias > 0)
						arr.push(<NavDropdown alignRight title="Dependencias" id="basic-nav-dropdown">
							{subLinksInformesDependencias(this.props.profile.clasificacionesmodelo).map(e => (e))}
						</NavDropdown>)
					break;
				case ROL_PLAN_ENTIDAD:
					arr.push(<NavDropdown alignRight title="Planes" id="basic-nav-dropdown">

						{subLinksPlanes(this.props.profile.clasificacionesmodelo).map(e => (e))}
					</NavDropdown>)
					break;
				case ROL_SUPERVISOR_ENTIDAD:
					arr.push(<NavDropdown alignRight title="Estadísticas" id="basic-nav-dropdown">
						{subLinksInformes(this.props.profile.clasificacionesmodelo).map(e => (e))}
					</NavDropdown>)
					if (this.props.profile.dependencias && this.props.profile.dependencias > 0)
						arr.push(<NavDropdown alignRight title="Dependencias" id="basic-nav-dropdown">
							{subLinksInformesDependencias(this.props.profile.clasificacionesmodelo).map(e => (e))}
						</NavDropdown>)
					break;
				case ROL_SUPERADMIN:
					arr.push(<Nav.Link href={RLink.empresas()}>Empresas</Nav.Link>)
					arr.push(<Nav.Link href={RLink.usuarios()}>Usuarios</Nav.Link>)
					arr.push(<Nav.Link href={RLink.modelos()}>Modelos</Nav.Link>)

					break;
				case ROL_PLAN:
					arr.push(<Nav.Link href={RLink.empresas()}>Empresas</Nav.Link>)
					break;
				// case ROL_SUPERVISOR:
				// 	arr.push(<NavDropdown title="Resumen Partes" id="basic-nav-dropdown">
				// 		<NavDropdown.Item href={this.props.match.path + "/partesproductivos/" + this.props.date.dia + "/" + this.props.date.mes + "/" + this.props.date.ano}>Productivo</NavDropdown.Item>
				// 		<NavDropdown.Item href={this.props.match.path + "/partesproductivosministro/" + this.props.date.dia + "/" + this.props.date.mes + "/" + this.props.date.ano}>Productivo Diario (Ministro)</NavDropdown.Item>
				// 		<NavDropdown.Divider />
				// 		<NavDropdown.Item href={this.props.match.path + "/partescoberturaharina/" + this.props.date.dia + "/" + this.props.date.mes + "/" + this.props.date.ano}>Cobertura (Harina)</NavDropdown.Item>
				// 		<NavDropdown.Divider />
				// 		<NavDropdown.Item href={this.props.match.path + "/partesentregas/" + this.props.date.dia + "/" + this.props.date.mes + "/" + this.props.date.ano}>Entregas</NavDropdown.Item>
				// 		<NavDropdown.Divider />
				// 		<NavDropdown.Item href={this.props.match.path + "/partesenergia/" + this.props.date.dia + "/" + this.props.date.mes + "/" + this.props.date.ano}>Energia</NavDropdown.Item>
				// 	</NavDropdown>)
				// 	break;

				default:
					break;
			}

			return arr
		}

		return (
			<React.Fragment>
				<Navbar style={{ position: 'sticky', top: '0' }} bg="light" expand="lg" fixed="top">
					<Navbar.Brand href="#home">DATADIN</Navbar.Brand>
					{this.props.profile && (this.props.profile.rol === ROL_PROCESADOR_PARTES || this.props.profile.rol === ROL_PLAN_ENTIDAD) && <Navbar.Text >{this.props.profile.entidad}</Navbar.Text>}
					{this.props.profile && this.props.profile.rol === ROL_PROCESADOR_DEPENDENCIA_PARTES && <Navbar.Text >{this.props.profile.entidad + " (" + this.props.profile.dependencia + ")"}</Navbar.Text>}
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="ml-auto navbar-right">
							{/* <Link className={this.isActive(SECTION_TAREAS)} to={{ pathname: '/tareas', state: RELOAD }}>Tareas</Link>
							<Link className={this.isActive(SECTION_CALENDAR)} to={{ pathname: '/calendar', state: RELOAD }}>Plan</Link>
							<Link className={this.isActive(SECTION_REPORTS)} to="/tareas">Reportes</Link>
							<Link className={this.isActive(SECTION_REPORTS)} to="/tareas">
								<i className="icofont-notification"></i> <span className="badge badge-warning">4</span>
							</Link> */}
							{navLinks().map(e => (e))}
							<NavDropdown alignRight title={<i className="icofont-user"></i>} id="basic-nav-dropdown">
								<NavDropdown.Header></NavDropdown.Header>
								<NavDropdown.Item onClick={this.handleModalShow}>Cambiar contraseña</NavDropdown.Item>
								<NavDropdown.Divider />
								<NavDropdown.Item onClick={(event) => {
									axios.get(SERVER_API + "/auth/logout")
										.then(res => {
											window.location = "/logout";
										});
								}}>Cerrar sesión</NavDropdown.Item>
							</NavDropdown>
						</Nav>
					</Navbar.Collapse>
				</Navbar>

				<Modal show={this.state.showModal}>
					<form onSubmit={this.handleSubmit} autocomplete="off">
						<Modal.Header >
							<Modal.Title>Cambio de contraseña</Modal.Title>
						</Modal.Header>

						<Modal.Body>
							{this.state.fail &&
								<div className="alert alert-danger" role="alert">
									{this.state.fail}
								</div>
							}
							{this.state.ok &&
								<div className="alert alert-success" role="alert">
									{this.state.ok}
								</div>
							}

							<div className="form-group">
								<input type="password" title={MESSAGE_PASSWORD} required={true} pattern={PATTERN_PASS} className="form-control" placeholder="Nueva contraseña" value={this.state.newpass} onChange={this.handleChangeNewPass} />
							</div>
							<div className="form-group">
								<input type="password" title={MESSAGE_PASSWORD} required={true} ref={this.newpass1Ref} pattern={PATTERN_PASS} className="form-control" placeholder="Confirmar contraseña" value={this.state.newpass1} onChange={this.handleChangeNewPass1} />
							</div>



						</Modal.Body>

						<Modal.Footer>
							<Button variant="secondary" onClick={this.handleModalClose}>Cerrar</Button>
							<Button type='submit' variant="primary" >Cambiar</Button>
						</Modal.Footer>
					</form>
				</Modal>

				<div>
					{this.props.hijo}
				</div>


			</React.Fragment>
		);

	}

}


const mapStateToProps = state => ({
	profile: state.profile,
	date: state.date

})


const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)





