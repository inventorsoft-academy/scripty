package co.inventorsoft.scripty.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import co.inventorsoft.scripty.exception.ApplicationException;
import co.inventorsoft.scripty.model.dto.StringResponse;
import org.springframework.web.multipart.MaxUploadSizeExceededException;
import org.springframework.web.multipart.MultipartException;

/**
 * global ExceptionHandler for ApplicationException
 */
@ControllerAdvice
public class ExceptionHandlingController {
	String maxSize;

	ExceptionHandlingController(@Value("${spring.servlet.multipart.max-file-size}") String maxSize){
		this.maxSize = maxSize;
	}

	@ExceptionHandler(ApplicationException.class)
	public ResponseEntity<StringResponse> exceptionHandler(ApplicationException ae) {
		return ResponseEntity.status(ae.getCode()).body(new StringResponse(ae.getMessage()));
	}

	@ExceptionHandler(MultipartException.class)
	public ResponseEntity pictureSizeException(MaxUploadSizeExceededException e) {
		return ResponseEntity.status(HttpStatus.BAD_REQUEST)
				.body(new StringResponse("Size of your picture is too large. Try to use another one. Maximum size is " + maxSize ));
	}

}
