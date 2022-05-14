import { Button, Card, CardActions, CardContent, Paper, Typography } from '@mui/material'
import React, { createContext, useState } from 'react'
import { FormMapWrapper, Wrapper, WrapperCard } from './StepperWrapper.styles'

export const StepperWrapperContext = createContext({} as any)


const StepperWrapper = (props) => {
    const {children} = props
    const [actionsBtns, setActionsBtns] = useState()
  return (
      <Wrapper>
          <Paper elevation={24}>
                <WrapperCard  >
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="div">Formulario</Typography>
                    <StepperWrapperContext.Provider value={{setActionsBtns}}>
                        <FormMapWrapper>{children}</FormMapWrapper>
                    </StepperWrapperContext.Provider>
                    </CardContent>
                    <CardActions >
                        {actionsBtns}
                    </CardActions>
                </WrapperCard>
            </Paper>
    </Wrapper>
  )
}

export default StepperWrapper