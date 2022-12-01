<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">Welcome</a>
                <a class="navbar-brand" href="#">Welcome</a>
                
                
                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div class="navbar-nav" >
                        <router-link to="/" class="navbar-brand" >Login</router-link>
                        <router-link to="/SignUpPage" class="navbar-brand" >SignUp</router-link>
                        <router-link to="/" class="navbar-brand" >SignOut</router-link>
                    </div>
                </div>
                <a class="navbar-brand left-navbar" href="#"  >left</a>
            </div>
        </nav>
        <h1>Tour Buddy</h1>
        <div class="container mt-3">
            <div class="row">
                <div class="col-md-6 " v-for="post in posts" :key="post.postID">
                    <div class="card newclass my-2 list-group-item-success shadow-lg">
                        <div class="card-body">
                            <div class="row align-item-centre">
                                <div class="col-sm-10 my-3">
                                    <div class="list-group" >
                                        <li class="list-group-item">
                                            Destination : <span class="fw-bold">{{post.destination
}}</span>
                                        </li>
                                        <li class="list-group-item">
                                            Number of People : <span class="fw-bold">{{post.noOfPeople
}}</span>
                                        </li>
                                        <li class="list-group-item">
                                            Description : <span class="fw-bold">{{post.description
}}</span>
                                        </li>
                                    </div>
                                </div>
                            </div>
                            <i class="fa-solid  fa-comments"></i>
                        </div>
                    </div>
                    <br><br><br>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import setAuthHeader from '../utils/setAuthHeader'
Vue.use( axios)

    export default {
        name : "ProfilePage",
        data(){
            return {
                posts :[]
            };
        },
        created: async function(){
            try {
                setAuthHeader(localStorage.ACCESS_TOKEN)
                const url = "http://localhost:4444/api/post"
                await axios.get(url)
                .then((data)=>{
                    this.posts = data.data.post
                    console.log(this.posts);
                })
                .catch(error =>{
                    console.log(error);
                })
            } catch (error) {
                console.log(error);
            }
        }
    }
</script>

<style>
    * {
        margin: 0;
        padding: 0;
    }
    .newclass{
        width: 600px;
        height: 300px;
        display: flex;
        flex-direction: column;
    }
    .left-navbar {
        margin-left: 0;
    }

    i {
        margin-left: 50px;
    }

    h1{
        text-align: center;
        margin-top: 20px;
    }

    .row {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
</style>