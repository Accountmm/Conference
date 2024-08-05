import StreamClientProvider from '@/provider/StreamClientProvider'
import React, { FC, ReactNode } from 'react'

interface IParams {
  children: ReactNode
}

const RootLayout: FC<IParams> = ({ children }) => {
  return (
    <main >
      <StreamClientProvider>
        {children}
      </StreamClientProvider>
    </main>
  )
}

export default RootLayout