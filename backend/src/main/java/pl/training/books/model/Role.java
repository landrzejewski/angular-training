package pl.training.books.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@RequiredArgsConstructor
@NoArgsConstructor
@Entity
@Data
public class Role implements GrantedAuthority {

    @GeneratedValue
    @Id
    private Long id;
    @NonNull
    private String name;

    @Override
    public String getAuthority() {
        return name;
    }

}
