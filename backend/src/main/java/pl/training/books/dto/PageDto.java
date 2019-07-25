package pl.training.books.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.xml.bind.annotation.XmlRootElement;
import java.util.List;

@XmlRootElement(name = "page")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class PageDto<T> {

    private List<T> data;
    private int pageNumber;
    private int totalPages;

}
