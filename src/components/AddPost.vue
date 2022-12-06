<template>


    <div class="bg-gray-200 w-full h-screen">
        <nav
            class="font-sans mb-4 flex flex-col text-center sm:flex-row sm:text-left sm:justify-between py-4 px-6 bg-white shadow sm:items-baseline w-full">
            <div class="space-x-4 mx-auto">
                <router-link to="/ProfilePage"
                    class="text-2xl tracking-wider uppercase text-gray-700 font-bold no-underline text-grey-darkest hover:text-blue-dark ml-2">Home</router-link>
                <router-link to="/UserPage"
                    class="text-2xl tracking-wider uppercase text-gray-700 font-bold no-underline text-grey-darkest hover:text-blue-dark ml-2"
                    href="#">Profile</router-link>
                <router-link to="/AddPost"
                    class="text-2xl tracking-wider uppercase text-gray-700 font-bold no-underline text-grey-darkest hover:text-blue-dark ml-2">AddPost</router-link>
            </div>
            <button class="bg-blue-600 text-xl uppercase text-white rounded-lg px-4 py-2 font-bold tracking-wide"
                @click="signout">
                logout
            </button>
        </nav>
        <div class="flex justify-center items-center">
            <div class="shadow-lg space-y-2 flex flex-col bg-white w-1/2 rounded-lg p-5">

                <h2 class="font-bold text-3xl text-center text-gray-500 tracking-wide">Add Post</h2>


                <label for="destination">Destination</label>
                <input type="text" class="border p-1 rounded-md shadow-sm" name="destination"
                    v-model="addpost.destination">

                <label for="noOfPeople">noOfPeople</label>

                <input type="text" class="border p-1 rounded-md shadow-sm" name="noOfPeople"
                    v-model="addpost.noOfPeople">

                <label for="Description">Description</label>

                <textarea type="text" class="border p-1 resize-y     rounded-md shadow-sm" name="Description"
                    v-model="addpost.description">
        </textarea>
                <button
                    class="bg-blue-600 my-2  text-xl  uppercase  text-white rounded-lg px-4 py-2 font-bold tracking-wide "
                    @click="addpostInTimeLine">Add Post</button>

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
    name: "AddPost",
    data() {
        return {
            name: "",
            userid: "",
            addpost: {
                description: "",
                destination: "",
                noOfPeople: 0,
            },
        };
    },
    created: async function () {
        this.userid = localStorage.USERID;
        this.name = localStorage.NAME;
    },
    methods: {
        async addpostInTimeLine(e) {
            e.preventDefault();
            const details = {
                description: this.addpost.description,
                destination: this.addpost.destination,
                noOfPeople: this.addpost.noOfPeople,
            };
            // console.log(details);
            // await axios.post("http://localhost:4444/api/post/add", details)
            await axios
                .post(`${Config.baseUrl}/post/add`, details)
                .then((result) => {
                    console.log(result);
                    console.log("The result is true");
                    this.addpost = {
                        description: "",
                        destination: "",
                        noOfPeople: 0,
                    };
                    this.$toast.success("Post is added SucessFully");
                })
                .catch((err) => {
                    console.log(err);
                    console.log("0");
                });
        },
        signout() {
            localStorage.clear();
            setTimeout(() => {
                this.$toast.success("Logged out");
                this.$router.push("/");
            }, 1000);
        },
    },
};
</script>