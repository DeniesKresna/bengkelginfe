import { defineStore } from "pinia";
import apiStatic from "../utils/ApiStatic";

const SECTORS_URL = "/sectors.json";
const DOMICILE_URL = "/domicile.json"
const SERVICES_URL = "/services.json"
const TITLE_URL = "/title.json"
const ACCOR_CONSUL = "/data-accordion-konsultasi.json"
const BIDANG = "/data-bidang.json"
const COURSE_TYPE = "/course-type.json"
const COURSE_PROGRAM = "/course-program.json"

export const useOptionsStore = defineStore({
  id: "options",
  state: () => ({
    listSector: {},
    listDomicile: {},
    listService: {},
    listTitle: {},
    listAccorConsul: {},
    listBidang: [],
    listCourseType: {},
    listCourseProgram: {}
  }),
  actions: {
    async getSectors(payload) {
      try {
        let res = await apiStatic.get(SECTORS_URL, payload);
        this.listSector = res;
      } catch (error) {}
    },
    async getDomiciles(payload) {
      try {
        let res = await apiStatic.get(DOMICILE_URL, payload);
        this.listDomicile = res;
      } catch (error) {}
    },
    async getServices(payload) {
      try {
        let res = await apiStatic.get(SERVICES_URL, payload);
        this.listService = res;
      } catch (error) {}
    },
    async getTitle(payload) {
      try {
        let res = await apiStatic.get(TITLE_URL, payload);
        this.listTitle = res;
      } catch (error) {}
    },
    async getAccorConsul(payload) {
      try {
        let res = await apiStatic.get(ACCOR_CONSUL, payload);
        this.listAccorConsul = res;
      } catch (error) {}
    },
    async getBidang(payload) {
      try {
        let res = await apiStatic.get(BIDANG, payload);
        this.listBidang = res;
      } catch (error) {}
    },
    async getCourseType(payload) {
      try {
        let res = await apiStatic.get(COURSE_TYPE, payload);
        this.listCourseType = res;
      } catch (error) {}
    },
    async getCourseProgram(payload) {
      try {
        let res = await apiStatic.get(COURSE_PROGRAM, payload);
        this.listCourseProgram = res;
      } catch (error) {}
    }
  },
});
