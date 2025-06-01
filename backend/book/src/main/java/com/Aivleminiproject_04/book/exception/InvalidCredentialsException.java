package com.Aivleminiproject_04.book.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

// HTTP 401
@ResponseStatus(value = HttpStatus.UNAUTHORIZED)
public class InvalidCredentialsException extends RuntimeException {
    public InvalidCredentialsException(String message) {
      super(message);
    }

    public InvalidCredentialsException(String message, Throwable cause) {
      super(message, cause);
    }
}
