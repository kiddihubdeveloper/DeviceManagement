import Repository from "../repositories.js";

const resource = "/users";

export default {
    /**
     * Lấy tất cả users từ database
     * @returns {Promise} - Promise chứa danh sách users
     * */
    getAll: () => Repository.get(`${resource}`),

    /**
     * Xoá user theo id
     **/
    delete: (id) => Repository.delete(`${resource}/${id}`),

    /**
     * Lấy user theo ID
     **/
    get: (id) => Repository.get(`${resource}/${id}`),
}