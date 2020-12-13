/**
 *
 *mac
 *2020/12/2
 *495301515@qq.com
 */
import request from '@/http/index'


export function updatePwd(oldPwd,newPwd) {
    const data = {
        oldPwd,
        newPwd
    };
    return request({
        url: '/updatePwd',
        method: 'post',
        data
    })
}

export function loginOut() {
    return request({
        url: '/loginOut',
        method: 'post',
    })
}

export function login(username, pwd) {
    const data = {
        username,
        pwd,
    };
    return request({
        url: '/login',
        method: 'post',
        data: data
    })
}

/** 获取抽奖参数 */
export function getLotteryParams() {
    return request({
        url: '/luckSetting',
        method: 'get'
    })
}

/** 修改抽奖参数 */
export function updateLotteryParams(data) {
    return request({
        url: '/luckSetting',
        method: 'post',
        data
    })
}

/** 新增抽奖号码 */
export function saveLotteryCode(data) {
    return request({
        url: '/luckInput/add',
        method: 'post',
        data
    })
}

/** 查询抽奖号码 */
// Integer pageNo,
// Integer pageSize,
// Long recordId
export function queryLotteryCode(params) {
    return request({
        url: '/luckInput/pageList',
        method: 'get',
        params
    })
}
/** 修改抽奖号码 */
export function updateLotteryCode(data) {
    return request({
        url: '/luckInput/update',
        method: 'post',
        data
    })
}
/** 删除抽奖号码 */
export function deleteLotteryCode(id) {
    return request({
        url: `/luckInput/delete/${id}`,
        method: 'delete',
    })
}



/** 立即抽奖 */
export function promptlyLottery() {
    return request({
        url: `luckRecord/operationResult`,
        method: 'get',
    })
}

/** 查询历史记录 */
export function lastDaysRecords() {
    return request({
        url: `luckRecord/last20DaysRecords`,
        method: 'get',
    })
}

/** 历史记录查询幸运号码 */
export function listAwardRecord(id) {
    return request({
        url: `luckRecord/listAwardRecord`,
        method: 'get',
        params:{recordId: id}
    })
}

/** 查看中奖人 */
export function recordByLuckId(id) {
    return request({
        url: `luckRecord/listInputRecordByLuckId`,
        method: 'get',
        params:{luckId: id}
    })
}

/** 选为中奖号码 */
export function suerWinningNumber(id) {
    return request({
        url: `luckRecord/suerWinningNumbers`,
        method: 'get',
        params:{luckId: id}
    })
}

/** 清空抽奖号 */
export function clearLottery() {
    return request({
        url: `/luckInput/clear`,
        method: 'put',
    })
}

// export function login(params) {
//     return request({
//         url: 'seller/goods',
//         method: 'get',
//         loading: false,
//         params
//     })
// }
