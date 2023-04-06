import { queryClient } from '@/lib/react-query'
import { StyleProvider } from '@/styles/StyleProvider'
import { QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

import type { AppProps } from 'next/app'
function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <StyleProvider>
        <Component {...pageProps} />
      </StyleProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
