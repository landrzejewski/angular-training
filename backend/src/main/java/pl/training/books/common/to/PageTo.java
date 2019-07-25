package pl.training.books.common.to;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class PageTo<T> {

    private List<T> data;
    private int pageNumber;
    private int totalPages;

}
