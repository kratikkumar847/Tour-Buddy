<template>

  <div>
    <div v-if="loading">
      <SpinnerPage />
    </div>

    <div v-else class="wrapper">
      <h2>SignUp</h2>
      <form action="#">
        
        
        <div class="form-group input-box"  >          
            <input type="text" :class="$v.signupDetails.email.required ? 'danger':'success'" placeholder="Enter your name" class="form__input" required v-model="signupDetails.name" /> 
        </div>
        <div class="error" v-if="!$v.signupDetails.name.required">Name is required.</div>





        <div class="form-group input-box" :class="{ 'form-group--error': $v.signupDetails.userID.$error }">          
            <input type="text"  placeholder="Enter your UserID" class="form__input " required v-model="signupDetails.userID" /> 
        </div>
        <div class="error" v-if="!$v.signupDetails.userID.required">UserID is required.</div>





        <div class="form-group input-box" :class="{ 'form-group--error': $v.signupDetails.email.$error }">          
            <input type="text"  placeholder="Enter your email" class="form__input" required v-model="signupDetails.email" /> 
        </div>
        <div class="error" v-if="!$v.signupDetails.email.required">UserID is required.</div>
        <div class="error" v-else-if="!$v.signupDetails.email.email">email is Invalid.</div>




        <div class="form-group input-box" :class="{ 'form-group--error': $v.signupDetails.password.$error }">          
            <input type="password" placeholder="Create password" class="form__input" required v-model="signupDetails.password" /> 
        </div>
        
        <div class="error" v-if="!$v.signupDetails.password.number">password must contain a number.</div>
        <div class="error" v-else-if="!$v.signupDetails.password.lower">password must contain a Lowercase letter.</div>
        <div class="error" v-else-if="!$v.signupDetails.password.upper">password must contain a Uppercase letter.</div>
        <div class="error" v-else-if="!$v.signupDetails.password.special">password must contain a Special character.</div>


       

        <div class="form-group input-box" :class="{ 'form-group--error': $v.signupDetails.confirmPassword.$error }">          
            <input type="password" placeholder="Confirm password" class="form__input" required v-model="signupDetails.confirmPassword" /> 
        </div>
        <div class="error" v-if="!$v.signupDetails.confirmPassword.sameAsPassword">Please Enter the same password</div>


        <div class="text" >
          <h3 >
            Already have an account? <router-link to="/">Login now</router-link>
          </h3>
        </div>

        <div class="policy">
          <input type="checkbox" v-model="terms"/>
          <h3>I accept all terms & condition</h3>
        </div>
        <div class="input-box button" v-if="(terms && !$v.signupDetails.$invalid)">
          <input type="Submit" value="Register Now" @click="signup" />
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
import { required, email, sameAs } from 'vuelidate/lib/validators'
import useVuelidate from '@vuelidate/core'
import validPassword from '../validators/password'

Vue.use(axios)

export default {
  name: "SignUpPage",
  data() {
    return {
      v$ : useVuelidate(),
      loading : false,
      terms : false,
      signupDetails: {
        name: "",
        userID: "",
        email: "",
        password: "",
        confirmPassword : ""
      },
    };
  },

  validations: {
    signupDetails: {
      name: {
        required
      },
      userID: {
        required
      },
      email: {
        required,
        email
      },
      password: {
        required,
        number : validPassword.hasNumber,
        lower : validPassword.hasLowerCase,
        upper : validPassword.hasUpparCase,
        special : validPassword.hasSpecial
      },
      confirmPassword: {
        required,
        sameAsPassword: sameAs('password')
      },

    }
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
      console.log(newSignUp);

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
  }
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

.text {
    margin-top: 5px;
    margin-bottom: 15px;
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

.error{
  margin-left: 4px;
    margin-top: -20px;
    color : red;
    font-size: 15px;
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
  margin-left: 0px;
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