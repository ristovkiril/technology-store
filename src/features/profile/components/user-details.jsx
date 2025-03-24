import {useEffect, useState} from "react";
import {useAuthContext} from "@/context/auth-context.jsx";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  Switch,
  TextField, Typography
} from "@mui/material";
import {grey} from "@mui/material/colors";
import {Card} from "@/shared/components/card/card.jsx";
import {toast} from "react-toastify";

export const UserDetails = () => {
  const [user, setUser] = useState({});
  const {user: userDetails, handleUpdateUser} = useAuthContext();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userDetails) {
      setUser({...userDetails});
    }
  }, [userDetails])

  const onChange = e => {
    const key = e?.target?.name;
    const value = e?.target?.value;

    onUpdate(key, value);
  }

  const onUpdate = (key, value) => setUser(prev => ({...prev, [key]: value}));

  const handleSubmit = async (e) => {
    e?.preventDefault();
    const updateData = {...user};
    if (updateData?.email) {
      delete updateData.email;
    }
    try {
      setLoading(true);
      console.log(updateData)
      await handleUpdateUser({...updateData});
      toast.success("Profile information saved successfully");
    } catch (error) {
      console.log(error);
      toast.success(error?.message || "Failed to save");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card sx={{p: 2, display: "flex", flexDirection: "column", justifyContent: "center", gap: 2}}>
      <Grid component={"form"} onSubmit={handleSubmit} container spacing={3}>
        <Grid item xs={12}>
          <Typography variant={"h6"} fontWeight={600}>My Profile</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            disabled={loading}
            InputLabelProps={{shrink: true}}
            placeholder={"John Doe"}
            label={"Full Name"} fullWidth
            value={user?.displayName}
            name={"displayName"}
            onChange={onChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            InputLabelProps={{shrink: true}}
            placeholder={"johndoe@gmail.com"}
            label={"Email"} fullWidth
            value={user?.email}
            name={"email"}
            onChange={onChange}
            disabled
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl component="fieldset" variant="standard">
            <FormLabel component="legend" sx={{color: `${grey[600]} !important`}}>Notifications</FormLabel>
            <FormGroup>
              <FormControlLabel
                disabled={loading}
                control={
                  <Switch checked={!!user?.newsletter} color={"secondary"}
                          onChange={(event, checked) => onUpdate("newsletter", checked)}/>
                }
                label="Receive newsletters promotions"
              />
              <FormControlLabel
                disabled={loading}
                control={
                  <Switch checked={!!user?.notifications} color={"secondary"}
                          onChange={(event, checked) => onUpdate("notifications", checked)}/>
                }
                label="Notify me when items in my saved collection go on sale"
              />
            </FormGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} sx={{textAlign: "right"}}>
          <Button
            disabled={loading}
            variant={"contained"} type={"submit"}
            sx={{px: 3, borderRadius: 10}}
          >
            Save Changes
          </Button>
        </Grid>
      </Grid>
    </Card>
  )
}