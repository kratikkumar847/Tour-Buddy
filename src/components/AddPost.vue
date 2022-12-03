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
                        <button class="navbar-brand signout" @click="signout">SignOut</button>
                    </div>
                </div>
                <div>
                    <router-link to="/UserPage" class="navbar-brand left-navbar first" href="#">{{this.name}}</router-link><br>
                    <router-link to="/UserPage" class="navbar-brand left-navbar second" href="#">{{this.userid}}</router-link>
                    
                </div>
            </div>
        </nav>
        <h1>Tour Buddy</h1>



        <div class="container mt-4">
            <div class="row">
                <div class="col-md-6 " >
                    <div class="card newclass my-2 list-group-item-success shadow-lg">
                        <div class="card-body">
                            <div class="row align-item-centre">
                                <div class="col-sm-10 my-3">
                                    <form class="list-group" >
                                        <!-- <li class="list-group-item">
                                            Destination : <span class="fw-bold">{{post.destination}}</span>
                                        </li> -->
                                        Description : <input type="text" v-model="addpost.description" class="list-group-item">
                                        <!-- <li class="list-group-item">
                                            Number of People : <span class="fw-bold">{{post.noOfPeople}}</span>
                                        </li> -->
                                        Destination: <input type="text" v-model="addpost.destination" class="list-group-item">
                                        <!-- <li class="list-group-item">
                                            Description : <span class="fw-bold">{{post.description}}</span>
                                        </li> -->
                                        Number of People  : <input type="text" v-model="addpost.noOfPeople" class="list-group-item">
                                        <br>
                                        <button class="btn" @click="addpostInTimeLine">Add Post</button>
                                    </form>
                                </div>
                            </div>
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
import Config from '@/config'
Vue.use( axios)

export default{
    

    name : 'AddPost',
    data(){
            return {
                name : '',
                userid: '',
                addpost : {
                    description : '',
                    destination : '',
                    noOfPeople : 0
                }
            };
        },
    created: async function(){
                this.userid = localStorage.USERID;
                this.name = localStorage.NAME;
            },
        methods: {
            async addpostInTimeLine(e){
                e.preventDefault();
                const details = {
                    description : this.addpost.description,
                    destination : this.addpost.destination,
                    noOfPeople : this.addpost.noOfPeople
                };
                // console.log(details);
                // await axios.post("http://localhost:4444/api/post/add", details)
                await axios.post(`${Config.baseUrl}post/add`, details)
                .then((result)=>{
                    console.log(result);
                    console.log("The result is true");
                    alert("Post is added To your account");
                    this.addpost = {
                    description : '',
                    destination : '',
                    noOfPeople : 0
                }

                })
                .catch((err) =>{
                    console.log(err);
                    console.log("0");
                })
            },
            signout() {
                localStorage.clear();
                setTimeout(() => {
                        this.$router.push("/");
                    }, 1000);
            }
        },
}
</script>


<style scoped>
.first {
        font-size: 30px;
        margin-right: 50px;
        margin-left: 0;
    }

    h1 {
        text-align: center;
    }

    button {
        border: none;
        background-color: white;
    }

    .second {
        font-size: 15px;
        margin-right: 50px;
        margin-left: 0;
    }

    .container {
        margin-left: 350px;
    }

    .list-group {
        margin-left: 80px;
    }
</style>