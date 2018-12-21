package co.inventorsoft.scripty.model.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Data
@NoArgsConstructor
@ApiModel(value = "Update Profile Model")
public class UpdateUserDto {
    @ApiModelProperty(value="First name to be updated")
    @Pattern(regexp = "^[a-zA-Z]*", message = "Only letters are allowed")
    @Size(min = 2, max = 20)
    @NotBlank(message="First name cannot be empty")
    String firstName;

    @ApiModelProperty(value="Last name to be updated")
    @Pattern(regexp = "^[a-zA-Z]*", message = "Only letters are allowed")
    @Size(min = 2, max = 20)
    @NotBlank(message="Last name cannot be empty")
    String lastName;
}
