import React from 'react';
import Context from './AuthContext';

export default class AuthContextProvider extends React.Component {
    state = {
        AuthUserID: null,
        AuthUserName: null,
        AuthUserPassword: null,
        AuthUserDetails: null
    }

    render() {
        return (
            <Context.Provider
                value={{
                    AuthUserID: this.state.AuthUserID,
                    AuthUserName: this.state.AuthUserName,
                    AuthUserPassword: this.state.AuthUserPassword,
                    AuthUserDetails: this.state.AuthUserDetails
                }}
            >
                {this.props.children}
            </Context.Provider>
        );
    }
}