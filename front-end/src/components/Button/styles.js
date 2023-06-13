import styled from "styled-components";

export const Container = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 4.5rem;
    padding: 1.3rem 3.4rem;
    gap: 0.9rem;
    border: none;
    border-radius: 0.8rem;
    
    font-weight: 600;
    font-size: 1.6rem;

    color: ${({ theme }) => theme.COLORS.WHITE};
    background-color: ${({ theme }) => theme.COLORS.CYAN_BLUE};
`;
