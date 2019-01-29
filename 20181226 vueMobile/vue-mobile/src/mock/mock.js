import Mock from 'mockjs';
// 订单列表数据
const orderList = {
    code: 0,
    'data|4':[{
        'orderId': '@id',
        'orderCond|1': [
            '未支付','已完成'
        ],
        'type|1': [
            '电话','短信'
        ],
        'price|1-20.1-2': 1,
        'num|1-100': 1,
        'date': '@datetime',
    }]
};

// 设置警告信息
const setWarnDetail = {
    code: 0,
    'data': [
        {
            id: 1,
            title: '声控报警',
            condition: false
        },
        {
            id: 2,
            title: '换卡报警',
            condition: true
        }
    ]
};

Mock.mock(/\/get_order_list/, orderList);
Mock.mock(/\/get_set_detail/, setWarnDetail);

export default Mock;