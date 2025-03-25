import {Box, Fade, IconButton, Skeleton, Slide, Stack, Typography} from "@mui/material";
import {useEffect, useMemo, useState} from "react";
import {IconHeart, IconChevronLeft, IconChevronRight, IconHeartFilled} from "@tabler/icons-react";
import {useAppContext} from "@/context/app-context.jsx";
import {useNavigate} from "react-router-dom";

const style = {
  cursor: "pointer",
  p: {xs: 2},
  "&:hover": {
    transform: "scale(1.1)"
  }
}

const btnStyle = {
  opacity: 0, color: "#f6f4f4",
  backdropFilter: "blur(4px)", position: "absolute", top: "50%", transform: "translateY(-50%)",
  left: 5, bgcolor: "rgba(0,0,0, 0.2)", "&:hover": {bgcolor: "rgba(0,0,0, 0.3)"}
}

export const ProductsItem = ({product, index}) => {
  const [show, setShow] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);
  const {state: {likes}, dispatch} = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => setShow(true), index * 300);

    return () => clearTimeout(timeout);
  }, [index])

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

  const onLike = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    const isLiked = isProductLiked();
    console.log(isLiked, likes, product)
    if (isLiked) {
      const newState = likes?.filter(i => i?.id !== product?.id);
      dispatch({likes: newState})
    } else {
      dispatch({likes: [...likes, product]})
    }
  }

  const isProductLiked = () => {
    return likes?.findIndex(i => i?.id === product?.id) >= 0;
  }

  const isLiked = useMemo(() => {
    return isProductLiked();
  }, [product, likes])

  const image = useMemo(() => {
    if (product?.images[imgIndex]) {
      return <Slide in timeout={300} direction={"left"}>
        <img src={product?.images[imgIndex]} alt={"product"} width={"100%"} height={"200px"} style={{objectFit: "contain"}}/>
      </Slide>
    }
    return null;
  }, [product?.images, imgIndex])

  return (
    <>
      <Fade in={show} timeout={150}>
        <Stack direction={"column"} onClick={() => navigate(`/product/${product?.id}`)} gap={1} sx={{...style}}>
          <Box sx={{position: "relative", "&:hover > .btn": {opacity: 1} }}>
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
          <Stack direction={"row"} gap={2} justifyContent={"space-between"}>
            <Box>
              <Typography fontSize={"1em"} fontWeight={600}>{product?.product_name}</Typography>
              <Typography fontSize={"0.95em"} fontWeight={400}>${product?.price}</Typography>
            </Box>
            <Stack direction={"row"} gap={1}>
              <Box>
                <IconButton onClick={onLike}>
                  {isLiked ? <IconHeartFilled color={"red"} /> : <IconHeart />}
                </IconButton>
              </Box>
            </Stack>
          </Stack>
        </Stack>
      </Fade>
      {!show && <ProductSkeleton/>}
    </>
  )
}

const ProductSkeleton = () => {

  return (
    <Stack direction={"column"} gap={1}>
      <Skeleton width={"100%"} height={"200px"}/>
      <Stack direction={"row"} gap={2} justifyContent={"space-between"}>
        <Box>
          <Skeleton width={"50px"} height={"20px"}/>
          <Skeleton width={"20px"} height={"14px"}/>
        </Box>
        <Stack direction={"row"} gap={1}>
          <IconHeart/>
        </Stack>
      </Stack>
    </Stack>
  )
}