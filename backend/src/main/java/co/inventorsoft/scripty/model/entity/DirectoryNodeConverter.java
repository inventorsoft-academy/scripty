package co.inventorsoft.scripty.model.entity;

import co.inventorsoft.scripty.exception.ApplicationException;
import co.inventorsoft.scripty.model.dto.DirectoryNode;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpStatus;
import javax.persistence.AttributeConverter;
import javax.persistence.Converter;
import java.io.IOException;

/**
 * @author lzabidovsky 
 */
@Converter
public class DirectoryNodeConverter implements AttributeConverter<DirectoryNode, String> {
	ObjectMapper mapper = new ObjectMapper();

	@Override
	public String convertToDatabaseColumn(DirectoryNode data) {
		try {
			return mapper.writeValueAsString(data);
		} catch (JsonProcessingException e) {
			throw new ApplicationException("Write data into database error.\n" + e.getMessage(), HttpStatus.SERVICE_UNAVAILABLE);
		}
	}

	@Override
	public DirectoryNode convertToEntityAttribute(String data) {
		try {
			return mapper.readValue(data, new TypeReference<DirectoryNode>() {});
		} catch (IOException e) {
			throw new ApplicationException("Unavailable to read data from database.\n" + e.getMessage(), HttpStatus.SERVICE_UNAVAILABLE);
		}
	}
}
