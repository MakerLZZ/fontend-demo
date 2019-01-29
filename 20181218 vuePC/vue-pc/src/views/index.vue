<template>
    <div class="layout">
        <Layout :style="{height: '100%'}">
            <Header :style="{
                    height: '60px',
                    padding: '0',
                    lineHeight: '60px',
                    background: '#001529'
                }">
                <Row>
                    <Col span="4">
                    <div class="head-logo">
                        <img
                            src="../assets/images/logo.png"
                            alt="logo"
                        >
                    </div>
                    </Col>
                    <Col span="17">
                    <Menu
                        mode="horizontal"
                        theme="dark"
                        active-name="1"
                        :style="{background: '#001529'}"
                    >
                        <MenuItem
                            name="1"
                            :style="{padding: '0 25px'}"
                        >
                        <Icon type="ios-navigate" />
                        首页
                        </MenuItem>
                        <Submenu name="2">
                            <template slot="title">
                                客户管理
                            </template>
                            <MenuItem name="1-1">活跃分析</MenuItem>
                            <MenuItem name="1-2">时段分析</MenuItem>
                            <MenuItem name="1-3">用户留存</MenuItem>
                            <MenuItem name="1-4">流失用户</MenuItem>
                        </Submenu>
                    </Menu>
                    </Col>
                    <Col span="3">
                    <div class="message">
                        <span class="message-user">您好，admin</span>
                        <div>
                            <a>消息中心（0未读）</a>
                            <a>
                                <Icon
                                    type="ios-contact"
                                    :style="{margin: '0 5px 0 15px'}"
                                />个人中心</a>
                        </div>
                    </div>
                    </Col>
                </Row>
            </Header>
            <Content :style="{
                    padding: '24px 8px 8px 24px',
                    display: 'flex',
                    flexFlow: 'column',
                    flex: 1
                }">
                <Row
                    :style="{height: '100%'}"
                    :gutter="16"
                >
                    <Col
                        :style="{height: '100%'}"
                        span="4"
                    >
                    <div class="center-col center-col-left">
                        <div class="center-col-head">
                            客户列表
                        </div>
                        <div class="center-col-body">
                            <div class="center-col-body-top">
                                <AutoComplete
                                    v-model="searchValue"
                                    icon="ios-search"
                                    placeholder="请输入客户名称"
                                    style="width:100%"
                                    @on-search="handleSearch"
                                    @on-change="handleSearchChange"
                                >
                                    <div
                                        v-bind:key="key"
                                        v-for="(item,key) in autoCompleteData"
                                    >
                                        <Option :value="item">
                                            <span>{{ item }}</span>
                                        </Option>
                                    </div>
                                </AutoComplete>
                            </div>
                            <div class="center-col-body-bottom">
                                <Tree
                                    :data="treeData"
                                    empty-text
                                >
                                </Tree>
                            </div>
                        </div>
                    </div>
                    </Col>
                    <Col
                        :style="{height: '100%'}"
                        span="20"
                    >
                    <div class="center-col center-col-right">
                        <div class="center-col-head">
                            详情列表
                        </div>
                        <div class="center-col-body">
                            <div class="center-col-body-top">
                                <Button @click="handleAddClick">
                                    <Icon
                                        type="md-add"
                                        :style="{marginRight: '10px'}"
                                    ></Icon>新增客户
                                </Button>
                            </div>
                            <div class="center-col-body-bottom">
                                <Table
                                    :height="650"
                                    border
                                    :columns="columns"
                                    :data="tableData"
                                ></Table>
                                <div class="center-col-body-page">
                                    <Page
                                        :current="page"
                                        :page-size="pageSize"
                                        :total="total"
                                        size="small"
                                        show-total
                                        @on-change="handlePageChange"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    </Col>
                </Row>
            </Content>
        </Layout>
        <Modal
            v-model="modal"
            :title="modalTitle"
            :footer-hide="true"
        >
            <Form
                ref="formValidate"
                :model="formValidate"
                :rules="ruleValidate"
                :label-width="80"
            >
                <FormItem
                    label="客户名称"
                    prop="name"
                >
                    <Input
                        v-model="formValidate.name"
                        placeholder="输入客户名称"
                    ></Input>
                </FormItem>
                <FormItem
                    label="标签"
                    prop="mark"
                >
                    <Input
                        v-model="formValidate.mark"
                        placeholder="输入标签"
                    ></Input>
                </FormItem>
                <FormItem
                    label="账号"
                    prop="account"
                >
                    <Input
                        v-model="formValidate.account"
                        placeholder="输入账号"
                    ></Input>
                </FormItem>
                <FormItem
                    label="联系人"
                    prop="linkman"
                >
                    <Input
                        v-model="formValidate.linkman"
                        placeholder="输入联系人名称"
                    ></Input>
                </FormItem>
                <FormItem
                    label="联系电话"
                    prop="phone"
                >
                    <Input
                        v-model="formValidate.phone"
                        placeholder="输入联系电话"
                    ></Input>
                </FormItem>
                <FormItem
                    label="上级客户"
                    prop="superior"
                >
                    <Input
                        v-model="formValidate.superior"
                        placeholder="输入上级客户名称"
                    ></Input>
                </FormItem>
                <FormItem>
                    <Button
                        type="primary"
                        @click="handleSubmit('formValidate')"
                    >确认</Button>
                    <Button
                        @click="handleReset('formValidate')"
                        style="margin-left: 8px"
                    >重置</Button>
                    <Button
                        @click="handleCancleClick('formValidate')"
                        style="margin-left: 8px"
                    >取消</Button>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>
