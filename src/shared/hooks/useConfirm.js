import {
  Button, Dialog, DialogActions,
  DialogContent, DialogContentText, DialogTitle,
} from '@mui/material';
import {useState} from 'react';



const useConfirm = (title, message) => {
  const [promise, setPromise] = useState(null);

  const confirm = () => new Promise((resolve) => {
    // @ts-ignore
    setPromise({ resolve });
  });

  const handleClose = () => {
    setPromise(null);
  };

  const handleConfirm = () => {
    // @ts-ignore
    promise?.resolve(true);
    handleClose();
  };

  const handleCancel = () => {
    // @ts-ignore
    promise?.resolve(false);
    handleClose();
  };
  // You could replace the Dialog with your library's version
  const ConfirmationDialog = () => (
    <Dialog
      open={promise !== null}
      fullWidth
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>

        <Button
          variant={"outlined"}
          color={"primary"}
          sx={{borderRadius: 5}}
          onClick={handleCancel}
        >
          Откажи
        </Button>
        <Button
          variant={"contained"}
          color={"primary"}
          sx={{borderRadius: 5, color: "#FFF"}}
          onClick={handleConfirm}
        >
          Продолжи
        </Button>
      </DialogActions>
    </Dialog>
  );
  return [ConfirmationDialog, confirm];
};

export default useConfirm;