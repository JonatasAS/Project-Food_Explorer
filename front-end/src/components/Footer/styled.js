import styled from "styled-components";

export const Container = styled.footer`
    width: 100%;
    height: 7rem;
    
    align-items: center;
    background-color: ${({ theme }) => theme.COLORS.BACKGROUND_600};
`;

export const Content = styled.div`
        display: flex;
        justify-content: space-between;
        align-items: center;

        max-width: 121.2rem;
        padding: 0 4rem;
        margin: auto;

        color: ${({ theme }) => theme.COLORS.GRAY_300};

        > p {
            font-size: 1.2rem;
            font-family: 'DM Sans', sans-serif;
            text-align: right;
        }

        a {
            font-size: 1rem;
            font-family: 'DM Sans', sans-serif;
            text-align: left;
        }
`;

export const Logo = styled.div`
    .logoStamp {
        display: flex;
        
        height: 7rem;
        gap: 1rem;

        align-items: center;
        white-space: nowrap;

        color: ${({ theme }) => theme.COLORS.GRAY_300};
    }

    span {
        font-family: 'Roboto', sans-serif;
        font-size: 2rem;
        font-weight: 600;
        flex-wrap: wrap;
    }
`;