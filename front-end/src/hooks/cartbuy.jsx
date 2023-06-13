import { createContext, useContext, useState, useEffect } from "react";

export const CartBuyContext = createContext({});

function CartProvider({ children }) {
  const [cartBuy, setCartBuy] = useState(JSON.parse(localStorage.getItem(`@foodexplorer:cart`)) || []
  );

  const [orders, setOrders] = useState([]);

  function handleAddFoodToCart(data, amount, image) {
    try {
      const { id, title, price } = data;
      const priceFormatted = amount * Number(price.replace(",", "."));

      const order = { id, title, price: priceFormatted, image, amount };

      const orderExists = cartBuy.some(
        (userOrder) => userOrder.title === order.title
      );
      if (orderExists) {
        return alert("Esse item já está no carrinho");
      }

      setCartBuy((prevState) => [...prevState, order]);
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Não foi possível adicionar o item");
      }
    }

    alert("Item adicionado");
  }

  function handleRemoveFoodFromCart(deleted) {
    setCartBuy((prevState) => prevState.filter((item) => item.id !== deleted));
  }

  const total = cartBuy.reduce((value, item) => {
    return value + item.price;
  }, 0);

  async function handleEraseCart() {
    localStorage.removeItem(`@foodexplorer:cart`);
    setCartBuy([]);
  }

  useEffect(() => {
    localStorage.setItem(`@foodexplorer:cart`, JSON.stringify(cartBuy));
  }, [cartBuy]);

  return (
    <CartBuyContext.Provider
      value={{
        cartBuy,
        handleAddFoodToCart,
        handleRemoveFoodFromCart,
        total: String(total.toFixed(2)).replace(".", ","),
        orders,
        setOrders,
        handleEraseCart,
      }}
    >
      {children}
    </CartBuyContext.Provider>
  );
}

function useCart() {
  const context = useContext(CartBuyContext);
  return context;
}

export { CartProvider, useCart };
