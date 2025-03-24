import {Button, Divider, Box, Stack, Typography, TextField} from "@mui/material";
import {useAuthContext} from "@/context/auth-context.jsx";
import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {EmailInput} from "@/shared/components/inputs/email-input.jsx";
import {PasswordInput} from "@/shared/components/inputs/password-input.jsx";
import {IconChevronRight} from "@tabler/icons-react";
import {GoogleButton} from "@/shared/components/buttons/google-button/google-button.jsx";


export const RegisterInner = () => {
  const {handleRegister} = useAuthContext();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e?.preventDefault();
    if (!email || !password || !fullName) {
      toast.error("Full Name, Email and Password are required fields")
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Password not match")
      return;
    }
    try {
      await handleRegister(email, password, fullName);
      navigate("/products");
    } catch (error) {
      console?.log(error);
      toast.error(error?.message?.replaceAll("Firebase:", "") || "Login Failed")
    }
  }

  return (
    <Stack component={"form"} onSubmit={onSubmit} direction={"column"} gap={2} justifyContent={"center"}
           alignItems={"center"}
           sx={{flex: 1, mx: "auto", width: "320px"}}>
      <Typography variant={"h4"} letterSpacing={"0.1rem"}>Register</Typography>
      <Typography variant={"subtitle2"} color={"secondary"} align={"center"}
                  sx={{pb: 1.5}}>{"Already have an account? "}
        <Typography component={Link} variant={"subtitle2"} to={"/login"} color={"primary"}> Login now</Typography>
      </Typography>
      <TextField
        fullWidth
        autoFocus
        label={"Full Name"}
        placeholder={"Enter your name..."}
        value={fullName}
        inputProps={{tabIndex: 1}}
        onChange={e => setFullName(e?.target?.value)}
      />
      <EmailInput
        variant={"outlined"}
        value={email}
        handleChange={value => setEmail(value)}
        tabIndex={2}
      />

      <PasswordInput
        variant={"outlined"}
        value={password}
        handleChange={value => setPassword(value)}
        showPasswordStrength
        tabIndex={3}
      />
      <PasswordInput
        variant={"outlined"}
        title={"Confirm Password"}
        value={confirmPassword}
        handleChange={value => setConfirmPassword(value)}
        showPasswordStrength
        error={password !== confirmPassword}
        helperText={password !== confirmPassword ? "Password not match" : undefined}
        tabIndex={4}
      />
      <Button type={"submit"} fullWidth size={"large"} variant={"contained"} endIcon={<IconChevronRight/>}
              tabIndex={5}
              disabled={!email || !password}>
        Register
      </Button>
      <Divider sx={{width: "60%", fontSize: 13, fontWeight: 500}}>OR</Divider>
      <GoogleButton tabIndex={6}/>
    </Stack>
  )
}