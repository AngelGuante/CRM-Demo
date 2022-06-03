import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoginContainer } from '../containers/Login'
import { HomeContainer } from '../containers/Home'
import '../styles/App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/Login' element={<LoginContainer />} />
        <Route exact path='/Home' element={<HomeContainer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
