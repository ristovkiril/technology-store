import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import {RootLayout} from "@/pages/root-layout.jsx";
import {AuthRedirect} from "@/pages/auth-redirect/page.jsx";
import {UnAuthedLayout} from "@/pages/(unauthed)/layout.jsx";
import {AuthedLayout} from "@/pages/(authed)/layout.jsx";
import {RegisterPage} from "@/pages/(unauthed)/register/page.jsx";
import {LoginPage} from "@/pages/(unauthed)/login/page.jsx";
import {ForgotPasswordPage} from "@/pages/(unauthed)/forgot-password/page.jsx";
import {DashboardPage} from "@/pages/(authed)/dashboard/page.jsx";
import {ProfilePage} from "@/pages/(authed)/profile/page.jsx";
import {ContactUsPage} from "@/pages/(authed)/contact-us/page.jsx";
import {ProductsPage} from "@/pages/(public)/products/page.jsx";
import {PublicLayout} from "@/pages/(public)/layout..jsx";
import {ProductPage} from "@/pages/(public)/product/page.jsx";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path={"/"} element={<RootLayout/>}>
      <Route index element={<AuthRedirect/>}/>

      <Route element={<PublicLayout/>}>
        <Route path="products" element={<ProductsPage/>}/>
        <Route path="product/:id" element={<ProductPage/>}/>
      </Route>
      {/* (unauthed) */}
      <Route element={<UnAuthedLayout/>}>
        <Route path="forgot-password" element={<ForgotPasswordPage/>}/>
        <Route path="login" element={<LoginPage/>}/>
        <Route path="register" element={<RegisterPage/>}/>
      </Route>

      {/* (authed) */}
      <Route element={<AuthedLayout/>}>
        <Route path="dashboard" element={<DashboardPage/>}/>
        <Route path="my-profile" element={<ProfilePage/>}/>
        <Route path="contact-us" element={<ContactUsPage/>}/>
        <Route path="*" element={<>Not Found!</>}/>
      </Route>
    </Route>
  )
)

export const RootRouterProvider = () => <RouterProvider router={router}/>
