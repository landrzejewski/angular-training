package pl.training.books.user;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class UserTo {

    private String login;
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

}
