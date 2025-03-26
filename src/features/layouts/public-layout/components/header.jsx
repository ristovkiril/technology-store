import {Badge, Button, IconButton, Stack, Toolbar} from "@mui/material";
import logoImg from "@/assets/technology-logo.png"
import {IconHeart, IconShoppingCart} from "@tabler/icons-react";
import {useAppContext} from "@/context/app-context.jsx";
import {Link, useNavigate} from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();
  const {state: {likes, cart}, dispatch} = useAppContext();

  return (
    <>
      <Toolbar variant={"regular"}
               sx={{position: "fixed", left: 0, right: 0, top: 0, zIndex: 2, bgcolor: "background.main"}}>
        <Button
          startIcon={<img src={logoImg} alt={"MyStore"} height={25}/>}
          component={Link} to={"/products"}
          sx={{color: "#302f2f", "&:hover": {color: "#272424"} }}
        >
          KR Store
        </Button>

        <Stack direction={"row"} gap={1} sx={{ml: "auto"}}>
          <IconButton onClick={() => likes?.length > 0 ? navigate("/favorites") : null}>
            <Badge badgeContent={likes?.length || 0} showZero color={"secondary"} size={"small"}>
              <IconHeart/>
            </Badge>
          </IconButton>
          <IconButton>
            <Badge badgeContent={cart?.length || 0} showZero color={"secondary"} size={"small"}>
              <IconShoppingCart/>
            </Badge>
          </IconButton>
        </Stack>
      </Toolbar>
    </>
  )
}