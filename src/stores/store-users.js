import { defineStore } from "pinia";
import api from "../utils/Api";
import { PAGINATION_LIMIT } from "../utils/Constants";

const DATA_DETAIL_TABLE_USER = "/user/table"
const DATA_DETAIL_USER = "/user/detail/"

const DELETE_TABLE_USER = "/user/delete/" //check
//user edit by self
const EDIT_USER = "/user/edit"
const EDIT_ADDITIONAL_DATA = "/user/edit-additional-profile"
const EDIT_USER_PASSWORD = "/user/password"
//admin edit user
const ADMIN_EDIT_USER = "/user/edit/"
const ADMIN_EDIT_ADDITIONAL_DATA = "/user/edit-additional-profile/"
const ADMIN_EDIT_USER_PASSWORD = "/user/password/"

const CREATE_USER = "/user/register"
const ADMIN_ADD_USER = "/user/add"
const PROFILE_USER = "/user/profile"
const STATUS_USER = "/expert/publish-expert"
const EMAIL_VERIFICATION = "/user/email-verification"
const SELF_FINISHED_TRANSACTION = "/user/transaction/finished"

export const useDataUserStore = defineStore({
  id: "users",
  state: () => ({
    tableUser: [],
    mainDataUser: {},
    detailUser: {},
    pengaturanProfilUser: {
      capabilities: []
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
    listTransactionUser: [],
    listTransactionUserPagination: {
        search: {},
        per_page: PAGINATION_LIMIT,
        page: 1,
        total: 0,
    }
  }),
  actions: {
    setPagination(payload) {
      this.pagination = payload;
    },
    async getDataTableUser(payload){
      try{
        let res = await api.post(DATA_DETAIL_TABLE_USER + "?page=" + this.tablePaginationFilter.page + "&per_page=" + this.tablePaginationFilter.per_page, payload)
        this.tableUser = res.data
        let paginationRes = res.pagination
        paginationRes.search = payload.search
        this.setPaginationTableFilter(res.pagination)
      } catch(error){}
      
    },
    setPaginationTableFilter(payload) {
        this.tablePaginationFilter.page = payload.page
        this.tablePaginationFilter.per_page = payload.per_page
        this.tablePaginationFilter.search = payload.search
        this.tablePaginationFilter.total = payload.total
    },
    async deleteDataTableUser(id) {
      try {
        await api.delete(DELETE_TABLE_USER + id);
      } catch (error) {}
    },
    async createUser(payload){
      try {
        await api.post(CREATE_USER, payload)
      } catch (error){}
    },
    async adminCreateUser(payload){
      try {
        await api.post(ADMIN_ADD_USER, payload)
      } catch (error){}
    },
    //edit profile user by user
    async editUser(payload){
      try {
        await api.put(EDIT_USER, payload)
        return true
      } catch (error) {
        console.log(error)
        return false
      }
    },
    async editProfileUserDataTambahan(payload){
      try {
        await api.put(EDIT_ADDITIONAL_DATA, payload)
        return true
      } catch (error) {
        return false
      }
    },
    async editUserPassword(payload){
      try {
        await api.put(EDIT_USER_PASSWORD, payload)
      } catch (error) {}
    },
    //edit profile user by admin
    async adminEditUser(id, payload){
      try {
        await api.put(ADMIN_EDIT_USER + id, payload)
        return true
      } catch (error) {
        console.log(error)
        return false
      }
    },
    async adminEditProfileUserDataTambahan(id, payload){
      try {
        await api.put(ADMIN_EDIT_ADDITIONAL_DATA + id, payload)
        return true
      } catch (error) {
        return false
      }
    },
    async adminEditUserPassword(id, payload){
      try {
        await api.put(ADMIN_EDIT_USER_PASSWORD + id, payload)
      } catch (error) {}
    },
    async getMainDataUser(id){
      try {
        let res = await api.get(DATA_DETAIL_USER + id)
        this.mainDataUser = res;
      } catch (error) {}
    },
    async getDataDetailProfileUser(id) {
      try {
        let res = await api.get(DATA_DETAIL_USER + id);
        this.detailUser = res.data;
      } catch (error) {
        console.log("error");
      }
    },
    async getPengaturanDetailProfileUser(id) {
      try {
        let res = await api.get(DATA_DETAIL_USER + id);
        this.pengaturanProfilUser = res;
      } catch (error) {
        console.log("error");
      }
    },
    async getDataTransactionUser() {
      try {
        let res = await api.post(SELF_FINISHED_TRANSACTION + "?page=" + this.listTransactionUserPagination.page + "&per_page=" + this.listTransactionUserPagination.per_page);
        this.listTransactionUser = res.data;
        this.listTransactionUserPagination = res.pagination;
        this.setPaginationTableFilter(res.pagination)
      } catch (error) {
        console.log(error);
      }
    },
    setListTransactionUserPagination(payload) {
      this.listTransactionUserPagination.page = payload.page
      this.listTransactionUserPagination.per_page = payload.per_page
      this.listTransactionUserPagination.search = payload.search
      this.listTransactionUserPagination.total = payload.total
    },
  },
});
