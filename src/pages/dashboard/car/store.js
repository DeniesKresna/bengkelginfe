import { defineStore } from "pinia";
import api from "../../../utils/Api";

export const useCarStore = defineStore({
    id: "car",
    state: () => ({
        
    }),
    actions: {
        async searchCar(payload = {}) {
            try {
                let res = await api.post("/car/search", payload);
                return res;
            } catch (error) {
                alert(error.responseDesc)
            }
        },
        async createCar(payload = {}) {
            try {
                let res = await api.post("/car", payload);
                return res;
            } catch (error) {
                alert(error.responseDesc)
            }
        },
        async updateCar(payload = {}) {
            try {
                let res = await api.put("/car", payload);
                return res;
            } catch (error) {
                alert(error.responseDesc)
            }
        },
        async getCarListFilterPlat(payload = {}) {
            try {
                let res = await api.post("/car/plat-list", payload);
                return res;
            } catch (error) {
                alert(error.responseDesc)
            }
        }
    }
});
