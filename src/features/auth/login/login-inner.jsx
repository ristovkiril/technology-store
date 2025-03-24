import {Stack, Box, Typography, Divider, Button} from "@mui/material";
import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {GoogleButton} from "@/shared/components/buttons/google-button/google-button.jsx";
import {useAuthContext} from "@/context/auth-context.jsx";
import {EmailInput} from "@/shared/components/inputs/email-input.jsx";
import {PasswordInput} from "@/shared/components/inputs/password-input.jsx";
import {toast} from "react-toastify";
import {IconChevronRight} from "@tabler/icons-react";

export const LoginInner = () => {
  const {handleLogin} = useAuthContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e?.preventDefault();
    if (!email || !password) {
      toast.error("Email and Password are required fields")
      return;
    }
    try {
      await handleLogin(email, password);
      navigate("/products");
    } catch (error) {
      console?.log(error);
      toast.error(error?.message?.replaceAll("Firebase:", "") || "Login Failed")
    }
  }

  return (
    <Stack component={"form"} onSubmit={onSubmit} direction={"column"} gap={2} justifyContent={"center"} alignItems={"center"}
           sx={{flex: 1, mx: "auto", width: "320px"}}>
      <Typography variant={"h4"} letterSpacing={"0.1rem"}>Login</Typography>
      <Typography variant={"subtitle2"} color={"secondary"} align={"center"} sx={{pb: 1.5}}>{"Don't have an account yet? "}
        <Typography component={Link} variant={"subtitle2"} to={"/register"} color={"primary"}> Register now</Typography>
      </Typography>
      <EmailInput
        variant={"outlined"}
        value={email}
        autoFocus
        handleChange={value => setEmail(value)}
        tabIndex={1}
      />
      <Box sx={{width: "100%"}}>
        <PasswordInput
          variant={"outlined"}
          value={password}
          handleChange={value => setPassword(value)}
          showPasswordStrength
          tabIndex={2}
        />
        <Typography
          component={Link} to={"/forgot-password"} fontSize={12} align={"left"} color={"secondary"}
          sx={{pl: 1, "&:hover": {color: "secondary !important"} }} letterSpacing={"0.1rem"}
        >
          Forgot Password?
        </Typography>
      </Box>
      <Button type={"submit"} tabIndex={3} fullWidth size={"large"} variant={"contained"} endIcon={<IconChevronRight />} disabled={!email || !password}>
        Login
      </Button>
      <Divider sx={{width: "60%", fontSize: 13, fontWeight: 500}}>OR</Divider>
      <GoogleButton tabIndex={4}/>
    </Stack>
  )
}