<script>
export default {
    name:'Index',
    data () {
        const validatePhone = (rule, value, callback) => {
            if (!/^1[3456789]\d{9}$/.test(value)) {
                callback('手机号格式不正确');
            } else {
                callback();
            }   
        };
        return {
            // 获取表格数据请求路由
            url: 'https://www.easy-mock.com/mock/5c199d8638be3861fc311abd/test/getTableData',
            // 查询的值
            searchValue: '',
            // 模糊匹配选项值
            autoCompleteData:[],
            // 树数据
            treeData: [
                {
                    title: 'parent 1',
                    expand: true,
                    children: [
                        {
                            title: 'parent 1-1',
                            expand: true,
                            selected: true,
                            children: [
                                {
                                    title: 'leaf 1-1-1'
                                },
                                {
                                    title: 'leaf 1-1-2'
                                }
                            ]
                        },
                        {
                            title: 'parent 1-2',
                            expand: true,
                            children: [
                                {
                                    title: 'leaf 1-2-1',
                                },
                                {
                                    title: 'leaf 1-2-2'
                                }
                            ]
                        }
                    ]
                }
            ],
            
            // 表格头数据
            columns: [
                {
                    title: '序号',
                    key: 'no',
                    type: 'index',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '客户名称',
                    key: 'name',
                    align: 'center'
                },
                {
                    title: '标签',
                    key: 'mark',
                    align: 'center'
                },
                {
                    title: '账号',
                    key: 'account',
                    align: 'center'
                },
                {
                    title: '联系人',
                    key: 'linkman',
                    align: 'center'
                },
                {
                    title: '联系电话',
                    key: 'phone',
                    align: 'center'
                },
                {
                    title: '上级客户',
                    key: 'superior',
                    align: 'center'
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 150,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.handleModifyClick(params.row,params.index);
                                    }
                                }
                            }, '修改'),
                        ]);
                    }
                }
            ],
            // 获取到表格数据的容器
            getTableData: [],
            // 表格数据（对应页）
            tableData: [],
            // 表格页码
            page: 1,
            // 每页行数
            pageSize: 20,
            // 表格数据总条数
            total: 0,
            // 表格行的下标
            rowIndex: -1,

            // 模态框显示隐藏
            modal: false,
            // 模态框标题
            modalTitle: '',
            // 模态框类型（新增-1，修改1）
            modalCondition: 0,
            
            // form表单数据
            formValidate: {
                name: '',
                mark: '',
                account: '',
                linkman: '',
                phone: '',
                superior: ''
            },
            // form表单验证规则
            ruleValidate: {
                name: [
                    { required: true, message: '输入不能为空', trigger: 'blur' }
                ],
                mark: [
                    { required: true, message: '输入不能为空', trigger: 'blur' }
                ],
                account: [
                    { required: true, message: '输入不能为空', trigger: 'blur' }
                ],
                linkman: [
                    { required: true, message: '输入不能为空', trigger: 'blur' }
                ],
                phone: [
                    { required: true, message: '输入不能为空', trigger: 'blur' },
                    { validator:validatePhone,  message: '请输入正确的手机号码', trigger: 'change'}
                ],
                superior: [
                    { required: true, message: '输入不能为空', trigger: 'blur' }
                ]
            }
        };
    },
    mounted() {
        this.loadData();
    },
    methods: {
        /**
         * 加载数据
         */
        loadData() {
            // 请求数据
            this.$axios.get(this.url).then((res) => {
                // 数据赋值
                this.getTableData = res.data.data;
                // 数据处理
                this.handleTableData(this.page,this.pageSize,res.data.data);
                // 显示
                this.total = res.data.data.length;
            }).catch((err) => {
                alert(err.toString());
            });
        },
        /**
         * 处理表格数据
         * @param {Number} page 页码
         * @param {Number} pageSize 每页条数
         * @param {Object} data 源数据
         */
        handleTableData(page, pageSize, data) {
            this.tableData = [];
            let length = data.length;
            let index = (page - 1) * pageSize;

            for(let i = 0; i < pageSize; i++) {
                let flag = index + i;
                if(flag >= length){
                    break;
                }
                this.tableData.push(data[index + i]);
            }
        },
        /**
         * 处理模糊查询
         * @param {String} val 输入的内容
         */
        handleSearch (val) {
            this.autoCompleteData = [];
            if(!val){
                return;
            }
            this.showSearchTitle(this.treeData,val);
            return;
        },
        /**
         * 显示查询标题
         * @param {Object} node 节点
         * @param {String} val 需要比较的内容
         */
        showSearchTitle(node, val) {
            if(!node){
                return;
            }
            for(let i = 0; i < node.length; i++){
                let title = node[i].title;
                if(node[i].children){
                    this.showSearchTitle(node[i].children,val);
                }
                if(title.includes(val)){
                    this.autoCompleteData.push(title);
                }
            }
        },
        /**
         * 获取节点 Key
         * @param {String} val 需要比较的内容
         * @param {Stack} stack 节点容器
         */
        getNodeKey(val, stack) {
            if(stack.size() === 0){
                return -1;
            }
            let p = stack.pop();
            for(let i = 0; i < p.length; i++){
                let title = p[i].title;
                let nodeKey = p[i].nodeKey;
                if(title === val){
                    return nodeKey;
                }
                if(p[i].children){
                    stack.push(p[i].children);
                }
            }
            return this.getNodeKey(val, stack);
        },
        /**
         * 处理模糊查询值列表选中事件
         * @param {String} val 输入的内容
         */
        handleSearchChange(val) {
            var stack = new this.$stack();
            stack.push(this.treeData);
            this.getNodeKey(val,stack);
            // console.log(this.getNodeKey(val,stack));
        },
        /**
         * 处理修改点击事件
         * @param {Object} row 行
         * @param {Number} index 行下标
         */
        handleModifyClick(row, index) {
            this.modalCondition = 1;
            this.modalTitle = '修改客户信息';
            this.rowIndex = index;
            // es6
            this.formValidate = {...row};
            this.modal = true;
        },
        /**
         * 处理页码改变
         * @param {Number} page 页码
         */
        handlePageChange(page) {
            this.page = page;
            this.handleTableData(page, this.pageSize, this.getTableData);
        },
        /**
         * 处理添加点击事件
         */
        handleAddClick() {
            this.modalCondition = -1;
            this.modalTitle = '新增客户';
            this.rowIndex = -1;
            this.modal = true;
        },
        /**
         * 处理表单提交事件
         * @param {String} name 表单注册字符
         */
        handleSubmit(name) {
            // let flag = JSON.parse(JSON.stringify(this.formValidate));
            let flag = {...this.formValidate};
            this.$refs[name].validate((valid) => {
                if(!valid){
                    return this.$Message.error('请检查是否输入正确!');
                }
                if(this.modalCondition === -1) {
                    this.tableData.splice(0,0,flag);
                    // this.tableData.push(flag);
                    this.$Message.success('新增客户成功!');
                    this.modal = false;
                }
                if(this.modalCondition === 1) {
                    // this.tableData[this.rowIndex] = flag;
                    this.tableData.splice(this.rowIndex,1,flag);
                    this.$Message.success('修改客户信息成功!');
                    this.modal = false;
                }
                this.$refs[name].resetFields();
            });
        },
        /**
         * 处理表单重置
         * @param {String} name 表单注册字符
         */
        handleReset(name) {
            this.$refs[name].resetFields();
        },
        /**
         * 处理表单取消
         * @param {String} name 表单注册字符
         */
        handleCancleClick(name) {
            this.modal = false;
            this.$refs[name].resetFields();
        },
    }
};
</script>

