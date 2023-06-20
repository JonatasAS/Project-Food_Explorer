import styled from "styled-components";

export const Container = styled.textarea`
    width: 100%;
    height: 17rem;
    padding: 1.6rem;

    border-radius: 0.5rem;
    border: 2px solid ${({ theme }) => theme.COLORS.WHITE}; 
    
    resize: none;
    
    color: ${({ theme }) => theme.COLORS.WHITE};
    background-color: ${({ theme }) => theme.COLORS.BACKGROUND_800};

    &::placeholder {
        color: ${({ theme }) => theme.COLORS.GRAY_200};
    }

    &:focus {
        -webkit-box-shadow: 0px 0px 10px 5px ${({ theme }) => theme.COLORS.CYAN_100}; 
        box-shadow: 0px 0px 10px 5px ${({ theme }) => theme.COLORS.CYAN_100};
    }
`;
