import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension";
import { SET_INFOPARTESEMPRESA, SET_PROFILE, SET_DATE, SET_EMPRESAS, SET_JERARQUIA, SET_FRECUENCIAS, SET_CLASIFICACIONES, SET_TIPOSFILA, SET_ENTIDAD, SET_CUADROMANDOURL } from './actions/types';



const initialState = {
	profile: {  user: false, rol: ''},
	jerarquia: false,
	date: false,
	entidad: false,
	cuadromandoUrl: false,
	infoPartesEmpresa: {},
	empresas: {},
	frecuencias: {},
	clasificaciones: {},
	tiposfila: {}
};

/* const reducerGestar = (state = initialState, action) => {
	switch (action.type) {
		case 'AGREGAR_TAREA':
			console.log(action);
			return {...state, tareas: state.tareas.concat(action.tarea)}	
		default:
			return state;
	}
} */

const infoPartesEmpresaReducer = (state = initialState.infoPartesEmpresa, action) => {
	switch (action.type) {
		case SET_INFOPARTESEMPRESA:
			console.log(action);
			console.log("Payload:");
			console.log(action.infoPartesEmpresa);
			return action.infoPartesEmpresa
		default:
			return state;
	}


}



const profileReducer = (state = initialState.profile, action) => {
	switch (action.type) {
		case SET_PROFILE:
			console.log(action)
			return  action.profile
		default:
			return state;
	}
}

const jerarquiaReducer = (state = initialState.jerarquia, action) => {
	switch (action.type) {
		case SET_JERARQUIA:
			console.log(action)
			return  action.jerarquia
		default:
			return state;
	}
}

const empresasReducer = (state = initialState.empresas, action) => {
	switch (action.type) {
		case SET_EMPRESAS:
			console.log(action)
			let empresas={}
			action.empresas.forEach(empresa => {
				empresas[empresa._id]=empresa				
			})
			return  empresas
		default:
			return state;
	}
}

const frecuenciasReducer = (state = initialState.frecuencias, action) => {
	switch (action.type) {
		case SET_FRECUENCIAS:
			console.log(action)
			let frecuencias={}
			action.frecuencias.forEach(frecuencia => {
				frecuencias[frecuencia.id]=frecuencia				
			})
			return  frecuencias
		default:
			return state;
	}
}

const clasificacionesReducer = (state = initialState.clasificaciones, action) => {
	switch (action.type) {
		case SET_CLASIFICACIONES:
			console.log(action)
			let clasificaciones={}
			action.clasificaciones.forEach(clasificacion => {
				clasificaciones[clasificacion.id]=clasificacion				
			})
			return  clasificaciones
		default:
			return state;
	}
}

const tiposfilaReducer = (state = initialState.tiposfila, action) => {
	switch (action.type) {
		case SET_TIPOSFILA:
			console.log(action)
			let tiposfila={}
			action.tiposfila.forEach(tipofila => {
				tiposfila[tipofila.id]=tipofila				
			})
			return  tiposfila
		default:
			return state;
	}
}

const dateReducer = (state = initialState.date, action) => {
	switch (action.type) {
		case SET_DATE:
			console.log(action)
			return  action.date
		default:
			return state;
	}
}

const cuadromandoUrlReducer = (state = initialState.cuadromandoUrl, action) => {
	switch (action.type) {
		case SET_CUADROMANDOURL:
			console.log(action)
			return  action.cuadromandoUrl
		default:
			return state;
	}
}

const entidadReducer = (state = initialState.entidad, action) => {
	switch (action.type) {
		case SET_ENTIDAD:
			console.log(action)
			return  action.entidad
		default:
			return state;
	}
}

const reducer = combineReducers({
	profile: profileReducer,
	jerarquia: jerarquiaReducer,
	infoPartesEmpresa: infoPartesEmpresaReducer,
	date: dateReducer,
	entidad: entidadReducer,
	empresas: empresasReducer,
	frecuencias: frecuenciasReducer,
	clasificaciones: clasificacionesReducer,
	tiposfila: tiposfilaReducer,
	cuadromandoUrl: cuadromandoUrlReducer
})

const middleware = [
	thunk,
]


export default createStore(reducer, composeWithDevTools(
	applyMiddleware(...middleware),
	// other store enhancers if any
));