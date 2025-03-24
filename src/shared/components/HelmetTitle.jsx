import {Helmet} from "react-helmet";

export const HelmetTitle = ({children}) => {
  return (
    <Helmet>
      <title>{children}</title>
    </Helmet>
  )
}