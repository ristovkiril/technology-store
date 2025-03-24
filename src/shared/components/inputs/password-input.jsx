import {IconButton, InputAdornment, Popover, TextField} from "@mui/material";
import {useState} from "react";
import {PasswordStrength} from "@/shared/components/inputs/password-strength.jsx";
import {IconEye, IconEyeClosed} from "@tabler/icons-react";

export const PasswordInput = ({
                                value,
                                handleChange,
                                title = "Password",
                                tabIndex = undefined,
                                autoFocus = false,
                                showPasswordStrength = false,
                                ...props
                              }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpen = (e) => {
    if (anchorEl === null && e.target.value && showPasswordStrength) {
      console.log("Change", e.target.value, e.currentTarget)
      setAnchorEl(e.currentTarget || null);
    }
    handleChange(e.target.value)
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <TextField
        label={title}
        type={showPassword ? "text" : "password"}
        placeholder={"********"}
        variant={"standard"}
        name={"password"}
        fullWidth
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onChange={handleOpen}
        onBlur={handleClose}
        autoFocus={autoFocus}
        inputProps={{tabIndex}}
        value={value}
        InputProps={{
          endAdornment: <InputAdornment position={"end"}>
            <IconButton tabIndex={-1} onClick={() => setShowPassword(prev => !prev)}
                        size={"small"}>{showPassword ? <IconEye fontSize={"small"}/> :
              <IconEyeClosed fontSize={"small"}/>}</IconButton>
          </InputAdornment>
        }}
        {...props}
      />
      <Popover
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        disableAutoFocus
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        slotProps={{
          paper: {sx: {p: 3, mt: 1, bgcolor: "background.main", borderRadius: 5}}
        }}
      >
        <PasswordStrength password={value}/>
      </Popover>
    </>
  )
}