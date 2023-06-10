import React from 'react';
import Logout from '../authentication/Logout';

const ErrorHandling = (WrappedComponent) => {
    return function WithErrorHandling(props) {
        const { errors, ...rest } = props;
        console.log("errors",errors)
        // Handle the error as neede
        const toggleError = errors?.some(error=>{
            return error?.status === 401 ||error.originalStatus===401 || error?.status === 404 || error.originalStatus === 404
        })
        if (toggleError) {
            return <Logout />
        }
        return <WrappedComponent {...rest} />;
    };
};

export default ErrorHandling;
