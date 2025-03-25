import {Button, Modal, Stack, Typography} from "@mui/material";
import {useAtom} from "jotai";
import {NotificationModalAtom} from "@/modals/atoms.js";
import {CustomModal} from "@/modals/modal.jsx";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 300, maxWidth: 400,
  bgcolor: 'background.paper',
  borderRadius: 5,
  boxShadow: 24,
  p: 4,
};

export const NotificationModal = () => {
  const [open, setOpen] = useAtom(NotificationModalAtom);

  const handleClose = () => setOpen(false);

  return (
    <CustomModal open={open} handleClose={handleClose}>
      <Stack direction={"column"} gap={2} sx={style}>
        <Typography variant={"h4"} color={"secondary"}>Demo Store Project – Exploring New Features!</Typography>
        <Typography variant={"subtitle2"} color={"secondary"}>This is a demo project for a store where I'm experimenting with some new ideas using Material UI. Stay tuned for exciting updates! 🚀</Typography>

        <Button onClick={handleClose} variant={"contained"} fullWidth>
          Thanks!
        </Button>
      </Stack>
    </CustomModal>
  )
}