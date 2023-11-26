import { defineStore } from "pinia";
import api from "../../../utils/Api";

export const useCustomerStore = defineStore({
    id: "customer",
    state: () => ({
        
    }),
    actions: {
        async searchCustomer(payload = {}) {
            try {
                let res = await api.post("/customer/search", payload);
                return res;
            } catch (error) {
                alert(error.responseDesc)
            }
        },
        async createCustomer(payload = {}) {
            try {
                let res = await api.post("/customer", payload);
                return res;
            } catch (error) {
                alert(error.responseDesc)
            }
        },
        async updateCustomer(payload = {}) {
            try {
                let res = await api.put("/customer", payload);
                return res;
            } catch (error) {
                alert(error.responseDesc)
            }
        },
        async getCustomerListFilterName(payload = {}) {
            try {
                let res = await api.post("/customer/name-list", payload);
                return res;
            } catch (error) {
                alert(error.responseDesc)
            }
        }
    }
});
