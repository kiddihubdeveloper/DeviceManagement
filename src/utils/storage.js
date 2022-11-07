import jsonfile from 'jsonfile';

export default {
    /**
     * Lấy giá trị của key trong localStorage
     * @param {string} key
     * @return {JSON|undefined} giá trị của key
     **/
    get(key) {
        const data = window.localStorage.getItem(key);
        if (!data) return;
        return JSON.parse(data);
    },

    /**
     * Lưu dữ liệu vào localStorage
     * @param {string} key: từ khoá
     * @param {*} data: dữ liệu
     **/
    store(key, data) {
        window.localStorage.setItem(key, JSON.stringify(data));
    },

    /**
     * Lưu dữ liệu devices vào file json
     * @param {*} devices: dữ liệu thiết bị
     **/
    updateDevices(devices) {
        jsonfile.writeFile('devices.json', JSON.stringify(devices))
            .then(() => {
                console.log('saved');
            })
            .catch(error => console.error(error))
    },

    /**
     * Xoá dữ liệu trong localStorage theo key
     * @param {string} key
     **/
    remove(key) {
        window.localStorage.removeItem(key);
    },

    /**
     * Xoá tất cả dữ liệu trong localStorage
     **/
    wipe() {
        window.localStorage.clear();
    }
}