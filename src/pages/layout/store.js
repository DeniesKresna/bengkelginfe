import { defineStore } from "pinia";
import api from "../../utils/Api";
import { 
  USER_SESSION_URL, PROFILE_USER, EDIT_MAIN_DATA, DATA_DETAIL_USER
} from "./constants";

export const useLayoutStore = defineStore({
  id: "layout",
  state: () => ({
    session: {},
    role: {},
    token: "",
    pengaturanProfilUser: {
      capabilities: []
    },
    userId: null,
    detailUser: {},
    apiRequest: 0
  }),
  actions: {
    setSession(payload = {}) {
      this.session = payload;
    },
    setDashboardLayouts(payload = {}) {
      this.dashboardAlert = payload;
    },
    requestIncrease(){
      this.apiRequest = this.apiRequest + 1;
    },
    requestDecrease(){
      if(this.apiRequest > 0){
        this.apiRequest = this.apiRequest - 1;
      }
    },
    resetApiRequestAmount(){
      this.apirequest = 0;
    },
    async getSession() {
      try {
        let res = await api.get(USER_SESSION_URL);
        this.session = res.user;
        this.role = res.role;
        this.token = res.token
        this.userId = res.user.id
      } catch (error) {}
    },
    async getPengaturanDetailProfileUser() {
      try {
        let res = await api.get(PROFILE_USER);
        this.pengaturanProfilUser = res;
      } catch (error) {
        console.log("error")
      }
    },
    async getDataDetailProfileUser(id) {
      try {
        await this.getSession();
        let res = await api.get(DATA_DETAIL_USER + id);
        this.detailUser = res;
      } catch (error) {
        console.log("error");
      }
    },
    async editProfileUserDataUtama(){
      try {
        await api.put(EDIT_MAIN_DATA)
      } catch (error) {}
    },
    signOut() {
      localStorage.removeItem("token");
      localStorage.removeItem("role_name");
      this.setSession({})
      this.role = {}
      this.token = ""
      this.pengaturanProfilUser = { capabilities: [] }
      this.userId = null
      this.detailUser = {}
    },
  },
  getters: {
    sessionFirstName(state) {
      if(state.session == undefined){
        return ""
      }
      return state.session.first_name;
    },
    isApiRequestAmountNull(state){
      if(state.apiRequest <= 0){
        return true
      }
    }
  },
});
