/**
 * MyDatatable 构造函数
 * @param {Object} userServise 用户服务
 */
function MyDatatable(userServise) {
    this.userServise = userServise;
    this.showDatatable();
}
// 构造MyDatatable的原型
MyDatatable.prototype = {
    /**
     * 显示表格数据
     */
    showDatatable: function() {
        var printUserList = this.userServise.findUser('');
        var tbody = domOpt.getDomById('tableBody');
        tbody.innerHTML = '';
        var index = 0;
        printUserList.forEach(v => {
            index++;
            var positionStr = v.position;
            if (v.position == 'position1') {
                positionStr = '康凯斯';
            }
            if (v.position == 'position2') {
                positionStr = '几米';
            }
            if (v.position == 'position3') {
                positionStr = '惠州';
            }
            var roleStr = v.role;
            if (v.role == 'role1') {
                roleStr = '仓库管理员';
            }
            if (v.role == 'role2') {
                roleStr = '财务管理员';
            }
            var tr = '<tr class="main-tb-tr"><td class="checkbox-column"><input class="checkbox" type="checkbox"" value="'
                + v.id + '" >' + index + '</td><td>'
                + v.name + '</td><td>'
                + positionStr + '</td><td>'
                + roleStr + '</td><td>'
                + v.account + '</td><td>'
                + v.date + '</td><td>'
                + v.admin + '</td><td>'
                + '<a class="main-tb-a" onclick="index.handleOpenUserModal('
                + '3,' + v.id + ')"><img src="./img/query.png" title="query"></a><a class="main-tb-a" onclick="index.handleOpenUserModal('
                + '2,' + v.id + ')"><img src="./img/modify.png" title="modify"></a><a class="main-tb-a" onclick="index.handleDeleteUser('
                + v.id + ')"><img src="./img/delete.png" title="delete"></a></td></tr>';
            tbody.innerHTML += tr;
        });
    },
    /**
     * 展示当前User信息（查看和修改时展示）
     */
    showUserInfo: function() {
        var idStr = domOpt.getDomById('userId').value;
        var id = parseInt(idStr);
        if (id == -1) {
            return;
        }
        var user = this.userServise.findUserById(id);
        // 显示用户模态框
        myModal.controlModal('addBox', 'article-box', true);
        var form = domOpt.getDomById('articleForm');
        for (var i = 0; i < form.length; i++) {
            var item = form.elements[i];
            if (item.name == 'name') {
                item.value = user.name;
            }
            if (item.name == 'position') {
                item.value = user.position;
            }
            if (item.name == 'role') {
                item.value = user.role;
            }
            if (item.name == 'account') {
                item.value = user.account;
            }
            if (item.name == 'password') {
                item.value = user.password;
            }
            if (item.name == 'phone') {
                item.value = user.phone;
            }
        }
    },
    /**
     * 重置表单元素（新增修改查看表单元素不同）
     */
    resetFormEl: function() {
        //handleUserModalReset();
        var boxInputs = domOpt.getDomsByClassname('box-input');
        var boxSelects = domOpt.getDomsByClassname('box-select');
        /**
         * 全部可编辑 按钮全部显示
         */
        //全部可编辑
        for (var i = 0; i < boxInputs.length; i++) {
            boxInputs[i].disabled = false;
        }
        for (var j = 0; j < boxSelects.length; j++) {
            boxSelects[j].disabled = false;
        }
        //全部展示
        domOpt.getDomById('accRow').style.display = 'block';
        domOpt.getDomById('pwdRow').style.display = 'block';
        //按钮全部显示
        domOpt.getDomById('resetBtn').style.display = 'inline-block';
        domOpt.getDomById('cancleBtn').style.display = 'inline-block';
    },
    /**
     * 增加表格用户
     * @param {Object} user user
     */
    addTableUser: function(user) {
        this.userServise.addUser(user);
        this.showDatatable();
    },
    /**
     * 删除表格指定用户
     * @param {String} idStr 选中用户idArr
     */
    deleteTableUsers: function(idArr) {
        this.userServise.deleteUsers(idArr);
        this.showDatatable();
    },
    /**
     * 修改表格指定用户
     * @param {String} id 需要修改的用户Id
     * @param {Object} preUser 需要修改的用户
     */
    modifyTableUser: function(id, preUser) {
        this.userServise.modifyUser(id, preUser);
        this.showDatatable();
    }
};