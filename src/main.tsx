import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom'
import './globals.css'
// import LogIn from '@/_auth/forms/LogIn'
// import SignUp from '@/_auth/forms/SignUp';
import { Home, Category, StoryTxt, StoryTxtImg, Inputs, UserSettings, Loading, UserStories } from "@/client/_root/pages";
// import AuthLayout from './_auth/AuthLayout';
import RootLayout from './client/_root/RootLayout';
import UserProfile from './client/_root/pages/UserProfile';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
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
                <Route path='/story-txt' element={<StoryTxt />} />
                <Route path='/story-txt-img' element={<StoryTxtImg />} />
                <Route path='/loading' element={<Loading />} />
                <Route path='/user-settings' element={<UserSettings />} />
                <Route path='/user-profile' element={<UserProfile />} />
                <Route path='/user-stories' element={<UserStories />} />
            </Route>
        </Routes>
    </BrowserRouter>
)