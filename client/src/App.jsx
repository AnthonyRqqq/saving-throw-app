import { Outlet } from 'react-router-dom';
import Navigation from './components/Navigation';

import './App.css'

export default function App() {
  return (
    <>
      <header className='header'>
        <h3> 
          <Navigation />
        </h3>
      </header>

      <main className='main'>
        <Outlet />
      </main>
    </>
  )
}
