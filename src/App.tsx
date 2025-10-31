import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import AlgoPicker from "./pages/AlgoPicker"
import ResultView from "./pages/ResultView"

function App() {

  return (
    <BrowserRouter basename={'/' + import.meta.env.VITE_DEPLOYMENT_PREFIX}>
      <Routes>
        <Route path = "/" element={<Home />} />
        <Route path = "/algo-picker" element={<AlgoPicker />} />
        <Route path = "/result-view" element={<ResultView />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
