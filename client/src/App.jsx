import Home from './pages/home';
import { Routes, Route } from 'react-router-dom';
import Details from './pages/details';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/details/:id" element={<Details />} />
    </Routes>
  );
}

export default App;
