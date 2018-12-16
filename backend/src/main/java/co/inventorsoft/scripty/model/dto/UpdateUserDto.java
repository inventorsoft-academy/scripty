package co.inventorsoft.scripty.model.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Data
@NoArgsConstructor
@ApiModel(value = "Update Profile Model")
public class UpdateUserDto {
    @ApiModelProperty(value="First name to be updated")
    @Pattern(regexp = "^[a-zA-Z]*", message = "Only letters are allowed")
    @Size(max = 20)
    String firstName;

    @ApiModelProperty(value="Last name to be updated")
    @Pattern(regexp = "^[a-zA-Z]*", message = "Only letters are allowed")
    @Size(max = 20)
    String lastName;
}
