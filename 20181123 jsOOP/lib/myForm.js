/**
 * 表单构造函数
 * @param {Object} formInitData 表单初始化需要的数据
 */
function MyForm(formInitData) {
    this.regexpList = formInitData.regexpList;
    this.classnameList = formInitData.classnameList;
    this.inputs = formInitData.inputs;
    this.tips = formInitData.tips;
    this.tipStr = formInitData.tipStr;
}
// 构造MyForm的原型
MyForm.prototype = {
    /**
     * 绑定账户密码
     */
    bindAccAndPwd: function() {
        var accInput = domOpt.getDomById(this.inputs[1]);
        var pwdInput = domOpt.getDomById(this.inputs[2]);
        pwdInput.value = accInput.value;
    },
    /**
     * 验证表单input框
     * @param {String} inputId input框id
     */
    validFormInput: function(inputId) {
        var value = domOpt.getDomById(inputId).value;
        var inputValid = false;
        if (inputId === this.inputs[0]) {
            inputValid = this.regexpList[0].test(value);
        }
        if (inputId === this.inputs[1] || inputId === this.inputs[2]) {
            inputValid = this.regexpList[1].test(value);
        }
        if (inputId === this.inputs[3]) {
            inputValid = this.regexpList[2].test(value);
        }
        return inputValid;
    },
    /**
     * 改变input框和提示语句的样式
     * @param {String} inputId input框Id
     * @param {String} tipId input框对应tipId
     * @param {Boolean} condition 验证的正误
     */
    changeInputStyle: function(inputId, tipId, condition) {
        if (!condition) {
            domOpt.modifyElClassName(inputId, this.classnameList[1]);
            domOpt.modifyElClassName(tipId, this.classnameList[2]);
        } else {
            domOpt.modifyElClassName(inputId, this.classnameList[0]);
            domOpt.modifyElClassName(tipId, this.classnameList[3]);
        }
    },
    /**
     * 验证表单
     */
    validForm: function() {
        var formValid = true;
        for (var f = 0; f < this.inputs.length; f++) {
            if (!this.validFormInput(this.inputs[f])) {
                formValid = false;
                this.changeInputStyle(this.inputs[f], this.tips[f], formValid);
                alert(this.tipStr);
                break;
            }
        }
        return formValid;
    },
};