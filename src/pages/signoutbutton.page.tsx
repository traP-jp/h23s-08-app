import { SignOutButton } from '@clerk/nextjs'

export default function Home() {
  // return to '/' after sign out
  return (
    <SignOutButton
      signOutCallback={() => {
        window.location.href = '/'
      }}
    />
  )
}
