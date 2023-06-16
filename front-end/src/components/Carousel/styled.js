import styled from "styled-components";

export const Container = styled.footer`
    width: 100%;
    height: 51rem;
    align-items: center;
    margin-bottom: 6rem;

    @keyframes scale-up-center {
        0% {
            transform: scale(1);
        }
        100% {
            transform: scale(1.3);
        }
    }
`;

export const Content = styled.div`
    .swiper {
        width: 100%;
        height: 100%;
    }
    
    .swiper-slide {
        display: -webkit-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        -webkit-justify-content: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        -webkit-align-items: center;
        align-items: center;
        gap: 3rem;
    }
    
    .swiper-button-next,
    .swiper-button-prev {
        width: 9rem;
        height: 50rem;
        margin: -24rem -1rem;
        
        color: ${({ theme }) => theme.COLORS.CYAN_BLUE};
        font-weight: bolder;
        mask-image: none;
    }

    .swiper-button-next:hover,
    .swiper-button-prev:hover {
	    animation: scale-up-center 0.5s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
    }

    .swiper-button-prev {
        background: linear-gradient(to left, transparent 0%, ${({ theme }) => theme.COLORS.BACKGROUND_900} 100% 0%, transparent 100%);
    }

    .swiper-button-next {
        background: linear-gradient(to right, transparent 0%, ${({ theme }) => theme.COLORS.BACKGROUND_900} 100% 0%, transparent 100%);
    }
`;








