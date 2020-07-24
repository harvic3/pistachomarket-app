import React, { useEffect, useState } from "react";
import hookSearch from "./hooks/hookSearch";
import Header from "./components/Header/index";
import ProductList from "./components/ProductList/index";
import { ToastContainer, toast } from "react-toastify";
import {
  SHOPPING_CAR_STORAGE_KEY,
  urlPistachioV1ShoppingCar,
} from "./utils/constants";
import axios from "axios";
import axiosClient from "./utils/axiosClient";
import carTool from "./utils/carTool";

function App() {
  const [shoppingCar, setShoppingCar] = useState(null);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [filterName, setFilterName] = useState(null);
  const [selectedCats, setSelectedCats] = useState([]);
  const [message, setMessage] = useState(null);

  const productList = hookSearch(page, perPage, filterName, selectedCats);

  useEffect(() => {
    loadCar();
  });

  const loadCar = () => {
    if (shoppingCar) {
      return;
    }
    const localCar = getCarFromStorage(SHOPPING_CAR_STORAGE_KEY);
    if (localCar) {
      setShoppingCar(localCar);
      return;
    }
    setShoppingCar(null);
  };

  const addProductToCar = async (detail) => {
    if (!shoppingCar) {
      const created = await carTool.createShoppingCar(detail, setShoppingCar, saveCarLocaly, toast);
      if (created) {
        toast.success("Product was added.");
      }
      return;
    }
    const itemExists = carTool.itemExists(detail.id, shoppingCar.carItems);
    if (itemExists) {
      toast.info("Item already exist");
      return;
    }
    const added = await carTool.addItemToShoppingCar(detail, shoppingCar, setShoppingCar, saveCarLocaly, toast);
    if (added) {
      toast.success("Product was added.");
    }
  };

  const emptyCar = async () => {
    await carTool.emptyShoppingCar(shoppingCar, setShoppingCar, saveCarLocaly, toast);
  };
 
  const removeItem = async (detail) => {
    await carTool.removeItemFromShoppingCar(detail, shoppingCar, setShoppingCar, saveCarLocaly, toast, carTool.itemExists(detail.productDetail.id, shoppingCar.carItems));
  };

  const saveCarLocaly = (car) => {
    localStorage.setItem(SHOPPING_CAR_STORAGE_KEY, JSON.stringify(car));
  };

  const getCarFromStorage = () => {
    const localCar = localStorage.getItem(SHOPPING_CAR_STORAGE_KEY);
    if (localCar) {
      return JSON.parse(localCar);
    }
    return null;
  };

  const proccessAxiosError = (axiosError) => {
    const error = axiosError.response;
    return error && error.data ? error.data.error : "Something went wrong!! ;)";
  };

  return (
    <div>
      <Header shoppingCar={shoppingCar} emptyShoppingCar={emptyCar} removeItem={removeItem} />
      <ProductList
        data={productList}
        addProductToCar={addProductToCar}
        setPage={setPage}
        setFilterName={setFilterName}
        setSelectedCats={setSelectedCats}
      />
      <ToastContainer
        position="bottom-left"
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

export default App;
