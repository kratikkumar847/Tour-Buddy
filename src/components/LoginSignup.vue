<template>

    <!-- component -->
    <!-- component -->
    <div>

        <div v-if="loading">
            <SpinnerPage />
        </div>


        <div class="bg-white dark:bg-gray-900">
            <div class="flex justify-center h-screen">
                <div class="hidden bg-cover lg:block lg:w-2/3"
                    style="background-image: url(https://images.unsplash.com/photo-1496950866446-3253e1470e8e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80)">
                    <div class="flex items-center h-full px-20 bg-gray-900 bg-opacity-10">
                        <div class="backdrop-blur-sm rounded-md font-semibold p-5">
                            <h2 class="text-4xl font-bold text-white">Tour Buddy</h2>

                            <p class="max-w-xl mt-3 text-xl text-black"> Tour Buddy possess rich experience in tours and
                                travel, and facilitates travellers to make their journey memorable.</p>
                        </div>
                    </div>
                </div>

                <div class="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
                    <div class="flex-1">
                        <div class="text-center">
                            <h2 class="text-4xl font-bold text-center text-gray-700 dark:text-white">Tour Buddy</h2>

                            <p class="mt-3 text-gray-500 dark:text-gray-300">Sign in to access your account</p>
                        </div>

                        <div class="mt-8">
                            <form>
                                <div>
                                    <label for="email"
                                        class="block mb-2 text-sm text-gray-600 dark:text-gray-200">Username</label>
                                    <input type="email" v-model="loginDetails.userid" name="email" id="email"
                                        placeholder="example@123"
                                        class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                </div>

                                <div class="mt-6">
                                    <div class="flex justify-between mb-2">
                                        <label for="password"
                                            class="text-sm text-gray-600 dark:text-gray-200">Password</label>
                                    </div>

                                    <input type="password" v-model="loginDetails.password" name="password" id="password"
                                        placeholder="Your Password"
                                        class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                </div>

                                <div class="mt-6">
                                    <button v-on:click="login"
                                        class="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                                        Sign in
                                    </button>
                                </div>

                            </form>

                            <p class="mt-6 text-sm text-center text-gray-400">Don&#x27;t have an account yet? <a
                                    href="#" class="text-blue-500 focus:outline-none focus:underline hover:underline">
                                    <router-link to="/SignUpPage" class="signup">SignUp</router-link>
                                </a>.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>

</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import Config from '../config'
Vue.use(axios)
import SpinnerPage from './SpinnerPage.vue';

export default {
    name: "LoginSignup",
    data() {
        return {
            loginDetails: {
                userid: '',
                password: ''
            },
            loading: false,
        }
    },
    components: {
        SpinnerPage,
    },
    methods: {
        login(e) {
            this.loading = true;
            const newLogin = {
                userID: this.loginDetails.userid,
                password: this.loginDetails.password
            };
            
            console.log(newLogin);

            axios.post(`${Config.baseUrl}/auth/signin`, newLogin)
                .then((result) => {
                    localStorage.setItem("ACCESS_TOKEN", result.data.user.accessToken);
                    localStorage.setItem("MESSAGE", result.data.message);
                    localStorage.setItem("NAME", result.data.user.name);
                    localStorage.setItem("USERID", result.data.user.userID);
                    console.log(result.data.user.accessToken);
                    setTimeout(() => {
                        this.loading = false;
                        this.$toast.success(result.data.message);
                        this.$router.push("/ProfilePage");
                    }, 1000);
                    
                    console.log("1");
                })
                .catch((error) => {
                        this.loading = false;
                        this.$toast.error(error.response.data);
                })

            e.preventDefault();
        }
    }
};
</script>
