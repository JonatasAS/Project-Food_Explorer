import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-self: flex-start;
    
    width: 40rem;
    max-height: 48rem;

    font-family: 'Poppins', sans-serif;
    font-size: 2.2rem;

    > .card {
        display: flex;
        align-self: flex-start;
        align-items: center;
        
        height: 10rem;
        gap: 1rem;
        overflow: auto;
    }

    > .card strong {
            margin-right: 1.4rem;
        }

    > .card span {
            margin-left: 1.3rem;
            font-size: 1.3rem;
            font-weight: 400;
        }

    img {
        width: 7rem;
        height: 7rem;
    }
`;