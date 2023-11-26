import { defineStore } from "pinia";
import api from "../../../utils/Api";

export const useExecutionStore = defineStore({
    id: "execution",
    state: () => ({
        
    }),
    actions: {
        async searchExecution(payload = {}) {
            try {
                let res = await api.post("/execution/search", payload);
                return res;
            } catch (error) {
                alert(error.responseDesc)
            }
        },
        async downloadExecution(payload = {}) {
            try {
                let res = await api.post("/execution/download", payload);
                return res
            } catch (error) {
                alert(error.responseDesc)
            }
        },
        async getExecutionByID(id=0) {
            try {
                let res = await api.get("/execution/" + id.toString());
                return res;
            } catch (error) {
                alert(error.responseDesc)
            }
        },
        async createExecution(payload = {}) {
            try {
                let res = await api.post("/execution", payload);
                return res;
            } catch (error) {
                alert(error.responseDesc)
            }
        },
        async updateExecution(payload = {}) {
            try {
                let res = await api.put("/execution", payload);
                return res;
            } catch (error) {
                alert(error.responseDesc)
            }
        }
    }
});
