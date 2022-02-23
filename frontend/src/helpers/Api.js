import axios from 'axios'
import { SERVER_API } from './static'

export  class Api {

	static postProductoNew(formData)  {
		return axios.post(SERVER_API+"/producto/new", formData);
	
	}
	static getProductos(query='', skip='', limit='')  {
		return axios.get(SERVER_API+"/producto?query="+query+"&skipe="+skip+"&limit="+limit);
	
	}

}




