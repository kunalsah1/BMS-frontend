import axiosInstance from "./axiosinstance";

export const registerUser = async (data: any) =>
  axiosInstance.post("/register/", data);
export const loginUser = async (data: any) =>
  axiosInstance.post("/login/", data);

export const getCompanies = async () => axiosInstance.get("/companies/");
export const postCompanies = async (data: any) =>
  axiosInstance.post("/companies/", data);

export const getCompanyAddress = async () =>
  axiosInstance.get("/company_address/");
export const getFilteredAddress = async (companyId: number) =>
  axiosInstance.get(`/company_address/?company=${companyId}`);
export const postCompanyAddress = async (data: any) =>
  axiosInstance.post("/company_address/", data);
export const getCompanyWorking = async () =>
  axiosInstance.get("/company_working/");
export const getFilteredCompanyWorking = async (companyId: number) =>
  axiosInstance.get(`/company_working/?company=${companyId}`);
export const postCompanyWorking = async (data: any) =>
  axiosInstance.post("/company_working/", data);
export const postQuotation = async (data: any) =>
  axiosInstance.post("/quotation/", data);
export const getQuotation = async () => axiosInstance.get("/quotation/");
export const downloadQuotationPdf = async (quotationId: number) =>
  axiosInstance.get(`/download-quotation-pdf/${quotationId}/`);
export const getUnits = async () => axiosInstance.get(`unit/`);
export const postUnits = async (data: any) => axiosInstance.post(`unit/`, data);
