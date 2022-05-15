import { Button, Card, CardActions, CardContent, Paper, Typography } from '@mui/material'
import React, { createContext, useState } from 'react'
import { useElementSize } from 'usehooks-ts'
import { FormMapWrapper, Wrapper, WrapperCard } from './StepperWrapper.styles'

export const StepperWrapperContext = createContext({} as any)


const StepperWrapper = (props) => {
    const {children} = props
    const [actionsBtns, setActionsBtns] = useState()
    const [FormMapWrapperRef, { width: FormMapWrapperWidth }] = useElementSize()
  return (
      <Wrapper>
          <Paper elevation={24}>
                <WrapperCard  >
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="div">Formulário</Typography>
                    <StepperWrapperContext.Provider value={{setActionsBtns, FormMapWrapperWidth}}>
                        <FormMapWrapper ref={FormMapWrapperRef}>{children}</FormMapWrapper>
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