import { SHOPPING_CAR_STORAGE_KEY } from "./utils/constants";
import React, { useEffect, useContext } from "react";
import { store, actions } from "./store";
import hookSearch from "./hooks/hookSearch";
import Header from "./components/Header/index";
import ProductList from "./components/ProductList/index";
import { ToastContainer } from "react-toastify";

export default function App() {
  const { state, dispatch } = useContext(store);
  const { shoppingCar, numberItems } = state;

  const productList = hookSearch();

  useEffect(() => {
    loadCar();
  },[numberItems]);

  const loadCar = () => {
    if (shoppingCar.id) {
      saveCarChanges(shoppingCar);
      return;
    }
    const localCar = getCarFromStorage(SHOPPING_CAR_STORAGE_KEY);
    if (localCar) {
      dispatch({ type: actions.SET_SHOPPING_CAR, value: localCar });
    }
  };

  const saveCarChanges = (car) => {
    localStorage.setItem(SHOPPING_CAR_STORAGE_KEY, JSON.stringify(car));
  };

  const getCarFromStorage = () => {
    const localCar = localStorage.getItem(SHOPPING_CAR_STORAGE_KEY);
    if (localCar) {
      return JSON.parse(localCar);
    }
    return {};
  };

  return (
    <div>
      <Header />
      <ProductList data={productList} saveCarChanges={saveCarChanges} />
      <ToastContainer
        position="top-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}
