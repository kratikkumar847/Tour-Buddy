<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
                <a class="navbar-brand welcome" href="#">Welcome</a>
                <p class="navbar-brand name" href="#">{{ this.name }}</p>

                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div class="navbar-nav">
                        <router-link to="/SignUpPage" class="navbar-brand">SignUp</router-link>
                        <router-link to="/AddPost" class="navbar-brand addpost">Add Post</router-link>
                        <button class="navbar-brand signout" @click="signout">
                            SignOut
                        </button>
                    </div>
                </div>
                <div>
                    <router-link to="/UserPage" class="navbar-brand left-navbar first" href="#">{{ this.name
                    }}</router-link><br />
                    <router-link to="/UserPage" class="navbar-brand left-navbar second" href="#">{{ this.userid
                    }}</router-link>
                </div>
            </div>
        </nav>
       <h1>Tour Buddy</h1>
        <div class="container mt-3">
            <div class="row">
                <div class="col-md-6" v-for="(post,index) in posts" :key="index">
                    <div class="card newclass my-2 list-group-item-success shadow-lg">
                        <div class="card-body">
                            <p>{{ post.creator }}</p>
                            <div class="row align-item-centre">
                                <div class="col-sm-10 my-3">
                                    <div class="list-group">
                                        <li class="list-group-item">
                                            Destination :
                                            <span class="fw-bold">{{
                                                    post.destination
                                            }}</span>
                                        </li>
                                        <li class="list-group-item">
                                            Total number of People :
                                            <span class="fw-bold">{{ post.noOfPeople }}</span>
                                        </li>
                                        <li class="list-group-item">
                                            Number of People filled :
                                            <span class="fw-bold"> {{post.member.length}}</span>
                                        </li>
                                        <li class="list-group-item">
                                            Enter User id
                                            <input class="fw-bold" :id="post.postID" v-model="posts[index].peoples" />
                                        </li>
                                        <li class="list-group-item">
                                            Description :
                                            <span class="fw-bold">{{
                                                    post.description
                                            }}</span>
                                        </li>
                                        <button class="btn btn-primary"  @click="addpeople(  post.postID , posts[index].peoples )">
                                            submit
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br /><br /><br />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import Config from "@/config";
import setAuthHeader from "../utils/setAuthHeader";

Vue.use(axios);

export default {
    name: "ProfilePage",
    data() {
        return {
            
            posts: [],
            userdetails: [],
            name: "",
            people: [],
            userid: "",
            len: 0,
        };
    },

    
    created: async function () {
        try {
            this.userid = localStorage.USERID;
            this.name = localStorage.NAME;
            setAuthHeader(localStorage.ACCESS_TOKEN);
            // const posturl = "http://localhost:4444/api/post";
            const posturl = `${Config.baseUrl}/post`;
            await axios
                .get(posturl)
                .then((data) => {
                    this.posts = data.data.post;
                    console.log(this.posts);
                })
                .catch((error) => {
                    console.log(error);
                });
           
            console.log(this.people);
            this.len = this.posts.length;
            console.log(this.len);
        } catch (error) {
            console.log(error);
        }
    },
    methods: {
        signout: function () {
            localStorage.clear();
            setTimeout(() => {
                this.$router.push("/");
            }, 1000);
        },
        addpeople: function (postID , member) {
            const user = {
                userID : member
            }
            console.log(user);
            console.log(postID);
            // const url = `http://localhost:4444/api/${postID}/member/add`;
            const url = `${Config.baseUrl}/${postID}/member/add`;
            console.log("put url is this" , url);
            axios.put(url, user)
                .then(()=>{
                    console.log(`${member} is added succesfully in postid ${postID}`);
                    // axios.get("http://localhost:4444/api/post/user")
                    axios.get(`${Config.baseUrl}/post/user`)
                        .then((data)=>{
                            console.log("These are all post by this user you can check here");
                            console.log(data);
                            alert("user added succesfully reload to save the change")
                        })
                        .catch((error)=>{
                            console.log(error ,"error in fetching user details");
                        })
                })
                .catch((error)=>{
                    console.log(error, "member is not added");
                })
        },
    },
};
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
}

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

.list-group-item {
    margin-top: 20px;
}
.container {
    margin-left: 50px;
}

.signout {
    cursor: pointer;
    border: none;
    background-color: white;
}

.addpost {
    margin-left: 15px;
    margin-right: 15px;
}

nav {
    height: 100px;
    background-color: red;
}

.name {
    margin-top: 0px;
    margin-left: 15px;
    margin-right: 15px;
}

.newclass {
    width: 600px;
    height: 350px;
    display: flex;
    flex-direction: column;
}

i {
    margin-left: 50px;
}

h1 {
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