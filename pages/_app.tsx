import store, { persistor } from '@/store/RootReducer'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { SWRConfig } from 'swr'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SWRConfig value={{ provider: () => new Map() }}>
          < Component {...pageProps} />
        </SWRConfig>
      </PersistGate>
    </Provider>
  )

}
