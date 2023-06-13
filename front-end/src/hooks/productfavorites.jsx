import { createContext, useContext, useState, useEffect } from "react";

export const FavoritesBuyContext = createContext({});

function FavoritesProvider({ children }) {
  const [favoritesBuy, setBuyFavorites] = useState(
    JSON.parse(localStorage.getItem(`@foodexplorer:favorites`)) || []
  );

  function addFoodToFavorite(data) {
    setBuyFavorites([...favoritesBuy, data]);
  }

  function removeFoodFromFavorite(data) {
    setBuyFavorites(favoritesBuy.filter((dish) => dish.id !== data.id));
  }

  useEffect(() => {
    localStorage.setItem(
      `@foodexplorer:favorites`,
      JSON.stringify(favoritesBuy)
    );
  }, [favoritesBuy]);

  return (
    <FavoritesBuyContext.Provider
      value={{
        favoritesBuy,
        addFoodToFavorite,
        removeFoodFromFavorite,
      }}
    >
      {children}
    </FavoritesBuyContext.Provider>
  );
}

function useFavoritesBuy() {
  const context = useContext(FavoritesBuyContext);
  return context;
}

export { FavoritesProvider, useFavoritesBuy };
