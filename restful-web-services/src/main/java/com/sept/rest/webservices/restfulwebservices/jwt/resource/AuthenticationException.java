package com.sept.rest.webservices.restfulwebservices.jwt.resource;

// For handling Authentication errors
public class AuthenticationException extends RuntimeException {
    public AuthenticationException(String message, Throwable cause) {
        super(message, cause);
    }
}

