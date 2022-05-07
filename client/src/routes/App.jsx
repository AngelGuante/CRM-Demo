import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoginContainer } from '../containers/Login'
// import '../styles/App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/Login' element={<LoginContainer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
