<template>

  <div>
    <div v-if="loading">
      <SpinnerPage />
    </div>

    <div class="wrapper">
      <h2>SignUp</h2>
      <form action="#">
        <div class="input-box">
          <input type="text" placeholder="Enter your name" required v-model="signupDetails.name" />
        </div>
        <div class="input-box">
          <input type="text" placeholder="Enter your UserID" required v-model="signupDetails.userID" />
        </div>
        <div class="input-box">
          <input type="text" placeholder="Enter your email" required v-model="signupDetails.email" />
        </div>
        <div class="input-box">
          <input type="password" placeholder="Create password" required v-model="signupDetails.password" />
        </div>
        <div class="input-box">
          <input type="password" placeholder="Confirm password" required />
        </div>

        <div class="policy">
          <input type="checkbox" v-model="terms"/>
          <h3>I accept all terms & condition</h3>
        </div>
        <div class="input-box button" v-if="terms">
          <input type="Submit" value="Register Now" @click="signup" />
        </div>
        <div class="text" v-if="terms">
          <h3 >
            Already have an account? <router-link to="/">Login now</router-link>
          </h3>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import Config from "@/config";
import SpinnerPage from '../components/SpinnerPage.vue'

Vue.use(axios)

export default {
  name: "SignUpPage",
  data() {
    return {
      loading : false,
      terms : false,
      signupDetails: {
        name: "",
        userID: "",
        email: "",
        password: "",
      },
    };
  },
  components: {
        SpinnerPage,
    },
  methods: {
    signup(e) {
      this.loading = true;
      const newSignUp = {
        name: this.signupDetails.name,
        userID: this.signupDetails.userID,
        password: this.signupDetails.password,
        email: this.signupDetails.email,
      };


      axios.post(`${Config.baseUrl}/auth/signup`, newSignUp)
        .then((result) => {
          console.log("1");
          this.loading = true;
          setTimeout(() => {
            this.$toast.success(result.data.message);
            this.$router.push("/");
          }, 1000);
        })
        .catch((err) => {
          this.loading = false;
          this.$toast.error(err.response.data);
        })

      e.preventDefault();
    },
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}

body {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #4070f4;
}

.wrapper {
  margin-top: 50px;
  margin-left: 35%;
  position: relative;
  max-width: 430px;
  width: 100%;
  background: #fff;
  padding: 34px;
  border-radius: 6px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
}

.wrapper h2 {
  position: relative;
  font-size: 22px;
  font-weight: 600;
  color: #333;
}

.wrapper form {
  margin-top: 30px;
}

.wrapper form .input-box {
  height: 52px;
  margin: 18px 0;
}

form .input-box input {
  height: 100%;
  width: 100%;
  outline: none;
  padding: 0 15px;
  font-size: 17px;
  font-weight: 400;
  color: #333;
  border: 1.5px solid #c7bebe;
  border-bottom-width: 2.5px;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.input-box input:focus,
.input-box input:valid {
  border-color: #4070f4;
}

form .policy {
  display: flex;
  align-items: center;
}

form h3 {
  color: #707070;
  font-size: 14px;
  font-weight: 500;
  margin-left: 10px;
}

.input-box.button input {
  color: #fff;
  letter-spacing: 1px;
  border: none;
  background: #4070f4;
  cursor: pointer;
}

.input-box.button input:hover {
  background: #0e4bf1;
}

form .text h3 {
  color: #333;
  width: 100%;
  text-align: center;
}

form .text h3 a {
  color: #4070f4;
  text-decoration: none;
}

form .text h3 a:hover {
  text-decoration: underline;
}

@media screen and (max-width: 768px) {
  .wrapper {
    margin-left: 0;
    margin-top: 100px;
  }

  h2 {
    text-align: center;
  }
}
</style>