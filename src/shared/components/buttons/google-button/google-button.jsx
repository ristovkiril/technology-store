import {Button} from "@mui/material";
import {IconBrandGoogleFilled} from "@tabler/icons-react";
import {useAuthContext} from "@/context/auth-context.jsx";
import {toast} from "react-toastify";


export const GoogleButton = ({...props}) => {
  const {handleLoginGoogle} = useAuthContext();

  const handleLogin = async () => {
    try {
      await handleLoginGoogle();
    } catch (error) {
      console.log(error);
      toast.error(error?.message?.replaceAll("Firebase:", "") || "Login Failed")
    }
  }

  return (
    <Button
      fullWidth size={"large"}
      variant={"outlined"}
      color={"secondary"}
      onClick={handleLogin}
      startIcon={<IconBrandGoogleFilled />}
      {...props}
    >
        Google
    </Button>
  )
}