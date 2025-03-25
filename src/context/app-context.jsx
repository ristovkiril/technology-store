import {createContext, useContext, useEffect, useReducer} from "react";

const initialState = {
  products: [],
  cart: [],
  likes: []
}
const AppContext = createContext({
  ...initialState
})

const reducer = (state, action) => {
  return {...state, ...action}
};

export const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://gist.githubusercontent.com/ristovkiril/12c19d85a3fc8212838764b139b313c6/raw/6882eb27b9496e5aa09149c13d93a6529be9ec08/products.json');

      if (response.ok) {
        const products = await response.json() || []
        if (products && products.length > 0) {
          dispatch({products: products || []})
        }
      }

    }
    const getFromStorage = () => {
      if (localStorage.getItem('likes')) {
        const newItems = JSON.parse(localStorage.getItem('likes'))
        dispatch({likes: newItems || []})
      }
      if (localStorage.getItem('cart')) {
        const newItems = JSON.parse(localStorage.getItem('cart'))
        dispatch({cart: newItems || []})
      }
    }
    getFromStorage();
    fetchData().then(() => console.log("Fetch products finished successfully"));
  }, [])

  return (
    <AppContext.Provider
      value={{state, dispatch}}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => useContext(AppContext);
