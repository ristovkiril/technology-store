import {IconButton, InputAdornment, TextField} from "@mui/material";
import { IconX } from "@tabler/icons-react";

export const EmailInput = ({value, handleChange, title = "Email", tabIndex = undefined, autoFocus = false, ...props}) => {

  return (
    <TextField
      label={title}
      placeholder={"johndoe@gmail.com"}
      variant={"standard"}
      name={"email"}
      type={"email"}
      fullWidth
      required
      autoFocus={autoFocus}
      inputProps={{tabIndex}}
      onChange={(e) => handleChange(e.target.value)}
      value={value}
      InputProps={{
        endAdornment: <InputAdornment position={"end"} sx={{display: value ? "flex" : "none" }}>
          <IconButton onClick={() => handleChange("")} tabIndex={-1} size={"small"}><IconX fontSize={"small"} /></IconButton>
        </InputAdornment>
      }}
      {...props}
    />
  )
}