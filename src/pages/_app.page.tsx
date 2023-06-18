import '@/styles/reset.css'
import { ClerkProvider } from '@clerk/nextjs'
import type { AppProps } from 'next/app'
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

  return (
    <>
      <Head>
        <title>タスク管理しなイカ？</title>
        <meta name='description' content='ゆるふわタスク管理アプリ' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta property='og:url' content={baseUrl} />
        <meta property='og:type' content='website' />
        <meta property='og:title' content='タスク管理しなイカ？' />
        <meta property='og:description' content='ゆるふわタスク管理アプリ' />
        <meta property='og:site_name' content='タスク管理しなイカ？' />
        <meta property='og:image' content={`${baseUrl}/OGP.png`} />
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:site' content='@traPtitech' />
        <meta name='twitter:image' content={`${baseUrl}/OGP.png`} />
        <meta name='twitter:title' content='タスク管理しなイカ？' />
        <meta name='twitter:description' content='ゆるふわタスク管理アプリ' />
        <link rel='icon' type='image/png' href='/favicon.png' sizes='64x64' />
        <link rel='icon' href='/favicon.svg' type='image/svg+xml' />
      </Head>
      <ClerkProvider
        {...pageProps}
        publishableKey='pk_test_ZGlyZWN0LXNhd2Zpc2gtMjMuY2xlcmsuYWNjb3VudHMuZGV2JA'
      >
        <Component {...pageProps} />
      </ClerkProvider>
    </>
  )
}
