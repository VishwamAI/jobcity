import '../styles/globals.css'
import AuthComponent from '../components/auth-pages'
import Navbar from '../components/Navbar'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <AuthComponent />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