<style lang="scss" scoped>
.layout {
    height: 100%;

    .head-logo {
        > img {
            vertical-align: middle;
        }
    }

    .message {
        position: relative;

        > div {
            display: flex;
            justify-content: flex-end;
            height: 60px;
            padding: 8px 30px 0 0;

            > a {
                font-size: 14px;
                color: #fff;
            }
        }

        .message-user {
            position: absolute;
            top: 13px;
            right: 30px;
            height: 14px;
            line-height: 14px;
            color: #fff;
        }
    }

    .center-col:hover {
        box-shadow: 1px 1px 10px rgba(214, 214, 214, 0.9);
    }

    .center-col {
        display: flex;
        flex-flow: column;
        height: 100%;
        border: 1px solid #e8eaec;
        border-radius: 4px;
        color: #515a6e;
        background: #fff;

        .center-col-head {
            display: flex;
            align-items: center;
            height: 50px;
            padding: 0 20px;
            border-bottom: 1px solid #e8eaec;
            font-size: 14px;
            font-weight: 900;
            color: #17233d;
        }

        .center-col-body {
            display: flex;
            flex-flow: column;
            flex: 1;
            padding: 20px 20px;
            text-align: left;

            .center-col-body-top {
                height: 32px;
                margin-bottom: 25px;

                > button {
                    padding: 5px 10px 6px;
                }
            }

            .center-col-body-bottom {
                flex: 1;
                overflow: auto;
            }
        }
    }

    .center-col-left {
        .center-col-body-bottom {
            padding: 20px 15px;
            border: 1px solid #e8eaec;
            border-radius: 4px;
        }
    }

    .center-col-right {
        // overflow: auto;

        .center-col-body-bottom {
            padding: 0;
        }

        .center-col-body-page {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            height: 40px;
            border: 1px solid #e8eaec;
            border-top: 0;
        }
    }
}
</style>
