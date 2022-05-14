import { Button, Card, CardActions, CardContent, Paper, Typography } from '@mui/material'
import React, { createContext, useState } from 'react'
import { Wrapper } from './StepperWrapper.styles'

export const StepperWrapperContext = createContext({} as any)

const StepperWrapper = (props) => {
    const {children} = props
    const [title, setTitle] = useState()
    const [actionsBtns, setActionsBtns] = useState()
  return (
      <Wrapper>
          <Paper elevation={24}>
                <Card  sx={{ maxWidth: 500 }}>
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="div">{title}</Typography>
                    <StepperWrapperContext.Provider value={{setTitle, setActionsBtns}}>
                        {children}
                    </StepperWrapperContext.Provider>
                    </CardContent>
                    <CardActions >
                        {actionsBtns}
                    </CardActions>
                </Card>
            </Paper>
    </Wrapper>
  )
}

export default StepperWrapper