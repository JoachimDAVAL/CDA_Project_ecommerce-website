import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Catalogue } from "./pages/Catalogue";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Catalogue />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
