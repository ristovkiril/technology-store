import {useAppContext} from "@/context/app-context.jsx";
import {Grid, Stack} from "@mui/material";
import {ProductsItem} from "@/features/products/components/products-item.jsx";

export const FavoriteProductsInner = () => {
  const {state: {likes}} = useAppContext();


  return (
    <Grid container maxWidth={"lg"} sx={{mx: "auto !important", width: "100%", py: 10}} spacing={{xs: 2, sm: 3, md: 4, lg: 6}}>
      {likes?.map((product, index) => <Grid key={product?.id} item xs={12} sm={6} md={4}><ProductsItem product={product} index={index} /></Grid>)}
    </Grid>
  )
}