import Axios from "axios";

export function getToken() {
	return localStorage.getItem('token');
}

export function setToken(token) {
	localStorage.setItem('token', token);
}

export function removeToken(token) {
	localStorage.removeItem('token');
}

export function initAxiosInterceptors() {
	Axios.interceptors.request.use(function (config) {
		const token = getToken();

		config.headers.Accept = 'application/json';
		if (token) {
			config.headers.Authorization = `bearer ${token}`;
		}

		return config;
	});

	



	Axios.interceptors.response.use(
		function (response) {
			return response;
		},
		function (error) {
			console.log("--- Inicio AxiosInterceptors ERROR RESPONSE");
			console.log(error.response.status);
			console.log("--- Fin AxiosInterceptors ERROR RESPONSE");
			switch (error.response.status) {
				case 401:
					window.location = '/logout';
					break;
				case 500:
					window.location = '/error';
					break;
				case 403:
					window.location = '/unauthorized';
					break;

				default: 
					
					return error;
				
					
			}
			
		}
	)
}