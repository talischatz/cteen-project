export const localStorageMiddleware = store => next => action => {
  let result = next(action);

  if ([
    'shoppingCart/setGroupedProducts',
    'shoppingCart/removeOrDecreaseProduct',
    'shoppingCart/emptyCart'
  ].includes(action.type)) {
    localStorage.setItem('shoppingCart', JSON.stringify(store.getState().shoppingCart));
  }

  return result;
};
