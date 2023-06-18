import '@/styles/reset.css'
import { ClerkProvider } from '@clerk/nextjs'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider
      {...pageProps}
      publishableKey='pk_test_ZGlyZWN0LXNhd2Zpc2gtMjMuY2xlcmsuYWNjb3VudHMuZGV2JA'
    >
      <Component {...pageProps} />
    </ClerkProvider>
  )
}
