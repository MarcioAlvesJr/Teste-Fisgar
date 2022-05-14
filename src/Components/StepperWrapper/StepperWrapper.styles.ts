import { Card } from '@mui/material'
import styled from 'styled-components'

export const Wrapper = styled.div`
min-height: 100vh;

margin: 2rem;

display: flex;
justify-content: center;
align-items: center;
`

export const FormMapWrapper = styled.div`
    width: 100%;
    display: grid;
    gap: 1rem;
    grid-template-columns: 1fr 1fr;

`
export const WrapperCard = styled(Card)`
width:  90vw;
`
