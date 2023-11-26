  <script setup>
    import {ref} from "vue"
    import {useSigninStore} from "../store"
    import {useRouter, useRoute} from "vue-router"
    import { MSG_WELCOME } from "../constant"
    import { isVariableEmpty } from "../../../utils/Helper"
    import BengkelImage from "../../../images/Bengkel.jpg"

    const router = useRouter()
    const route = useRoute()
    const signinStore = useSigninStore()

    const auth = ref({
      email: "",
      password: ""
    })

    const isLoading = ref(false);

    const login = async () => {
      try {
        if (auth.value.email != "" && auth.value.password != "") {
          isLoading.value = true
          if (await signinStore.login(auth.value)) {
            let nextRoute = sessionStorage.getItem("nextRoute")
            if (!isVariableEmpty(nextRoute)) {
              sessionStorage.removeItem("nextRoute")
              router.push(nextRoute)
              return
            }
            router.push('/dashboard/execution')
          }
        }
      } catch (error) {
        isLoading.value = false
      }
    }

    // =========== REGISTRATION VERIFICATION ================
    {
      const verificationCode = route.query.veriftoken

      // if veriftoken query exist
      if(!isVariableEmpty(verificationCode)){
        await signinStore.verifyUserRegistration(verificationCode)
      }
    }
    // =========== END OF REGISTRATION VERIFICATION =========

    // =========== Toogle Show Password =====================
    const showPassword = ref(false)

    const toggleShowPassword = () => {
      showPassword.value = !showPassword.value
    }
  </script>
  <template>
    <main class="bg-white">
      <div class="relative flex">
        <div class="w-full md:w-1/2">
          <div class="min-h-screen h-full flex flex-col after:flex-1">
            <div class="flex-1">
              <div class="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
                <b>BENGKEL INTEGRAL</b>
              </div>
            </div>          
            <div class="max-w-sm mx-auto px-4 py-8">
              <h1 class="text-3xl text-black font-bold mb-6">{{MSG_WELCOME}} ✨</h1>
              <form @submit.prevent="login()">
                <div class="space-y-4">
                  <div>
                    <label class="block text-sm font-medium mb-1" for="email">Email</label>
                    <input class="border-0 bg-gray-100 hover:ring-emerald-500 rounded-lg focus:ring-jobhunGreen p-1.5 text-sm w-full" 
                    type="email" v-model="auth.email" required/>
                  </div>
                  <div>
                    <label class="block text-sm font-medium mb-1" for="password">Kata sandi</label>
                      <div class="relative">
                        <input v-if="showPassword" 
                        autoComplete="off"
                        type="text" 
                        v-model="auth.password" 
                        class="bg-gray-100 border-0 hover:ring-emerald-500 rounded-lg focus:ring-jobhunGreen p-1.5 text-sm w-full">
                        <input v-else
                        autoComplete="off"
                        type="password" 
                        v-model="auth.password" 
                        class="bg-gray-100 border-0 hover:ring-emerald-500 rounded-lg focus:ring-jobhunGreen p-1.5 text-sm w-full">
                        <button type="button" @click.stop="toggleShowPassword($event)" class="absolute inset-y-0 right-0 flex items-center pr-3">
                            <svg v-if="!showPassword" class="w-5 h-5 hover:text-gray-200 text-gray-100" fill="currentColor" viewBox="0 0 24 24"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 5C5.63636 5 2 12 2 12C2 12 5.63636 19 12 19C18.3636 19 22 12 22 12C22 12 18.3636 5 12 5Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                            <svg v-else class="w-5 h-5 hover:text-gray-200 text-gray-100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20 14.8335C21.3082 13.3317 22 12 22 12C22 12 18.3636 5 12 5C11.6588 5 11.3254 5.02013 11 5.05822C10.6578 5.09828 10.3244 5.15822 10 5.23552M12 9C12.3506 9 12.6872 9.06015 13 9.17071C13.8524 9.47199 14.528 10.1476 14.8293 11C14.9398 11.3128 15 11.6494 15 12M3 3L21 21M12 15C11.6494 15 11.3128 14.9398 11 14.8293C10.1476 14.528 9.47198 13.8524 9.1707 13C9.11386 12.8392 9.07034 12.6721 9.04147 12.5M4.14701 9C3.83877 9.34451 3.56234 9.68241 3.31864 10C2.45286 11.1282 2 12 2 12C2 12 5.63636 19 12 19C12.3412 19 12.6746 18.9799 13 18.9418" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                        </button>
                      </div>
                  </div>
                </div>
                <div class="flex items-center justify-between mt-6">
                  <!-- <div class="mr-1">
                    <router-link class="text-sm underline hover:no-underline" to="/forgotpassword">Lupa kata sandi?</router-link>
                  </div> -->
                  <button type="submit" v-if="!isLoading" class="btn bg-jobhunGreen hover:bg-emerald-600 text-white ml-3 w-20 h-9">Masuk</button>
                  <button v-if="isLoading" class="btn bg-jobhunGreen hover:bg-emerald-600 text-white ml-3 w-20 h-9">
                    <span class="loader"></span>
                  </button>
                </div>
              </form>
              <!-- <div class="pt-5 mt-6 border-t border-slate-200">
                <div class="text-sm">
                  Belum memiliki akun? <router-link class="font-medium text-jobhunGreen hover:text-emerald-600" to="/signup">Daftar</router-link> di sini!
                </div>
              </div> -->
            </div>
          </div>
        </div>
        <div class="hidden md:block absolute top-0 bottom-0 right-0 md:w-1/2" aria-hidden="true">
          <img class="object-cover object-center w-full h-full" :src="BengkelImage" width="760" height="1024" alt="Authentication" />
          <img class="absolute top-1/4 left-0 -translate-x-1/2 hidden lg:block" src="https://jobhunstorage.sgp1.digitaloceanspaces.com/assets/images/web/roket-02.png" width="218" height="224" alt="Authentication decoration" />
        </div>
      </div>
    </main>
  </template>
  <style>
  .loader {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    display: inline-block;
    border-top: 3px solid #fff;
    border-right: 3px solid transparent;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
  }

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  } 
  </style>