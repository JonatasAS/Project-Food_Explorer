import { Container, Content, Logo } from "./styles";
import logoExplorerGray from "../../assets/logo_gray.svg";

export function Footer() {
  return (
    <Container>
      <Content>
        <Logo>
          <div className="logoStamp">
            <img src={logoExplorerGray} alt="Selo como marca" />
            <span>food explorer</span>
          </div>
        </Logo>
        <p>© 2023 - Todos os direitos reservados.</p>
        <a href="https://www.rocketseat.com.br/">Parceiros</a>
      </Content>
    </Container>
  );
}
