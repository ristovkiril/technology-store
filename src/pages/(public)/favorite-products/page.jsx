import {HelmetTitle} from "@/shared/components/HelmetTitle.jsx";
import {FavoriteProductsInner} from "@/features/product/favorite-products-inner.jsx";


export const FavoriteProductsPage = () => {

  return (
    <>
      <HelmetTitle>Vite Template - Favorite Products</HelmetTitle>
      <FavoriteProductsInner />
    </>
  )
}