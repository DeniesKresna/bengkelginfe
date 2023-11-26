import { defineStore } from "pinia";
import api from "../../../utils/Api";

export const useUserStore = defineStore({
    id: "user",
    state: () => ({
        
    }),
    actions: {
        async searchUser(payload = {}) {
            try {
                let res = await api.post("/user/search", payload);
                return res;
            } catch (error) {
                alert(error.responseDesc)
            }
        },
        async createUser(payload = {}) {
            try {
                let res = await api.post("/user", payload);
                return res;
            } catch (error) {
                alert(error.responseDesc)
            }
        },
        async updateUser(payload = {}) {
            try {
                let res = await api.put("/user", payload);
                return res;
            } catch (error) {
                alert(error.responseDesc)
            }
        },
        async getUserListFilterName(payload = {}) {
            try {
                let res = await api.post("/user/employee-list", payload);
                return res;
            } catch (error) {
                alert(error.responseDesc)
            }
        }
    }
});
