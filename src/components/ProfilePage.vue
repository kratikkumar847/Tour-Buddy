<template>
    <div>

        <div >
            <div class="w-full h-full   bg-gray-200 pb-4  ">
                <!-- component -->
                <nav
                    class="font-sans mb-4 flex flex-col text-center sm:flex-row sm:text-left sm:justify-between py-4 px-6 bg-white shadow sm:items-baseline w-full">

                    <div class="space-x-4 mx-auto">
                        <router-link to="/ProfilePage"
                            class=" text-2xl tracking-wider uppercase  text-gray-700 font-bold  no-underline text-grey-darkest hover:text-blue-dark ml-2">Home</router-link>
                        <router-link to="/UserPage"
                            class="text-2xl tracking-wider uppercase  text-gray-700 font-bold  no-underline text-grey-darkest hover:text-blue-dark ml-2"
                            href="#">Profile</router-link>
                        <router-link to="/AddPost"
                            class=" text-2xl tracking-wider uppercase  text-gray-700 font-bold  no-underline text-grey-darkest hover:text-blue-dark ml-2">AddPost</router-link>


                    </div>
                    <button
                        class="bg-blue-600  text-xl  uppercase  text-white rounded-lg px-4 py-2 font-bold tracking-wide"
                        @click="signout">
                        logout
                    </button>
                </nav>
                <div class="flex justify-center items-center">
                    <div
                        class="grid sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 grid-flow-row gap-4 md:max-w-6xl px-4 ">
                        <div v-for="(post, index) in posts" :key="index" class="bg-white  rounded-xl shadow-lg  p-5  ">
                            <div class="font-semibold text-lg tracking-wide space-y-3">
                                <h2>Destination : {{ post.destination }} </h2>
                                <h2>Total number of people : {{ post.noOfPeople }}</h2>
                                <h2>Filled : {{ post.member.length }}</h2>
                                <h2>Description : {{ post.description }}</h2>
                                <button class="bg-blue-600 text-white rounded-lg py-2 px-5" @click="addpeople(post)">I'm
                                    coming</button>
                            </div>

                        </div>
                    </div>
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
            loading: false
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
                    console.log("i am all post",this.posts);
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
                this.$toast.success("Logged out");
                this.$router.push("/");
            }, 1000);
        },
        // addpeople: function (postID , member) {
        addpeople: function (post) {
            const postID = post.postID;
            const user = {
                userID: localStorage.USERID
            }
            console.log(user);
            console.log(postID);
            // const url = `http://localhost:4444/api/${postID}/member/add`;
            const url = `${Config.baseUrl}/${postID}/member/add`;
            console.log("put url is this", url);
            axios.put(url, user)
                .then((data) => {

                    // axios.get("http://localhost:4444/api/post/user")
                    console.log("kratik");
                    console.log(data.data.message);
                    this.$toast.success(data.data.message);
                    axios.get(`${Config.baseUrl}/post`)
                        .then((data) => {
                            this.posts = data.data.post;
                            console.log("i am all post",this.posts);
                        })
                        .catch((error) => {
                             console.log(error);
                        });
                })
                .catch(() => {
                    this.$toast.error("member is not added");
                })
        },
    },
};
</script>
