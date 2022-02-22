import React from "react";
import { connect } from 'react-redux'

export function requireAuthentication(Component) {
    class AuthenticatedComponent extends React.Component {

        /**
         * Check if the user is authenticated, this.props.isAuthenticated
         * has to be set from your application logic (or use react-redux to retrieve it from global state).
         */
        isAuthenticated() {
            return this.props.isAuthenticated;
        }

        /**
         * Render
         */
        render() {
            const loginErrorMessage = (
                <div>
                    Please <a href="/login">login</a> in order to view this part of the application.
                </div>
            );

            return (
                <div>
                    { this.user && <Component {...this.props} />  }
                </div>
            );
        }
	}

	const mapStateToProps = state => ({
		user: state.profile.user
	})
	
	const mapDispatchToProps = dispatch => ({});
	
	
	
	return connect(mapStateToProps, mapDispatchToProps)(AuthenticatedComponent)
}

export default requireAuthentication;