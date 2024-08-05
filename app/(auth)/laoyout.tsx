import React, { FC, ReactNode } from 'react'

interface IParams {
  children: ReactNode
}


const AuthLayout: FC<IParams> = ({ children }) => {
  return (
    <div>AuthLayout</div>
  )
}

export default AuthLayout