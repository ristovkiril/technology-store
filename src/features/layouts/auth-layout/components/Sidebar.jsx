import {Box, Drawer, Stack, Toolbar} from "@mui/material";
import {SidebarContent} from "@/features/layouts/auth-layout/components/SidebarContent.jsx";
import {useAtom} from "jotai";
import {SidebarDrawerState} from "@/features/layouts/auth-layout/atoms.js";
import {HeaderLogo} from "@/features/layouts/auth-layout/components/HeaderLogo.jsx";

export const drawerWidth = 300;

const paperProps = {
  width: `${drawerWidth}px`,
  maxHeight: "100lvh",
  overflowY: "auto",
  bgcolor: "background.main",
  px: 1,
}

export const Sidebar = () => {
  const [open, setOpen] = useAtom(SidebarDrawerState);

  return (
    <>
      <Stack
        sx={{
          ...paperProps,
          display: {xs: "none", md: "flex"},
        }}
      >
        <Toolbar/>
        <SidebarContent/>
      </Stack>

      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        variant={"temporary"}
        sx={{display: {xs: "flex", md: "none"} }}
        PaperProps={{
          sx: {
            ...paperProps,

          }
        }}
      >
        <Stack direction={"column"} gap={1} sx={{height: '100%', overflowY: "auto"}}>
          <Box sx={{p: 2}}>
            <HeaderLogo />
          </Box>
          <SidebarContent/>
        </Stack>
      </Drawer>
    </>
  )
}