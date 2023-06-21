import { Container } from './styles'

import { ButtonText } from '../ButtonText'

import { useNavigate } from 'react-router-dom'
import imageError401 from '../../assets/401 Error Unauthorized.svg'

import { RiArrowLeftSLine } from 'react-icons/ri';
import { Link } from "react-router-dom";

export function PageError() {
  const navigate = useNavigate()

  function handleBackPage() {
    navigate("/")
  }

  return (
    <Container>
      <header>
        <Link to="/">
          <ButtonText title="Voltar" icon={RiArrowLeftSLine} onClick={handleBackPage} />
        </Link>
      </header>

      <div className="content">
        <img src={imageError401} alt="Imagem de erro 401: Acesso não autorizado" />

        <div>
          <h3>Infelizmente você não possuiu um acesso autoriazado</h3>
        </div>
      </div>
    </Container>
  )
}