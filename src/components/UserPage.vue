<template>
  <div>
    <nav
      class="font-sans  flex flex-col text-center sm:flex-row sm:text-left sm:justify-between py-4 px-6 bg-gray-200 shadow sm:items-baseline w-full"
    >
      <div class="space-x-4 mx-auto">
        <router-link
          to="/ProfilePage"
          class="text-2xl tracking-wider uppercase text-gray-700 font-bold no-underline text-grey-darkest hover:text-blue-dark ml-2"
          >Home</router-link
        >
        <router-link
          to="/UserPage"
          class="text-2xl tracking-wider uppercase text-gray-700 font-bold no-underline text-grey-darkest hover:text-blue-dark ml-2"
          href="#"
          >Profile</router-link
        >
        <router-link
          to="/AddPost"
          class="text-2xl tracking-wider uppercase text-gray-700 font-bold no-underline text-grey-darkest hover:text-blue-dark ml-2"
          >AddPost</router-link
        >
      </div>
      <button
        class="bg-blue-600 text-xl uppercase text-white rounded-lg px-4 py-2 font-bold tracking-wide"
        @click="signout"
      >
        logout
      </button>
    </nav>
    <div
      class="flex md:flex-row flex-col md:h-screen md:space-x-0 md:space-y-0 space-y-4"
    >
      <div
        class="flex flex-col justify-center items-center font-semibold tracking-tighter md:w-1/2"
      >
        <div class="flex text-4xl mb-4 space-x-3">
          <h2 class="text-gray-500">Welcome</h2>
          <p class="" href="#">{{ this.name }} !!</p>
        </div>

        <div class="space-y-3 text-2xl">
          <h2>Name : {{ this.userDetails.name }}</h2>
          <h2>Username : {{ this.userDetails.userID }}</h2>
          <h2>Email : {{ this.userDetails.email }}</h2>
        </div>
      </div>

      <div
        class="md:w-1/2 overflow-y-scroll   flex flex-col py-5 space-y-4 items-center bg-black"
      >
        <h2 class="text-white text-2xl font-bold">Your posts</h2>
        <div
          v-for="post in posts"
          :key="post.postID"
          class="bg-white rounded-xl shadow-lg p-5 w-3/4 md:w-1/2"
        >
          <div class="font-semibold text-xl tracking-wide space-y-3">
            <h2>Destination : {{ post.destination }}</h2>
            <h2>Total number of people : {{ post.noOfPeople }}</h2>
            <h2>Description : {{ post.description }}</h2>
            <h2>
              People are wants to go :
              <p v-for="(member, i) in post.member" :key="i">{{ member }}</p>
            </h2>
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
Vue.use(axios);

export default {
  name: "UserPage",
  data() {
    return {
      name: "",
      userid: "",
      posts: [],
      userDetails: {},
    };
  },
  created: async function () {
    this.userid = localStorage.USERID;
    this.name = localStorage.NAME;
    // axios.get("http://localhost:4444/api/user/jatin12")
    axios
      .get(`${Config.baseUrl}/user/${this.userid}`)
      .then((data) => {
        this.userDetails = data.data.user;
        // console.log(this.userDetails)
      })
      .catch((error) => {
        console.log("user details error", error);
      });

    // axios.get("http://localhost:4444/api/post/user")
    axios
      .get(`${Config.baseUrl}/post/user`)
      .then((data) => {
        this.posts = data.data.post;
        console.log(this.posts);
      })
      .catch((error) => {
        console.log("get user posts error", error);
      });
  },
  methods: {
    signout: function () {
      localStorage.clear();
      setTimeout(() => {
        this.$router.push("/");
      }, 1000);
    },
  },
};
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
