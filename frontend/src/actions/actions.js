import axios from 'axios'
import { getToken } from '../helpers/auth-helpers';
import { SET_INFOPARTESEMPRESA, SET_PROFILE, SET_MODELOSPARTES, SET_DATE, SET_EMPRESAS, SET_JERARQUIA, SET_FRECUENCIAS, SET_CLASIFICACIONES, SET_TIPOSFILA, SET_ENTIDAD, SET_CUADROMANDOURL } from './types';
import { SERVER_API, OK } from '../helpers/static';
import { formatDate, listToTree } from '../helpers/util';


export const getInfoPartesEmpresa = () => (dispatch, getState) => {

	const url = SERVER_API + "/api/infopartes/"+getState().profile.empresaId;
	axios.get(url)
		.then((response) => {
			console.log("Respuesta de: " + url);
			console.log(response.data);
			dispatch({ type: SET_INFOPARTESEMPRESA, infoPartesEmpresa: response.data });
		}).catch(function (error) {
			console.log(error);
		})
}

// export const getModelosPartes = () => (dispatch, getState) => {

// 	const url = SERVER_API + "/modelospartes";
// 	axios.get(url)
// 		.then((response) => {
// 			console.log("Respuesta de: " + url);
// 			console.log(response.data);
// 			let modelosPartes={}
// 			response.data.forEach(element => {
// 				modelosPartes[element.id]=element
				
// 			});
// 			dispatch({ type: SET_MODELOSPARTES, modelosPartes: modelosPartes });
// 		}).catch(function (error) {
// 			console.log(error);
// 		})
// }

export const getProfile = () => (dispatch, getState) => {
	console.log("Obteniendo Profile")

	const url = SERVER_API + "/usuario/user-profile";
	axios.get(url)
		.then((response) => {
			console.log("Respuesta de: " + url);
			console.log(response.data);
			
			if(response.data.modelos) {
				let clasificaciones={}
				response.data.modelos.forEach(modelo => {
					modelo.arbolFilas=listToTree(modelo.filas);
					clasificaciones[modelo.clasificacion.clasificacion]=true;
				});
				response.data.clasificacionesmodelo=Object.keys(clasificaciones);
			}
			dispatch({ type: SET_PROFILE, profile: response.data });
		}).catch(function (error) {
			console.log(error);
		})
}

export const getJerarquia = () => (dispatch, getState) => {
	console.log("Obteniendo Jerarquia")

	const url = SERVER_API + "/arbol-jerarquico";
	axios.get(url)
		.then((response) => {
			console.log("Respuesta de: " + url);
			console.log(response.data);
			dispatch({ type: SET_JERARQUIA, jerarquia: response.data });
		}).catch(function (error) {
			console.log(error);
		})
}

export const getDate = () => (dispatch, getState) => {
	console.log("Obteniendo Date")
	const url = SERVER_API + "/date";
	axios.get(url)
		.then((response) => {
			console.log("Respuesta de: " + url);
			console.log(response.data);
			dispatch({ type: SET_DATE, date: response.data });
		}).catch(function (error) {
			console.log(error);
		})
}
export const getCuadromandoUrl = () => (dispatch, getState) => {
	console.log("Obteniendo CuadromandoUrl")
	const url = SERVER_API + "/cuadromando_url";
	axios.get(url)
		.then((response) => {
			console.log("Respuesta de: " + url);
			console.log(response.data);
			dispatch({ type: SET_CUADROMANDOURL, cuadromandoUrl: response.data });
		}).catch(function (error) {
			console.log(error);
		})
}

export const getEntidad = (id) => (dispatch, getState) => {
	console.log("Obteniendo Fecha Real")
	const url = SERVER_API + "/entidad/"+id;
	axios.get(url)
		.then((response) => {
			console.log("Respuesta de: " + url);
			console.log(response.data);
			dispatch({ type: SET_ENTIDAD, entidad: response.data });
		}).catch(function (error) {
			console.log(error);
		})
}


export const getEmpresas = () => (dispatch, getState) => {
	console.log("Obteniendo Empresas")

	const url = SERVER_API + "/api/empresas";
	axios.get(url)
		.then((response) => {
			console.log("Respuesta de: " + url);
			console.log(response.data);
			dispatch({ type: SET_EMPRESAS, empresas: response.data });
		}).catch(function (error) {
			console.log(error);
		})
}

export const getFrecuencias = () => (dispatch, getState) => {
	console.log("Obteniendo Frecuencias")

	const url = SERVER_API + "/frecuencias";
	axios.get(url)
		.then((response) => {
			console.log("Respuesta de: " + url);
			console.log(response.data);
			dispatch({ type: SET_FRECUENCIAS, frecuencias: response.data });
		}).catch(function (error) {
			console.log(error);
		})
}

export const getClasificaciones = () => (dispatch, getState) => {
	console.log("Obteniendo Clasificaciones")

	const url = SERVER_API + "/clasificaciones";
	axios.get(url)
		.then((response) => {
			console.log("Respuesta de: " + url);
			console.log(response.data);
			dispatch({ type: SET_CLASIFICACIONES, clasificaciones: response.data });
		}).catch(function (error) {
			console.log(error);
		})
}

export const getTiposFila = () => (dispatch, getState) => {
	console.log("Obteniendo TiposFila")

	const url = SERVER_API + "/tiposfila";
	axios.get(url)
		.then((response) => {
			console.log("Respuesta de: " + url);
			console.log(response.data);
			dispatch({ type: SET_TIPOSFILA, tiposfila: response.data });
		}).catch(function (error) {
			console.log(error);
		})
}
