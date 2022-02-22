import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { MESSAGE_PASSWORD, SERVER_API } from '../../helpers/static';
import {  PATTERN_PASS } from '../../helpers/pattern';

export default function RecoveryPass(props) {
	// Declaración de una variable de estado que llamaremos "count"
	const [fail, setFail] = useState(false);
	const [user, setUser] = useState(props.match.params.user ? props.match.params.user : '');
	const [pass, setPass] = useState('');
	const [newpass, setNewpass] = useState('');
	const [code, setCode] = useState(props.match.params.code ? props.match.params.code : '');
	const [enviado, setEnviado] = useState(props.match.params.user && props.match.params.code);
	const [fromURL, setFromURL] = useState(props.match.params.user && props.match.params.code);

	const [cambiada, setCambiada] = useState(false);

	

	const requestRecoveryCode = () => {
		axios.get(SERVER_API + '/auth/recoverycode/' + user)
			.then(res => {
				console.log(res.data);
				if (res.data.ok) {
					setEnviado(true);
				}
				else
					setFail(res.data.fail);
			});
	};

	const changePassByCode = () => {
		if (pass !== newpass) {
			setFail('No coinciden las contraseñas');
		} else
			axios.post(SERVER_API + '/auth/changepassbycode', { user: user, code: code, pass: pass })
				.then(res => {
					//console.log(res);
					console.log(res.data);
					if (res.data.ok) {
						setCambiada(true);
					}
					else
						setFail(res.data.fail);
				});
	};



	const handleSubmit = (event) => {
		event.preventDefault();
		setFail('');
		if (!enviado)
			requestRecoveryCode();
		else
			changePassByCode();
	};

	return (
		<div className="container login-container">
			<div className="row justify-content-center align-items-center">
				<div className="col-md-4 login-form-1">
					{fail &&
						<div className="alert alert-danger" role="alert">
							{fail}
						</div>
					}
					{cambiada &&
						<>
							<div className="info alert-info" role="info">
								Contraseña cambiada
						</div>
							<a href="/login">Iniciar sesión</a>
						</>
					}
					{!cambiada && <>
						<h5>Recuperar contraseña</h5>

						<form onSubmit={handleSubmit}>
							{!enviado &&
								<div className="form-group">
									<input type="text" required={true} className="form-control" placeholder="Usuario" value={user} onChange={(event) => { setUser(event.target.value) }} />
								</div>
							}



							{enviado && <>
								{!fromURL && <> <div className="info alert-info" role="info">
									Código enviado revise su email
									</div>
									<br />
								</>}
								{!fromURL && <div className="form-group">
									<input type="text" required={true} className="form-control" placeholder="Código" value={code} onChange={(event) => { setCode(event.target.value) }} />
								</div>}
								<div className="form-group">
									<input type="password" title={MESSAGE_PASSWORD} required={true} pattern={PATTERN_PASS} className="form-control" placeholder="Nueva contraseña" value={pass} onChange={(event) => { setPass(event.target.value) }} />
								</div>
								<div className="form-group">
									<input type="password" title={MESSAGE_PASSWORD}  required={true} pattern={PATTERN_PASS} className="form-control" placeholder="Confirmar contraseña" value={newpass} onChange={(event) => { setNewpass(event.target.value) }} />
								</div>
							</>}

							<div className="form-group">
								<input type="submit" className="btnSubmit" value="Enviar" />
							</div>


						</form>
					</>}

				</div>



			</div>

		</div >
	);
}