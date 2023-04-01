import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';
import { Suspense, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { router } from './router';

function App() {
  useEffect(() => {

  }, [])
  return (
    <div className="App">
      <Suspense fallback={() => {
        <div>Loading ...</div>
      }}>
        <Routes>
          {router.map((route) => (
            <Route path={route.path} element={route.element} />
          ))}
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
