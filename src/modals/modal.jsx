import {Modal} from "@mui/material";


export const CustomModal = ({open, handleClose, children, ...props}) => {

  return (
    <Modal
      open={open}
      onClose={handleClose}
      slotProps={{
        backdrop: {
          sx: {backdropFilter: "blur(4px)"}
        }
      }}
      {...props}
    >
      {children}
    </Modal>
  )
}