import Router from 'vue-router';
import LoginSignup from '../components/LoginSignup';
import SignUpPage from '../components/SignUpPage'
import ProfilePage from '../components/ProfilePage'


const router = new Router({
    mode: 'history',
    routes: [
        {
           name: 'LoginSignup',
           path: '/',
           component:LoginSignup 
       },
        {
           name: 'SignUpPage',
           path: '/SignUpPage',
           component:SignUpPage 
       },
       {
        name: 'ProfilePage',
        path: '/ProfilePage',
        component:ProfilePage 
        }
    ]
});

export default router;