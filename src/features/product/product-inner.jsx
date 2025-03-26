import {
  Box,
  Button,
  Grid,
  IconButton, Input,
  Slide,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography
} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useMemo, useState} from "react";
import {useAppContext} from "@/context/app-context.jsx";
import {
  IconChevronLeft,
  IconChevronRight,
  IconCircleFilled,
} from "@tabler/icons-react";

const style = {
  cursor: "pointer",
  p: {xs: 2},

}

const btnStyle = {
  opacity: 0, color: "#f6f4f4",
  backdropFilter: "blur(4px)", position: "absolute", top: "50%", transform: "translateY(-50%)",
  left: 5, bgcolor: "rgba(0,0,0, 0.2)", "&:hover": {bgcolor: "rgba(0,0,0, 0.3)"}
}

export const ProductInner = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const {state: {products, cart}, dispatch} = useAppContext();
  const [product, setProduct] = useState(null);
  const [imgIndex, setImgIndex] = useState(0);

  useEffect(() => {
    if (id && products?.length) {
      const product = products?.find(i => +i?.id === +id);
      if (product) {
        setProduct(product);
      } else {
        navigate("/products")
      }
    }
  }, [products, id])


  const handleNextImage = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setImgIndex((prevIndex) => {
      console.log((prevIndex + 1) % product.images.length)
      return (prevIndex + 1) % product.images.length
    });
  };

  const handlePrevImage = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setImgIndex((prevIndex) => {
      console.log((prevIndex - 1 + product.images.length) % product.images.length)
      return (prevIndex - 1 + product.images.length) % product.images.length
    });
  };

  const onAddToCart = () => {
    let newState = [...cart, product];

    dispatch({cart: newState})
    localStorage.setItem("cart", JSON.stringify(newState));
  }

  const image = useMemo(() => {
    if (product?.images[imgIndex]) {
      return (
        <Slide in timeout={300} direction={"left"}>
          <img
            src={product?.images[imgIndex]}
            alt={"product"}
            style={{
              height: "inherit",   // Ensure full height
              width: "100%",     // Maintain aspect ratio
              objectFit: "contain", // Fit inside container without cropping
              maxHeight: "inherit",
            }}
          />
        </Slide>
      );
    }
    return null;
  }, [product?.images, imgIndex]);

  const {color, status, available} = useMemo(() => {
    const count = cart?.filter(i => +i?.id === +product?.id)?.length || 0;
    let color = "#47bd2c";
    let status = "Available";
    const available = ((product?.quantity || 0) - count) || 0
    if (available <= 0) {
      color = "#4d4d4d";
      status = "Not Available";
    }
    else if (available < 5) {
      color = "red";
      status = "Low Stock";
    }
    else if (available < 10) {
      color = "orange";
      status = "Medium Stock";
    }
    return {color, status, available}
  }, [cart, product])

  return (
    <>
      <Grid container spacing={2} maxWidth={"xl"} sx={{mx: "auto", maxHeight: "calc(100dvh - 48px)", height: "100dvh"}}>
        <Grid item xs={12} sm={12} md={6} sx={{maxHeight: {xs: "60dvh", md: "calc(100dvh - 48px)"}, height: "100%"}}>
          <Stack direction={"column"} gap={3} sx={{...style}}>
            <Box sx={{
              position: "relative",
              maxHeight: {xs: "40dvh", md: "70dvh"},
              height: {xs: "300px", md: "400px"},
              maxWidth: "calc(100%)",
              "&:hover > .btn": {opacity: 1}
            }}>
              <IconButton
                size={"small"} className={"btn"} onClick={handlePrevImage}
                sx={{...btnStyle}}
              >
                <IconChevronLeft size={15}/>
              </IconButton>
              {image}
              <IconButton
                size={"small"} className={"btn"} onClick={handleNextImage}
                sx={{...btnStyle, right: 5, left: undefined}}
              >
                <IconChevronRight size={15}/>
              </IconButton>
            </Box>
            <Stack direction={"row"} gap={2} justifyContent={"flex-start"}>
              {product?.images?.map((image, index) =>
                <Box key={image} sx={{width: "80px", height: "80px"}}>
                  <img src={image} alt={"product"} width={"100%"} height={"100%"}
                       onClick={() => setImgIndex(index)}
                       style={{
                         objectFit: "contain", maxHeight: "inherit",
                         opacity: imgIndex !== index ? 0.6 : 1, // Lower opacity for non-selected images
                         filter: imgIndex !== index ? "brightness(1.2)" : "none",
                       }}
                  />
                </Box>
              )}
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={12} md={6}
              sx={{maxHeight: "calc(100dvh - 48px)", height: {xs: "auto", md: "calc(100% - 48px)"}, pb: 5, maxWidth: "calc(100% - 16px)", overflowY: "auto"}}>
          <Stack direction={"column"} maxWidth={"sm"} gap={3} justifyContent={"center"} sx={{position: "relative", height: {xs: "auto", md: "calc(100% - 48px)"}, mx: "auto", width: "calc(100% - 32px)"}}>
            <Box sx={{mt: "auto"}}>
              <Typography fontSize={"1.1em"} fontWeight={600}>{product?.product_name}</Typography>
              <Typography variant={"body2"} fontSize={"0.9em"}>{product?.manufacturer}</Typography>
            </Box>
            <Table border={1} sx={{borderColor: "divider"}}>
              <TableBody>
                {
                  Object.entries(product?.specifications || {})
                    ?.map(([key, value]) => (
                      <TableRow key={key}>
                        <TableCell sx={{textTransform: "capitalize", fontWeight: 600, p: 1}}>{key}</TableCell>
                        <TableCell sx={{textTransform: "capitalize", p: 1}}>{value}</TableCell>
                      </TableRow>
                    ))
                }
              </TableBody>
            </Table>
            <Stack direction={"row"} gap={1} alignItems={"center"} sx={{mb: "auto"}} useFlexGap flexWrap={"wrap"}>
              <Typography fontSize={"0.95em"} fontWeight={500} sx={{width: "100%"}}>Availability:</Typography>
              <IconCircleFilled size={15} color={color} />
              <Typography fontSize={"0.95em"}>{status}</Typography>
            </Stack>
            <Stack direction={"row"} gap={2} sx={{mt: "auto", width: "100%"}}>
              <Button onClick={onAddToCart} disabled={available <= 0} variant={"contained"} color={"success"} sx={{borderRadius: 1, flex: 1}}>
                Add To Cart
              </Button>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </>
  )
}