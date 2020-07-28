import React, { createContext, useReducer } from "react";

const initialState = { 
  shoppingCar: {},
  carHasItems: false,
  page: 1,
  perPage: 10, 
  selectedCats: [], 
  filterName: null,
  numberItems: 0,
};
const store = createContext(initialState);
const { Provider } = store;

const actions = {
  SET_SHOPPING_CAR: "SET_SHOPPING_CAR",
  SET_PAGE: "SET_PAGE",
  SET_PER_PAGE: "SET_PER_PAGE",
  SET_FILTER_NAME: "SET_FILTER_NAME",
  SET_SELECTED_CATEGORIES: "SET_SELECTED_CATEGORIES",
}

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case actions.SET_SHOPPING_CAR:
        const itemsCount = action.value.carItems?.length || 0;
        const carHasItems = itemsCount > 0 ? true : false;
        return {...state, shoppingCar: action.value, carHasItems, numberItems: itemsCount };
      default:
        return {...state};
    }
  }, initialState);
  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider, actions }
