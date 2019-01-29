/**
 * DomOpt dom操作方法
 */
var domOpt = {
    /**
     * 修改元素类名
     * @param {String} id 元素id
     * @param {String} name 需改的类名
     */
    modifyElClassName: function(id, name) {
        document.getElementById(id).className = name;
    },

    /**
     * 通过id获取dom元素
     * @param {String} id 元素id
     */
    getDomById: function(id) {
        return document.getElementById(id);
    },

    /**
     * 通过类名获取dom元素
     * @param {String} classname 元素类名
     */
    getDomsByClassname: function(classname) {
        return document.getElementsByClassName(classname);
    }
};

/**
 * MyModal 模态框显示隐藏
 */
var myModal = {
    /**
     * 控制模态框
     * @param {String} id 模态框id
     * @param {String} classname 类名
     * @param {Boolean} type 显示或者隐藏
     */
    controlModal: function(id, classname, type) {
        domOpt.modifyElClassName(id, classname);
        if (type) {
            // 显示蒙版
            domOpt.modifyElClassName('mask', 'mask');
        } else {
            // 隐藏蒙版
            domOpt.modifyElClassName('mask', 'mask mask-hidden');
        }
    }
};