import { useEffect } from "react";


export default function ProfilePage() {

  useEffect(() => {
    onLoad();
  }, [])

  const onLoad = async () => {
    // pull access token from http-only cookie and make request to spotify api
    
  }

  return (
    <>
      <h1>Display your Spotify profile data</h1>
    </>
  )
}