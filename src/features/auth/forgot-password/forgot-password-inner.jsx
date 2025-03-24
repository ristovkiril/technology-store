import {Button, Stack, Typography} from "@mui/material";
import {useAuthContext} from "@/context/auth-context.jsx";
import {useState} from "react";
import {toast} from "react-toastify";
import {Link} from "react-router-dom";
import {EmailInput} from "@/shared/components/inputs/email-input.jsx";
import {IconChevronRight} from "@tabler/icons-react";


export const ForgotPasswordInner = () => {
  const {handleForgotPassword} = useAuthContext();

  const [email, setEmail] = useState("");

  const onSubmit = async (e) => {
    e?.preventDefault();
    if (!email) {
      toast.error("Please enter your email address")
      return;
    }
    try {
      await handleForgotPassword(email);
      toast.success("We’ve sent you an email to change your password. Please check your inbox and spam folder.")
    } catch (error) {
      console?.log(error);
      toast.error(error?.message?.replaceAll("Firebase:", "") || "Forgot Password Failed")
    }
  }

  return (
    <Stack component={"form"} onSubmit={onSubmit} direction={"column"} gap={3} justifyContent={"center"}
           alignItems={"center"}
           sx={{flex: 1, mx: "auto", width: "320px"}}>
      <Typography variant={"h4"} sx={{pb: 1}} letterSpacing={"0.1rem"}>Forgot Password</Typography>

      <EmailInput
        variant={"outlined"}
        value={email}
        autoFocus
        handleChange={value => setEmail(value)}
        tabIndex={1}
      />
      <Button type={"submit"} tabIndex={3} fullWidth size={"large"} variant={"contained"} endIcon={<IconChevronRight/>}
              disabled={!email}>
        Submit
      </Button>
      <Typography component={Link} variant={"subtitle2"} to={"/login"} color={"secondary"}>Try again?
        Login</Typography>
    </Stack>
  )
}