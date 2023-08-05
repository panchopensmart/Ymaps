import { useState } from 'preact/hooks'
import preactLogo from './assets/preact.svg'
import viteLogo from '/vite.svg'
import './app.css'
import MapC from './MapC'

export function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h2>Яндекс карты автокомплит</h2>
      <MapC/>
    </>
  )
}
