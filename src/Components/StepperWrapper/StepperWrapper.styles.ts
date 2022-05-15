import { Card } from '@mui/material'
import styled from 'styled-components'


export const mobileMaxPx = 760
export const Wrapper = styled.div`
min-height: 100vh;

margin: 2rem;

display: flex;
justify-content: center;
align-items: center;

&{
    animation: fadeIn 1s;

    @keyframes fadeIn{
        0% {opacity:0;}
        50% {opacity:0;}
        100% {opacity:1;}
    }
}

`


export const FormMapWrapper = styled.div`
    width: 100%;
    display: grid;
    gap: 1rem;
    grid-template-columns: 1fr 1fr;

    @media(max-width: ${mobileMaxPx}px){
        grid-template-columns: 1fr;
    }

`
export const WrapperCard = styled(Card)`
width:  90vw;
max-width: 1000px;
`
