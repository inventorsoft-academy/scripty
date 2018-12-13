package co.inventorsoft.scripty.model.entity;

import co.inventorsoft.scripty.exception.ApplicationException;
import co.inventorsoft.scripty.model.dto.PictureDto;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpStatus;

import javax.persistence.AttributeConverter;
import java.io.IOException;

public class PictureConverter implements AttributeConverter<PictureDto, String> {
    ObjectMapper mapper = new ObjectMapper();

    @Override
    public String convertToDatabaseColumn(PictureDto attribute) {
        String value = "";
        if (attribute == null) {
            return null;
        }
        try {
            value = mapper.writeValueAsString(attribute);
        } catch (JsonProcessingException e) {
            throw new ApplicationException("Write data into database error.\n" + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
        return value;
    }

    @Override
    public PictureDto convertToEntityAttribute(String dbData) {
        PictureDto picture;
        if (dbData == null) {
            return null;
        }
        try {
            picture = mapper.readValue(dbData, PictureDto.class);
        } catch (IOException e) {
            throw new ApplicationException("Read data form database error. \n" + e.getMessage(), HttpStatus.NO_CONTENT);
        }
        return picture;
    }
}
