//====import styles====//
import { Container, Content, CardBuy } from "./styled.js";

import { Button } from "../Button";
import { ButtonText } from "../ButtonText";

import { useAuth } from "../../hooks/auth";
import { useProductFavorites } from "../../hooks/productfavorites.jsx";
import { useCartBuy } from "../../hooks/cartbuy.jsx";
import { useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../services/api";

import { BsReceipt } from "react-icons/bs";
import { FiMinus, FiPlus } from "react-icons/fi";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import imgPlaceholder from "../../assets/image-not-found-icon.svg";

export function Card({ data, ...rest }) {
  const { user } = useAuth();

  const imageURL = data.image
    ? `${api.defaults.baseURL}/files/${data.image}`
    : imgPlaceholder;

  const { favoritesBuy, addFoodToFavorite, removeFoodFromFavorite } =
    useProductFavorites();
  const isFavorite = favoritesBuy.some((dish) => dish.title === data.title);

  const { handleAddFoodToCart } = useCartBuy();

  const [amount, setAmount] = useState(1);

  const addValue = () => {
    if (amount > 19) {
      alert("Você atingiu o número máximo armazenado no carrinho de 20 itens!");
      return;
    }
    setAmount((count) => count + 1);
  };

  const removeValue = () => {
    if (amount < 2) {
      alert("Necessário atingir no mínimo 1 item no carrinho!");
      return;
    }
    setAmount((count) => count - 1);
  };

  return (
    <Container {...rest}>
      {user.isAdmin ? (
        <Content>
          <div className="container">
            <img src={imageURL} alt="Imagem do item" />
            <Link to={`/details/${data.id}`}>
              <h3 className="product-title-food">
                {data.title}
                {" >"}
              </h3>
            </Link>
            <p className="description">{data.description}</p>
            <h1 className="price">R$ {data.price}</h1>
            <Link to={`/editDish/${data.id}`}>
              <Button title="editar food" icon={BsReceipt} />
            </Link>
          </div>
        </Content>
      ) : (
        <Content>
          <button
            className="favoritesButton"
            onClick={() =>
              isFavorite
                ? removeFoodFromFavorite(data)
                : addFoodToFavorite(data)
            }
          >
            {isFavorite ? <AiFillHeart /> : <AiOutlineHeart />}
          </button>

          <div className="container">
            <img src={imageURL} alt="Imagem do item" />
            <Link to={`/details/${data.id}`}>
              <h3 className="product-title-food">
                {data.title}
                {" >"}{" "}
              </h3>
            </Link>
            <p className="description">{data.description}</p>
            <h1 className="price">R$ {data.price}</h1>

            <CardBuy>
              <div className="counter">
                <ButtonText icon={FiMinus} onClick={removeValue} />

                <span>{amount.toString().padStart(2, "0")}</span>

                <ButtonText icon={FiPlus} onClick={addValue} />
              </div>

              <Button
                title="Add"
                icon={BsReceipt}
                onClick={() => handleAddFoodToCart(data, amount, imageURL)}
                style={{ height: 55, width: 90, padding: "13px 5px" }}
              />
            </CardBuy>
          </div>
        </Content>
      )}
    </Container>
  );
}
