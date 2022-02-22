import React from 'react';
import { Redirect } from "react-router-dom";
import { removeToken } from '../../helpers/auth-helpers';

const Logout = () => {
	removeToken();
	return <Redirect to="/login"/>
}

export default Logout;