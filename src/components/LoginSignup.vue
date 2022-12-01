<template>
    <div class="main-container">
        <div class="small-container">
            <div class="first">
                <img src="../assets/logo1.jpeg" alt="image">
            </div>
            <div class="second">
                    <div class="login">
                        <div class="main-heading bg-success">
                            <h3>TRAVEL BUDDY</h3>
                        </div>
                        <div class="container">
                            <div class="title">Login</div>
                                <form action="#" method="post">
                                    <div class="user-details">
                                        <div class="input-box">
                                            <span  class="details">User'ID</span>
                                            <input type="text" v-model="loginDetails.userid" placeholder="Enter Your Email" required>
                                        </div>
                                        <div class="input-box">
                                            <span class="details" >Password</span>
                                            <input type="password" id="new1" v-model="loginDetails.password" placeholder="Enter Password" required>
                                        </div>
                                        <div class="button">
                                            <input type="submit" value="submit" v-on:click="login">
                                        </div>
                                        <p>don't have an accout 
                                            <router-link to="/SignUpPage" class="signup">SignUp</router-link>
                                        </p>
                                    </div>
                                </form>
                        </div>
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
    name: "LoginSignup",
    data(){
        return {
            loginDetails : {
                userid : '',
                password : ''
            }
        }
    },
    methods:{
         login(e){
            const newLogin = {
                userID: this.loginDetails.userid,
                password: this.loginDetails.password
            };
      console.log(newLogin);

      axios.post("http://localhost:4444/api/auth/signin", newLogin)
                .then((result)=>{
                    localStorage.setItem( "ACCESS_TOKEN" , result.data.user.accessToken );
                    localStorage.setItem( "MESSAGE" , result.data.message );
                    localStorage.setItem( "NAME" , result.data.user.name );
                    alert("Successfully Login !");
                    console.log(result.data.user.accessToken);
                    setTimeout(() => {
                        this.$router.push("/ProfilePage");
                    }, 1000);
                    console.log("1");
                })
                .catch((err) =>{
                    console.log(err);
                    console.log("0");
                })

      e.preventDefault();
        }
    }
};
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
}

#new1 {
    margin-top: 60px;
    margin-left: 5px;
}

p {
    margin-top: 80px;
}

.second {
    background-color: rgb(231, 67, 67);
    width: 40%;
    text-align: center;
}

.first {
    background-color: rgb(224, 112, 112);
    width: 60%;
}

.second {
    display: flex;
    height: 80vh;
    justify-content: center;
    align-items: center;
    background: linear-gradient(180deg, #01f5f9, #9b59b6);
}

.main-heading {
    width: 100%;
    height: 60px;
    text-align: center;
    padding: 20px;
    margin: 50px 20%;
    margin-left: 0px;
}

.container {
    max-width: 300px;
    width: 100%;
    background: #fff;
    padding: 20px 25px;
    border-radius: 5px;
    height: 335px;
    margin-top: -25px;
}

#pass, #email {
    margin: 0px;
}

form .button {
    height: 30px;
    margin: 45px 0;
}

form .button input {
    height: 100%;
    width: 80%;
    margin-top: 60px;
    outline: none ;
    color: #fff;
    background: linear-gradient(180deg, #01f5f9, #9b59b6);
}

.container .title {
    font-size: 25px;
    font-weight: 500;
    position: relative;
}

.container .title::before {
    content: '';
    position: absolute;
    height: 3px;
    width: 60px;
    left: 0;
    margin-left:95px;
    bottom: 0;
    background: #9b59b6;
}

.user-details .input-box input{
    margin-top: 50px;
    height: 45px;
    border-radius: 5px;
    margin-left: 30px;
    widows: 100%;
    outline: none;
    border: 1px solid #ccc;
    padding-left: 8px;
    font-size: 16px;
    border-bottom-width: 2px;
    transition: all 0.3s ease;
}

.user-details .input-box input:focus,
.user-details .input-box input:valid{
    border-color: #9b59b6;
}

.user-details{
    margin-top: -20px;
}

.user-details .input-box .details{
    font-weight: 500;
    margin-bottom: 5px;
}

.input-box{
    height: 40px;
}

.title{
    height: 40px;
}

input {
    height: 18px;
    width: 140px;
}

.main-container {
    height: 625px;
    background-color: rgb(223, 120, 61);
    display: flex;
    justify-content: center;
    align-items: center;
}

.small-container {
    display: flex;
    width: 90%;
    height: 80%;
}



img {
    background-repeat: no-repeat;
    background-size: cover;
    width: 100%;
    height: 100%;
}


/* CSS for the Mobile View  */
@media screen and (max-width: 768px) {
    .small-container{
        /* flex-wrap: wrap;
        flex-direction : column; */
    }
    .main-container{
        height: 100vh;
    }

    .first{
        width: 0%;
    }

    .second{
        width: 100%;
        height: 80vh;
    }

}


</style>
