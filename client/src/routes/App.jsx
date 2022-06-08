import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoginContainer } from '../pages/Login'
import { HomeContainer } from '../pages/Home'
import { SellerContainer } from '../pages/Seller'
import { Layout } from './Layout'

import '../styles/App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/Login' element={<LoginContainer />} />

        <Route element={<Layout />}>
          <Route exact path='/Home' element={<HomeContainer />} />
          <Route exact path='/Seller' element={<SellerContainer />} />
        </Route>

      </Routes>
    </BrowserRouter >
  );
}

export default App;
