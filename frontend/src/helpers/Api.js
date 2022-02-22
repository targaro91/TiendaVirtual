import axios from 'axios'
import { SERVER_API } from './static'

export  class Api {

	static apiPostProductoNew(formData)  {
		return axios.post(SERVER_API+"/producto/new", formData);
	
	}

}




