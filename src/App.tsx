import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import AlgoPicker from "./pages/AlgoPicker"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path = "/" element={<Home />} />
        <Route path = "/algo-picker" element={<AlgoPicker />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
