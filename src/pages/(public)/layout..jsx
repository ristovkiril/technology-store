import {HelmetTitle} from "@/shared/components/HelmetTitle.jsx";
import {PublicLayoutInner} from "@/features/layouts/public-layout/public-layout-inner.jsx";


export const PublicLayout = () => {
  return (
    <>
      <HelmetTitle>Vite Template - Authenticate</HelmetTitle>
      {/* <Header /> */}

      <PublicLayoutInner/>
    </>
  )
}