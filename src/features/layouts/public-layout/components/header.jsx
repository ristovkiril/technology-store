import {Badge, Button, IconButton, Stack, Toolbar} from "@mui/material";
import logoImg from "@/assets/react.svg"
import {IconHeart, IconShoppingCart} from "@tabler/icons-react";
import {useAppContext} from "@/context/app-context.jsx";

export const Header = () => {
  const {state: {likes, cart}, dispatch} = useAppContext();

  return (
    <>
      <Toolbar variant={"regular"}
               sx={{position: "fixed", left: 0, right: 0, top: 0, zIndex: 2, bgcolor: "background.main"}}>
        <Button
          color={"secondary"}
          startIcon={<img src={logoImg} alt={"MyStore"} height={25}/>}
        >
          MyStore
        </Button>

        <Stack direction={"row"} gap={1} sx={{ml: "auto"}}>
          <IconButton>
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