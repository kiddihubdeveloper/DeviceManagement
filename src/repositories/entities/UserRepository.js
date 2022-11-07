import Repository from "../repositories.js";

const resource = "/users";

export default {
    /**
     * Lấy tất cả users từ database
     * @returns {Promise} - Promise chứa danh sách employees
     * */
    getAll: () => Repository.get(`${resource}`),
    deleteItem: (id) => Repository.delete(`${resource}/${id}`),
}