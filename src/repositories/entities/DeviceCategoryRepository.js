import Repository from "../repositories.js";

const resource = "/deviceCategories";

export default {
    /**
     * Lấy tất cả deviceCategories từ database
     * @returns {Promise} - Promise chứa danh sách users
     * */
    getAll: () => Repository.get(`${resource}`),
}