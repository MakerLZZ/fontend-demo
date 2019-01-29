function Index() {
    this.userList = [{
        id: 0,
        name: 'qwe',
        position: 'position1',
        role: 'role1',
        account: '123',
        password: 'we',
        date: '2018-11-26',
        admin: 'admin',
        phone: 18502315555,
    }];
    this.formInitData = {
        regexpList: [
            /^[a-z\u4E00-\u9FA5\_\-\*]{1,10}$/i,
            /^[a-z0-9]{1,15}$/i,
            /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
        ],
        classnameList: [
            'box-input',
            'box-input box-input-err',
            'box-tip',
            'box-tip tip-hidden'
        ],
        inputs: ['nameInput', 'accInput', 'pwdInput', 'phoneInput'],
        tips: ['nameTip', 'accTip', 'pwdTip', 'phoneTip'],
        tipStr: '请检查输入信息是否有误，确认无误后再重新尝试！'
    };
    // 用户服务 初始化
    this.userServise = new UserServise(this.userList);
    // myForm 组件 初始化
    this.myForm = new MyForm(this.formInitData);
    // myDatatable 组件 初始化
    this.myDatatable = new MyDatatable(this.userServise);
}

Index.prototype = {
    /**
     * 处理批量删除按钮的点击事件
     */
    handleBatchDel: function() {
        // 设置弹框类型 1代表批量删除用户
        domOpt.getDomById('tipBoxType').value = '1';
        // 提示框信息修改
        domOpt.getDomById('tipBoxDetail').innerHTML = '确认删除选中的所有用户吗？';
        myModal.controlModal('confirmInfoModal', 'tip-box', true);
    },
    /**
     * 处理全选框的点击事件
     */
    handleClickAllSelectBox: function() {
        var checkBoxs = domOpt.getDomsByClassname('checkbox');
        // 选中全选
        if (event.target.checked) {
            for (var i = 0; i < checkBoxs.length; i++) {
                checkBoxs[i].checked = true;
            }
        } else { // 未选中全不选 
            for (var j = 0; j < checkBoxs.length; j++) {
                checkBoxs[j].checked = false;
            }
        }
    },
    /**
     * 处理表格删除按钮的点击事件
     * @param {String} id userId
     */
    handleDeleteUser: function(id) {
        // 设置用户id
        domOpt.getDomById('userId').value = id;
        // 0 代表删除一个
        domOpt.getDomById('tipBoxType').value = '0';
        // 提示框信息修改
        domOpt.getDomById('tipBoxDetail').innerHTML = '确认删除该用户吗？';
        // 提示框的显示
        myModal.controlModal('confirmInfoModal', 'tip-box', true);
    },
    /**
     * 处理表格新增、修改、查看按钮的点击事件
     * @param {Number} type 弹框类型
     * @param {Number} id 用户id
     */
    handleOpenUserModal: function(type, id) {
        //显示弹框
        myModal.controlModal('addBox', 'article-box', true);
        //设置弹框类型
        domOpt.getDomById('articleType').value = type;
        //设置用户id
        domOpt.getDomById('userId').value = id;
        //弹框中input框属性设置
        var pwdInput = domOpt.getDomById('pwdInput');
        var boxHead = domOpt.getDomById('boxHead');
        //重置formDom元素
        this.myDatatable.resetFormEl();
        //展示user信息
        this.myDatatable.showUserInfo();
        //增加User
        if (type == 1) {
            //默认所有项显示
            /**
             * 标题更改 账户密码绑定 密码项不可编辑 清空form
             */
            //标题更改
            boxHead.innerHTML = '新增用户';
            //密码项不可编辑
            pwdInput.disabled = true;
        }
        //修改User
        if (type == 2) {
            /**
             * 标题更改 只有账户项隐藏 密码可编辑
             */
            //标题更改
            boxHead.innerHTML = '修改用户';
            //只有账户项隐藏
            domOpt.getDomById('accRow').style.display = 'none';
        }
        //查看User
        if (type == 3) {
            /**
             * 标题更改 只有密码项隐藏 均不可编辑 只有确认按钮
             */
            //标题更改
            boxHead.innerHTML = '用户详情';
            //只有密码项隐藏
            domOpt.getDomById('pwdRow').style.display = 'none';
            //均不可编辑
            var boxInputs = domOpt.getDomsByClassname('box-input');
            var boxSelects = domOpt.getDomsByClassname('box-select');
            for (var i = 0; i < boxInputs.length; i++) {
                boxInputs[i].disabled = true;
            }
            for (var j = 0; j < boxSelects.length; j++) {
                boxSelects[j].disabled = true;
            }
            //只有确认按钮
            domOpt.getDomById('resetBtn').style.display = 'none';
            domOpt.getDomById('cancleBtn').style.display = 'none';
        }
    },
    /**
     * 处理表单input框的输入事件
     * @param {String} inputId input框Id
     * @param {String} tipId input框对应tipId
     */
    handleFormInput: function(inputId, tipId) {
        if (inputId === 'accInput') {
            this.myForm.bindAccAndPwd();
        }
        var condition = this.myForm.validFormInput(inputId);
        this.myForm.changeInputStyle(inputId, tipId, condition);
    },
    /**
     * 处理确认信息模态框确定按钮的点击事件
     */
    handleConfirm: function() {
        var tipType = domOpt.getDomById('tipBoxType').value;
        var idArr = [];
        if (tipType === '0') {
            var id = domOpt.getDomById('userId').value;
            idArr.push(parseInt(id, 10));
            this.myDatatable.deleteTableUsers(idArr);
        }
        if (tipType === '1') {
            var checkboxs = domOpt.getDomsByClassname('checkbox');

            for (var i = 0; i < checkboxs.length; i++) {
                if (checkboxs[i].checked) {
                    idArr.push(parseInt(checkboxs[i].value, 10));
                }
            }
            this.myDatatable.deleteTableUsers(idArr);
        }
        myModal.controlModal('confirmInfoModal', 'tip-box-hidden', false);
    },
    /**
     * 处理确认信息模态框确定按钮的点击事件
     */
    handleCancle: function() {
        myModal.controlModal('confirmInfoModal', 'tip-box-hidden', false);
    },
    /**
     * 处理用户模态框确定按钮的点击事件
     */
    handelUserModalConfirm: function() {
        //获取提交类型 1新增 2修改 3查看
        var type = domOpt.getDomById('articleType').value;
        //查看 如果是查看直接返回
        if (type == '3') {
            this.handleUserModalCancle();
            return;
        }
        var formSubmitValid = this.myForm.validForm();
        if (!formSubmitValid) {
            return false;
        }
        //用户列表长度
        var userListSize = this.userServise.getUserListSize();
        // 新建用户
        var user = {
            id: userListSize + 1,
            date: '2019-7-1',
            admin: 'admin'
        };
        //获取表格信息
        var form = domOpt.getDomById('articleForm');

        //获取用户id
        var id = domOpt.getDomById('userId').value;
        var preUser = this.userServise.findUserById(parseInt(id)) || user;

        for (var i = 0; i < form.length; i++) {
            var item = form.elements[i];
            if (item.name == 'name') {
                user.name = item.value;
                preUser.name = item.value;
            }
            if (item.name == 'position') {
                user.position = item.value;
                preUser.position = item.value;
            }
            if (item.name == 'role') {
                user.role = item.value;
                preUser.role = item.value;
            }
            if (item.name == 'account') {
                user.account = item.value;
                preUser.account = item.value;
            }
            if (item.name == 'password') {
                user.password = item.value;
                preUser.password = item.value;
            }
            if (item.name == 'phone') {
                user.phone = item.value;
                preUser.phone = item.value;
            }
        }

        //增加
        if (type == '1') {
            this.myDatatable.addTableUser(user);
            this.handleUserModalCancle();
            
        }
        //修改
        if (type == '2') {
            this.myDatatable.modifyTableUser(id, preUser);
            this.handleUserModalCancle();
        }
    },
    /**
     * 处理用户模态框重置按钮的点击事件
     */
    handleUserModalReset: function() {
        domOpt.getDomById('articleForm').reset();
    },
    /**
     * 处理用户模态框取消按钮的点击事件
     */
    handleUserModalCancle: function() {
        myModal.controlModal('addBox', 'article-box add-box-hidden', false);
        this.handleUserModalReset();
    }
};

var index = new Index();