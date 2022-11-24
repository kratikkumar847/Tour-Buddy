import Router from 'vue-router';
import LoginSignup from '../components/LoginSignup';
import SignUpPage from '../components/SignUpPage'


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
       }
    ]
});

export default router;