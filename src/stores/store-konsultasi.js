import { defineStore } from "pinia";
import api from "../utils/Api";
import { PAGINATION_LIMIT } from "../utils/Constants";

const DATA_TABLE_CONSULTATION = "/expert/consultation/table"
const DELETE_TABLE_CONSULTATION = "/expert/consultation/delete/"
const DATA_DETAIL_CONSULTATION = "/expert/consultation/detail/"
const DATA_EDIT_CONSULTATION = "/expert/consultation/edit/"
const SUBMISSION_CONSULTATION = "/expert/create-consul"
const DASHBOARD_NEW_TRANSACTION_CONSULTATION = "/expert/create-consul"

export const useDataKonsultasiStore = defineStore({
    id: "konsultasi",
    state: () => ({
            tableKonsultasi: [],
            detailKonsultasi: {
                service: {
                    consultation: {
                        discussion: []
                    }
                }
            },
            pagination: {
                search: "",
                per_page: PAGINATION_LIMIT,
                page: 1,
                total: 0,
            },
            tablePaginationFilter: {
                search: {},
                per_page: PAGINATION_LIMIT,
                page: 1,
                total: 0,
            },
        }),
    actions: {
        setPagination(payload) {
            this.pagination = payload;
        },
        // ------------------------ Konsultasi -------------------------
        async getDataTableConsultation(payload) {
            try {
                let res = await api.post(DATA_TABLE_CONSULTATION + "?page=" + this.tablePaginationFilter.page + "&per_page=" + this.tablePaginationFilter.per_page, payload);
                this.tableKonsultasi = res.data
                this.setPaginationTableFilter(res.pagination)
            } catch (error) {}
        },
        setPaginationTableFilter(payload) {
            this.tablePaginationFilter.page = payload.page
            this.tablePaginationFilter.per_page = payload.per_page
            this.tablePaginationFilter.search = payload.search
            this.tablePaginationFilter.total = payload.total
        },
        async getDataDetailKonsultasi(id) {
            try {
            let res = await api.get(DATA_DETAIL_CONSULTATION + id);
            this.detailKonsultasi = res;
            } catch (error) {}
        },
        async formTambahTransaksiKonsultasiDashboard(payload) {
            try {
            let newPayload = {
                "service":{"consultation":payload},
                "expert_id":payload.expert_id
            }
            await api.post(DASHBOARD_NEW_TRANSACTION_CONSULTATION, newPayload);
            } catch (error) {}
        },
        async formEditTransaksiKonsultasiDashboard(id, payload) {
            try {
                let newPayload = {
                    "service":{
                        "consultation":payload,
                    },
                    "status_paid": payload.status_paid,
                    "status": payload.status,
                    "no_invoice": payload.no_invoice,
                    "invoice_url": payload.invoice_url,
                    "expert_rate": payload.expert_rate,
                    "expert_suggestion": payload.expert_suggestion
                }
                await api.put(DATA_EDIT_CONSULTATION + id, newPayload);
            } catch (error) {}
        },
        async formPengajuanKonsultasi(payload) {
            try {
            let newPayload = {
                "service":{"consultation":payload},
                "expert_id":payload.expert_id
            }
            return await api.post(SUBMISSION_CONSULTATION, newPayload);
            } catch (error) {}
        },
        async deleteDataTableConsultation(id) {
      try {
        await api.delete(DELETE_TABLE_CONSULTATION + id);
      } catch (error) {}
    },
    }
});
