<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">Welcome</a>
                <p class="navbar-brand name" href="#">{{this.name}}</p>
                
                
                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div class="navbar-nav" >
                        <router-link to="/SignUpPage" class="navbar-brand" >SignUp</router-link>
                        <router-link to="/ProfilePage" class="navbar-brand" href="#">Home</router-link>
                        <button class="navbar-brand signout" @click="signout" >SignOut</button>
                    </div>
                </div>
                <div>
                    <router-link to="/UserPage" class="navbar-brand left-navbar first" href="#">{{this.name}}</router-link><br>
                    <router-link to="/UserPage" class="navbar-brand left-navbar second" href="#">{{this.userid}}</router-link>
                </div>
            </div>
        </nav>
        <div class="details">
            <h3>Name : {{this.userDetails.name}}</h3>
            <h4>User Id : {{this.userDetails.userID}}</h4>
            <h5>User email : {{this.userDetails.email}}</h5>
        </div>



        <div class="container mt-3">
            <div class="row">
                <div class="col-md-6 " v-for="post in posts" :key="post.postID">
                    <div class="card newclass my-2 list-group-item-success shadow-lg">
                        <div class="card-body">
                            <p>{{post.creator}}</p>
                            <div class="row align-item-centre">
                                <div class="col-sm-10 my-3">
                                    <div class="list-group" >
                                        <li class="list-group-item">
                                            Destination : <span class="fw-bold">{{post.destination}}</span>
                                        </li>
                                        <li class="list-group-item">
                                            Description : <span class="fw-bold">{{post.description}}</span>
                                        </li>
                                        <li class="list-group-item">
                                            Total Number of people : <span class="fw-bold">{{post.noOfPeople}}</span>
                                        </li>
                                        <span class="fw-bold">User id of people that are going</span>
                                        <li class="list-group-item" v-for="(member, i) in post.member" :key="i">
                                            <span class="fw-bold">{{member}}</span>
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
Vue.use( axios)

export default {
    name : "UserPage",
    data(){
            return {
                name : '',
                userid: '',
                posts: [],
                userDetails : {}
            }
    },
    created: async function(){
                this.userid = localStorage.USERID;
                this.name = localStorage.NAME;
                axios.get("http://localhost:4444/api/user/jatin12")
                    .then((data)=>{
                        this.userDetails = data.data.user
                        // console.log(this.userDetails)
                    })
                    .catch((error)=>{
                        console.log("user details error",error);
                    })

                axios.get("http://localhost:4444/api/post/user")
                    .then((data) => {
                        this.posts = data.data.post;
                        console.log(this.posts);
                    })
                    .catch((error)=>{
                        console.log("get user posts error", error);
                    })
            },
    methods: {
            signout : function() {
                localStorage.clear();
                setTimeout(() => {
                        this.$router.push("/");
                    }, 1000);
            }
        }
}
</script>

<style>
     .first {
        font-size: 30px;
        margin-right: 50px;
        margin-left: 0;
    }

    .second {
        font-size: 15px;
        margin-right: 50px;
        margin-left: 0;
    }

    .name {
        margin-top: 15px;
    }

    h1 {
        text-align: left;
    }

    button {
        border: none;
        
    }

    .details {
        text-align: left;
    }
</style>