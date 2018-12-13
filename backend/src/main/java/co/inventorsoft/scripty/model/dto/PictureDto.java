package co.inventorsoft.scripty.model.dto;

import lombok.*;
import lombok.experimental.FieldDefaults;

import javax.persistence.Embeddable;

@Getter
@Setter
@FieldDefaults(level = AccessLevel.PRIVATE)
@AllArgsConstructor
@NoArgsConstructor
@Embeddable
public class PictureDto {
    String content;

    String extension;
}
