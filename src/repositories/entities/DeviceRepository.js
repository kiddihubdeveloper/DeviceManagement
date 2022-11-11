import Repository from "../repositories.js";

const resource = "/devices";

export default {
    /**
     * Lấy tất cả devices từ database
     * @returns {Promise} - Promise chứa danh sách users
     * */
    getAll: () => Repository.get(`${resource}`),
}