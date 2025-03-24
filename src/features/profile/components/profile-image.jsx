import {Card} from "@/shared/components/card/card.jsx";
import {useEffect, useState} from "react";
import {auth} from "@/firebase.js";
import {useAuthContext} from "@/context/auth-context.jsx";
import {removeFile, uploadFile} from "@/shared/utils/functions.js";
import {toast} from "react-toastify";
import {Avatar, Box, Button, CircularProgress, Typography} from "@mui/material";
import {grey} from "@mui/material/colors";


export const ProfileImage = () => {
  const [image, setImage] = useState(auth?.currentUser?.photoURL);
  const {user: userDetails, handleUpdateUser} = useAuthContext();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userDetails) {
      setImage(userDetails?.photoURL || null);
    }
  }, [userDetails])

  const chooseProfile = async (event) => {
    try {
      setLoading(true);
      const fileUpload = event.target.files[0];
      console.log(fileUpload);
      const image = await uploadFile(fileUpload, `${auth?.currentUser?.uid}-${fileUpload?.name}`);
      await handleUpdateUser({photoURL: image});
      console.log(image);
      toast.success("Image updated successfully");
    } catch (error) {
      console.log(error);
      toast.error(error?.message || "Failed to update image");
    } finally {
      setLoading(false);
    }
  }

  const removeImage = async (event) => {
    try {
      setLoading(true);
      if (image?.includes(auth?.currentUser?.uid)) {
        await removeFile(image);
      }
      await handleUpdateUser({photoURL: null});
      toast.success("Profile image deleted");
    } catch (error) {
      console.log(error);
      toast.error(error?.message || "Failed to delete image");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card sx={{p: 2, display: "flex", flexDirection: "column", justifyContent: "center", gap: 2}}>
      <label htmlFor={'choose-img'} style={{textAlign: "center"}}>
        <Avatar
          sx={{width: 150, height: 150, cursor: "pointer", fontSize: 100, color: "#FFF", mx: "auto"}}
          // onClick={chooseProfile}
          src={loading ? null : image}
        >
          {loading ? <CircularProgress size={50} /> :
            !image && userDetails?.displayName?.slice(0, 1)?.toUpperCase() || userDetails?.email?.slice(0, 1)?.toUpperCase()
          }
        </Avatar>
        <input type={"file"} id={"choose-img"}
               onChange={chooseProfile}
               onBlur={e => {
                 e.target.value = "";
               }}
               accept={"image/png, image/gif, image/jpg, image/jpeg"} hidden maxLength={700}/>
      </label>

      <Box sx={{display: 'block'}}>
        <Button
          component="label"
          color={"secondary"}
          variant={"contained"}
          fullWidth disabled={loading}
          sx={{borderRadius: 5, textTransform: "capitalize", boxShadow: 0}}
        >
          Choose Image
          <input type={"file"}
                 onChange={chooseProfile}
                 onBlur={e => {
                   e.target.value = "";
                 }}
                 accept={"image/png, image/gif, image/jpg, image/jpeg"} hidden maxLength={700}/>
        </Button>
        <Button
          color={"secondary"}
          variant={"outlined"}
          fullWidth
          disabled={!image || loading}
          onClick={removeImage}
          sx={{borderRadius: 5, textTransform: "capitalize", mt: 1, display: 'block'}}
        >
          Remove
        </Button>
        <Typography variant={"subtitle2"} color={grey[500]} sx={{mt: 1, fontSize: 12}}>
          .jpg, .gif, or .png. Max file size 700K.
        </Typography>
      </Box>
    </Card>
  )
}