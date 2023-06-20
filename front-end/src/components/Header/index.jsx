import {
  Container,
  Content,
  LogoFood,
  Search,
  Logout,
  Button,
  ButtonMenu,
  Profile,
} from "./styles";

import { Link } from "react-router-dom";

import {
  FiSearch,
  FiLogOut,
  FiUser,
  FiShoppingBag,
  FiHeart,
} from "react-icons/fi";
import { BsReceipt } from "react-icons/bs";

import logoFoodExplorer from "../../assets/logo.svg";

import { useAuth } from "../../hooks/auth";
import { useCart } from "../../hooks/cart";

export function Header({ search, filteringYourFavorites }) {
  const { user } = useAuth();
  const { signOut } = useAuth();

  const { cartBuy, orders } = useCart();

  function mobileForAcessMenu() {
    document.getElementById("hamburger").classList.toggle("active");
    document.getElementById("nav-menu").classList.toggle("active");
  }

  function userForAcessMenu() {
    document.getElementById("user-menu").classList.toggle("active");
  }

  return (
    <Container>
      <Content>
        <LogoFood>
          <div className="logoStamp">
            <Link to="/">
              <img src={logoFoodExplorer} alt="" />
              <h1>food explorer</h1>
            </Link>
          </div>
        </LogoFood>

        <div className="hamburger" id="hamburger" onClick={mobileForAcessMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>

        <div className="nav-menu" id="nav-menu">
          <Search>
            <label>
              <FiSearch size={26} />
              <input
                type="text"
                placeholder="Procure por mais opções de pratos no cardapio"
                onChange={(e) => {
                  search(e.target.value);
                }}
              />
            </label>
          </Search>

          {user.isAdmin ? (
            <Link to="/orders">
              <Button type="button">
                <BsReceipt size={26} />
                Seus pedidos <span>({orders.length})</span>
              </Button>
            </Link>
          ) : (
            <Link to="/car">
              <Button type="button">
                <BsReceipt size={26} />
                Carrinho <span>({cartBuy.length})</span>
              </Button>
            </Link>
          )}

          {user.isAdmin ? (
            <Link to="/profile">
              <Profile>
                <FiUser />
              </Profile>
            </Link>
          ) : (
            <Profile onClick={userForAcessMenu}>
              <FiUser />
              <div className="user-menu" id="user-menu">
                <Link to="/orders">
                  <ButtonMenu>
                    <FiShoppingBag size={26} />
                    Seus Pedidos
                  </ButtonMenu>
                </Link>

                <Link to="/">
                  <ButtonMenu onClick={filteringYourFavorites}>
                    <FiHeart size={26} />
                    Seus Favoritos
                  </ButtonMenu>
                </Link>

                <Link to="/profile">
                  <ButtonMenu>
                    <FiUser size={26} />
                    Meu Perfil
                  </ButtonMenu>
                </Link>
              </div>
            </Profile>
          )}

          <Logout to="/" onClick={signOut}>
            <FiLogOut />
          </Logout>
        </div>
      </Content>
    </Container>
  );
}
