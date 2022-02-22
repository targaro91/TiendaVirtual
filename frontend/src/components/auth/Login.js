import React, { Component } from 'react';
import axios from "axios";
import { connect } from 'react-redux';
import { setToken } from '../../helpers/auth-helpers';
import { ROL_OPTEI, ROL_OPERADOR, ROL_PRODUCTORES, ROL_SUPERVISOR, ROL_SUPERVISOR_ENTIDAD, SERVER_API, MESSAGE_PASSWORD, ROL_AGENDA } from '../../helpers/static';
import {  PATTERN_PASS } from '../../helpers/pattern';
import queryString from 'query-string';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = { user: '', pass: '', fakePass: '', changepass: false, fail: null};
		this.handleChangeUser = this.handleChangeUser.bind(this);
		this.handleChangePass = this.handleChangePass.bind(this);
		
		this.handleChangeNewPass = this.handleChangeNewPass.bind(this);
		this.handleChangeNewPass1 = this.handleChangeNewPass1.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);


	}

	handleChangeUser(event) {
		this.setState({ user: event.target.value });
	}

	handleChangePass(event) {
		
		console.log(event.target.value);
		this.setState({ pass: event.target.value });
	}

	handleChangeNewPass(event) {
		this.setState({ newpass: event.target.value });
	}

	handleChangeNewPass1(event) {
		this.setState({ newpass1: event.target.value });
	}

	componentDidMount() {
		const values = queryString.parse(this.props.location.search)
		console.log(values.u) // "top"
		console.log(values.p) // "im"
		console.log(values.c) // "im"
		if (values.u) {
			this.setState({ user: values.u, pass: values.p })

			if (values.p)
				axios.get(SERVER_API + '/auth/login/' + values.u + '/' + values.p)
					.then(res => {
						//console.log(res);
						console.log(res.data);
						if (res.data.token) {
							setToken(res.data.token.access_token);
							//this.props.setUser(res.data);
							window.location = "/";
						} else if (res.data.changepass)
							this.setState({ changepass: true, fail: 'Necesita cambiar la contraseña' });
						else
							this.setState({ fail: res.data.error });


					});
			else if (values.c) {
				axios.get(SERVER_API + '/auth/loginbycode/' + values.u + '/' + values.c)
					.then(res => {
						//console.log(res);
						console.log(res.data);
						if (res.data.token) {
							setToken(res.data.token.access_token);
							//this.props.setUser(res.data);
							window.location = "/" + res.data.path;
						} else
							this.setState({ fail: res.data.error });


					});

			}
		}
	}

	componentDidUpdate() {
	}

	handleSubmit(event) {
		event.preventDefault();
		this.setState({ fail: null });

		//http://pdireccion2.alinet.cu/#/login/ministro@nomail.no/123
		if (this.state.changepass && this.state.newpass !== this.state.newpass1) {
			this.setState({ fail: "Contraseña no coinciden" });
		} else {
			const URL = this.state.changepass ? '/auth/changepasslogin/' + this.state.user + '/' + this.state.pass + '/' + this.state.newpass : '/auth/login/' + this.state.user + '/' + this.state.pass;

			axios.get(SERVER_API + URL)
				.then(res => {
					console.log("Respuesta de: " + SERVER_API + URL);
					console.log(res.data);
					if (res.data.token) {
						//this.props.set/User(res.data);
						let pass = this.state.changepass ? this.state.newpass : this.state.pass
						if (res.data.rol === ROL_SUPERVISOR || res.data.rol === ROL_SUPERVISOR_ENTIDAD || res.data.rol === ROL_OPTEI || res.data.rol === ROL_OPERADOR || res.data.rol === ROL_PRODUCTORES || res.data.rol === ROL_AGENDA)
							window.location = this.props.cuadromandoUrl + "/#/login/" + res.data.email + "/" + pass;
						else {
							setToken(res.data.token.access_token);
							window.location = "/";
						}

					} else if (res.data.changepass)
						this.setState({ changepass: true, fail: 'Necesita cambiar la contraseña' });
					else
						this.setState({ fail: res.data.error });


				});
		}



	}

	render() {
		const style = {
			width: "2em"
		}
		return (
			<div className="container login-container">
				<div className="row justify-content-center align-items-center">
					<div className="col-md-4 login-form-1">
						<h3>Autentificación</h3>
						<form onSubmit={this.handleSubmit} autocomplete="off">
							<div className="form-group">
								<input type="text" autocomplete="off" required={true} className="form-control" placeholder="Usuario" value={this.state.user} onChange={this.handleChangeUser} />
							</div>
							<div className="form-group">
								<input type="password" autocomplete="off"   required={true} className="form-control" placeholder="Contraseña" value={this.state.pass} onChange={this.handleChangePass} />
							</div>

							{this.state.changepass && <>
								<br />
								<div className="form-group">
									<input type="password" title={MESSAGE_PASSWORD} required={true} pattern={PATTERN_PASS} className="form-control" placeholder="Nueva contraseña" value={this.state.newpass} onChange={this.handleChangeNewPass} />
								</div>
								<div className="form-group">
									<input type="password" title={MESSAGE_PASSWORD} required={true} ref={this.newpass1Ref} pattern={PATTERN_PASS} className="form-control" placeholder="Confirmar contraseña" value={this.state.newpass1} onChange={this.handleChangeNewPass1} />
								</div>
							</>}

							<div className="form-group">
								<input type="submit" className="btnSubmit" value="Acceder" />
							</div>
							{this.state.fail &&
								<div className="alert alert-danger" role="alert">
									{this.state.fail}
								</div>
							}
							<br />
							<div>
								<h6>Atención al Cliente</h6>
								<p>52132479<br />52137242</p>
								<a href="https://chat.whatsapp.com/LYrAU6BjxMD2XxWLHC20MZ"><img style={style} src="whatsapp.svg"></img>Soporte</a>
								<br />
								<a href="/recoverypass">Recuperar contraseña</a>

							</div>
						</form>

					</div>



				</div>

			</div >
		);
	}


}

const mapStateToProps = state => ({
	login: state.login,
	cuadromandoUrl: state.cuadromandoUrl
})
const mapDispatchToProps = dispatch => ({
	setUser(profile) {
		dispatch({
			type: 'SET_USER', profile: { nombre: profile.nombre, cargo: profile.cargo, user: profile.user, rol: profile.rol }
		})
	}
});
export default connect(mapStateToProps, mapDispatchToProps)(Login);
