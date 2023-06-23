// Styling Imports
import { Container, Content, PaymentCard } from "./styles.js";

import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { ListCard } from "../../components/ListCard";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { PageError } from "../../components/PageError";

import { api } from "../../services/api";
import { useAuth } from "../../hooks/auth";
import { useCartBuy } from '../../hooks/cartBuy';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

import { BsReceipt } from 'react-icons/bs';
import logoPix from '../../assets/pix.svg';
import cardImg from '../../assets/CreditCard.svg';
import qrCode from '../../assets/qrcode.svg';
import cartImg from '../../assets/cart.svg';
import clock from '../../assets/clock.svg';
import checkCircle from '../../assets/CheckCircle.svg';

export function CartBuy() {
  const { user } = useAuth()

  const { cartBuy, total, handleEraseCart } = useCartBuy();

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  function handleCreatedCartBuy(cartBuy) {
    return {
      orderStatus: '🔴 Pendente',
      paymentMethod: pixActive ? 'pix' : 'creditCard',
      totalPrice: total,
      cartBuy: cartBuy.map(item => (
        {
          id: item.id,
          title: item.title,
          amount: item.amount
        }
      ))
    }
  }

  async function handleCartPayment(cartBuy) {

    const newCart = handleCreatedCartBuy(cartBuy)

    if (cartBuy.length < 1) {
      navigate(-1);
      return alert("Carrinho vazio");
    }

    if (!pixActive && num.length < 16) {
      alert("O número do cartão não esta completo, complete com um número valido");
      return;
    }

    if (!pixActive && date.length < 4) {
      return alert("A validade do cartão não esta completa, complete com uma data valida");
    }

    if (!pixActive && cvc.length < 3) {
      return alert("O CVC do cartão não esta completo, complete com uma numeração valida");
    }

    setLoading(true);

    await api.post("/orders", newCart)
      .then(() => {
        disableButton();
        setTimeout(() => {
          alert("Seu pedido foi cadastrado");
          navigate(-1);
          handleEraseCart();

        }, 7000);
      })
      .catch(error => {
        if (error.response) {
          alert(error.response.data.message);
        } else {
          alert("Algo aconteceu não foi posssível cadastrar");
        }
      });

    setLoading(false);
  }

  const [num, setNum] = useState('');
  const [cvc, setCvc] = useState('');

  const handleModificationNumber = event => {
    const limit = 16;
    setNum(event.target.value.slice(0, limit));
  };

  const handleModificationCvc = event => {
    const limit = 3;
    setCvc(event.target.value.slice(0, limit));
  };

  const [isPixVisible, setIsPixVisible] = useState(false);
  const [isCreditVisible, setIsCreditVisible] = useState(false);
  const [isCartVisible, setIsCartVisible] = useState(true);
  const [pixActive, setPixActive] = useState(false);
  const [creditActive, setCreditActive] = useState(false);
  const [isClockActive, setIsClockActive] = useState(false);
  const [isApprovedActive, setIsApprovedActive] = useState(false);

  const handlePaymentPix = () => {
    setIsPixVisible(true);
    setIsCreditVisible(false);
    setIsCartVisible(false);
    setPixActive(true);
    setCreditActive(false);
  };

  const handlePaymentCredit = () => {
    setIsCreditVisible(true);
    setIsPixVisible(false);
    setIsCartVisible(false);
    setCreditActive(true);
    setPixActive(false);
  };

  const [disabledButton, setDisabledButton] = useState(false);

  const disableButton = () => {
    setDisabledButton(true);

    setIsCreditVisible(false);
    setIsPixVisible(false);

    setIsClockActive(true);
    setIsApprovedActive(false);
    setTimeout(() => {
      setIsClockActive(false);
      setIsApprovedActive(true);

    }, 4000);
  }

  return (
    <Container>
      <Header />
      {
        user.isAdmin ?
          <PageError />
          :
          <Content>
            <div className="card">
              <div className="order">
                <h2>Pedido</h2>
                <div className="details">
                  {
                    cartBuy &&
                    cartBuy.map(item => (
                      <ListCard
                        key={String(item.id)}
                        data={item}
                      />
                    ))
                  }
                </div>

                <div className="full">
                  <p>Total: R$<span>{total}</span></p>
                </div>
              </div>

              <PaymentCard>
                <div className="paymentTop">
                  <h2>Pagamento</h2>

                  <div className="buttons">
                    <button className={pixActive === true ? 'active' : ''} disabled={disabledButton} onClick={handlePaymentPix}>
                      <img src={logoPix} alt="Logo Pix" />
                      PIX
                    </button>

                    <button className={creditActive === true ? 'active' : ''} disabled={disabledButton} onClick={handlePaymentCredit}>
                      <img src={cardImg} alt="Logo Cartão de Crédito" />
                      Crédito
                    </button>
                  </div>
                </div>

                <div className="paymentContent">

                  {isCartVisible &&
                    <div className="cart" id="cart">
                      <img src={cartImg} alt="Carrinho de compras" />
                      <p>Forma de pagamento</p>
                    </div>
                  }

                  {isPixVisible &&
                    <div className={pixActive === false ? 'active' : ''} id="paymentPix">
                      <div className="qrCodePayment">
                        <img src={qrCode} alt="Imagem do QRCode" />
                      </div>

                      <Button
                        title={loading ? "Finalizando pagamento" : "Finalizar pagamento"}
                        disabled={loading}
                        icon={BsReceipt}
                        style={{ height: 50 }}
                        className="finishPaymentButton"
                        onClick={() => { handleCartPayment(cartBuy) }}
                      />
                    </div>
                  }

                  {isCreditVisible &&

                    <div className="paymentCredit" id="paymentCredit">
                      <div className="inputs">
                        <p>Número do Cartão</p>
                        <Input
                          placeholder="0000 0000 0000 0000"
                          type="number"
                          id="num"
                          name="num"
                          value={num}
                          onChange={handleModificationNumber}
                        />
                      </div>

                      <div className="valid">
                        <div>
                          <p>Validade</p>
                          <Input
                            placeholder="MM/AA"
                            type="text"
                            id="date"
                            name="date"
                            maxLength="5"
                          />
                        </div>

                        <div>
                          <p>CVC</p>
                          <Input
                            placeholder="***"
                            type="number"
                            id="cvc"
                            name="cvc"
                            value={cvc}
                            onChange={handleModificationCvc}
                          />
                        </div>
                      </div>

                      <Button
                        title={loading ? "Finalizando pagamento" : "Finalizar pagamento"}
                        disabled={loading}
                        icon={BsReceipt}
                        style={{ height: 56 }}
                        className="finishPaymentButton"
                        onClick={() => { handleFinishPayment(cartBuy) }}
                      />
                    </div>
                  }

                  {isClockActive &&

                    <div className="clock" id="clock">
                      <img src={clock} alt="Imagem do QRCode" />
                      <p>Aguarde: Estamos processando o seu pagamento</p>
                    </div>
                  }

                  {isApprovedActive &&

                    <div className="approved" id="approved">
                      <img src={checkCircle} alt="Imagem de pagamento aprovado" />
                      <p>Pagamento aprovado</p>
                    </div>
                  }
                </div>
              </PaymentCard>
            </div>
          </Content>
      }
      <Footer />
    </Container>
  );
}