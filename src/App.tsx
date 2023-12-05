import { Routes, Route } from 'react-router-dom'
import './globals.css'
// import LogIn from '@/_auth/forms/LogIn'
// import SignUp from '@/_auth/forms/SignUp';
import { Home, Category, Setting, Story, Inputs, UserSettings } from "@/_root/pages";
// import AuthLayout from './_auth/AuthLayout';
import RootLayout from './_root/RootLayout';

const App = () => {
  return (
    <main className='flex h-screen'>
      <Routes>
        {/* public routes*/}
        {/* 
        <Route element={<AuthLayout />}>
          <Route path='/log-in' element={<LogIn />} />
          <Route path='/sign-up' element={<SignUp />} />
        </Route>}
        */}
        

        {/* private routes*/}
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path='/inputs' element={<Inputs />} />
          <Route path='/category' element={<Category />} />
          <Route path='/setting' element={<Setting />} />
          <Route path='/user-settings' element={<UserSettings />} />
          <Route path='/story' element={<Story />} />
        </Route>
      </Routes>
    </main>
  )
}

export default App