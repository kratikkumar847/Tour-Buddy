import Router from 'vue-router';
import LoginSignup from '../components/LoginSignup';
import SignUpPage from '../components/SignUpPage'
import ProfilePage from '../components/ProfilePage'
import AddPost from '../components/AddPost'
import UserPage from '../components/UserPage'



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
        },
       {
        name: 'AddPost',
        path: '/AddPost',
        component:AddPost 
        },
       {
        name: 'UserPage',
        path: '/UserPage',
        component:UserPage 
        }
    ]
});

export default router;