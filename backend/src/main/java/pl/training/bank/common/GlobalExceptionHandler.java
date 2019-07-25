package pl.training.bank.common;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.context.MessageSource;
import org.springframework.context.NoSuchMessageException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import pl.training.bank.account.AccountNotFoundException;
import pl.training.bank.common.to.ExceptionTo;

import java.util.Locale;

import static org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR;
import static org.springframework.http.HttpStatus.NOT_FOUND;

@ControllerAdvice
@RequiredArgsConstructor
public class GlobalExceptionHandler {

    @NonNull
    private MessageSource messageSource;

    @ExceptionHandler(Exception.class)
    public ResponseEntity onException(Exception ex, Locale locale) {
        return createResponse(ex, INTERNAL_SERVER_ERROR, locale);
    }

    @ExceptionHandler(AccountNotFoundException.class)
    public ResponseEntity onAccountNotFoundException(AccountNotFoundException ex, Locale locale) {
        return createResponse(ex, NOT_FOUND, locale);
    }

    private ResponseEntity createResponse(Exception ex, HttpStatus status, Locale locale) {
        String exceptionName = ex.getClass().getSimpleName();
        String description;
        try {
            description = messageSource.getMessage(ex.getClass().getSimpleName(), null, locale);
        } catch (NoSuchMessageException exception) {
            description = exceptionName;

        }
        ex.printStackTrace();
        return ResponseEntity.status(status).body(new ExceptionTo(description));
    }

}
