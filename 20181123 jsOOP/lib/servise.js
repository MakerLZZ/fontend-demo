/**
 * 用户服务构造函数
 * @param {Array} userList 初始化用户数组（可从数据库中获取）
 */
function UserServise(userList) {
    this.userList = userList;
}
// 构造UserServise的原型
UserServise.prototype = {
    /**
     * 增加user
     * @param {Object} user 用户对象
     */
    addUser: function(user) {
        this.userList.push(user);
    },
    /**
     * 批量删除user
     * @param {Array} idArr 用户id数组
     */
    deleteUsers: function(idArr) {
        for (var i = 0; i < idArr.length; i++) {
            this.userList.splice(this.userList.findIndex(item => item.id == idArr[i]), 1);
        }
    },
    /**
     * 修改user
     * @param {Number} id 用户id
     * @param {Object} newUser 新用户
     */
    modifyUser: function(id, newUser) {
        let user = this.userList.find((v) => {
            return v.id == id;
        });
        user.name = newUser.name;
        //position 转换
        user.position = newUser.position;
        //role 转换
        user.role = newUser.role;
        user.password = newUser.password;
        user.phone = newUser.phone;
    },
    /**
     * 查找user
     * @param {String} key 关键字
     */
    findUser: function(key) {
        let newUserList = [];
        this.userList.forEach(v => {
            if (v.name.includes(key) || (v.account + '').includes(key)) {
                newUserList.push(v);
            }
        });
        return newUserList;
    },
    /**
     * 通过id查找User
     * @param {Number} id 用户id
     */
    findUserById: function(id) {
        return this.userList.find((v) => { return v.id == id; });
    },
    /**
     * 获取userList Size
     */
    getUserListSize: function() {
        return this.userList.length;
    }
};