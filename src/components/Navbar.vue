<template>
    <nav class="font-sans mb-4 flex flex-col text-center sm:flex-row sm:text-left sm:justify-between py-4 px-6 bg-white shadow sm:items-baseline w-full">
 
  <div class="space-x-4 mx-auto">
                        <router-link to="/ProfilePage" class=" text-2xl tracking-wider uppercase  text-gray-700 font-bold  no-underline text-grey-darkest hover:text-blue-dark ml-2">Home</router-link>
                         <router-link to="/UserPage" class="text-2xl tracking-wider uppercase  text-gray-700 font-bold  no-underline text-grey-darkest hover:text-blue-dark ml-2" href="#">Profile</router-link>       
                        <router-link to="/AddPost" class=" text-2xl tracking-wider uppercase  text-gray-700 font-bold  no-underline text-grey-darkest hover:text-blue-dark ml-2">AddPost</router-link>
                       
    
  </div>
   <button class="bg-blue-600  text-xl  uppercase  text-white rounded-lg px-4 py-2 font-bold tracking-wide" @click="signout">
                            logout
                        </button>
</nav>
</template>



<script>
export default {
    name:"Navbar"
}
</script>