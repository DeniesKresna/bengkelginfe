import { defineStore } from "pinia";
import { USER_LOGIN_URL, USER_REGISTRATION_URL, USER_REGISTRATION_VERIFICATION_URL } from "./constant";
import api from "../../utils/Api";
import { useLayoutStore } from "../layout/store";

export const useSigninStore = defineStore({
  id: "signin",
  state: () => ({}),
  actions: {
    async login(payload={}) {
        try {
          let res = await api.post(USER_LOGIN_URL, payload);
          const layoutStore = useLayoutStore();
          console.log(res)
          layoutStore.setSession(res.responseData.user);
          localStorage.setItem("token", res.responseData.token);
          localStorage.setItem("role_name", res.responseData.role.name)
          return res;
        } catch (error) {
          alert(error.responseDesc)
        }
    }
  },
});
