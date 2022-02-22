import { getToken } from "./auth-helpers";

export const isAuthenticated = user => {
	return getToken();
}

export const isAllowed = (user, rights) =>
  rights.some(right => user.rights.includes(right));

export const hasRole = (user, roles) =>
  roles.some(role => user.roles.includes(role));