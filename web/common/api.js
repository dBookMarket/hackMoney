/**   
 * api接口统一管理
 */
import {
  post,get,put,deleteP,patch,formDataReq
} from '@/common/ajax.js'
import web from '@/common/web.js'

/**
 * 登录
 */
export const login = params => post('/api/v1/login', params);
/**
 * 获取登录随机数
 */
export const postNonce = params => post('/api/v1/nonce', params);
/**
 * 登出
 */
export const logout = params => post('/api/v1/logout', params);
/**
 * 个人资产
 */
export const getAssets = params => get('/api/v1/assets', params);
/**
 * 书签
 */
export const bookmarks = params => patch('/api/v1/bookmarks', params);
/**
 *create book 创建书籍
 */
export const postIssues = params => post('/api/v1/issues', params);
/**
 * 读取list书籍
 */
export const getAllIssues = params => get('/api/v1/issues', params);
/**
 * 读取书籍
 */
export const getIssue = id => get('/api/v1/issues/'+id);
/**
 * 修改书籍 update book partially 修改
 */
export const formDataIssues = (id,params,method) => formDataReq('/api/v1/issues/'+id,params,method);
/**
 * 上传后 上架操作并且生成合约记录
 */
export const putIssuesTrade = (id,params) => put('/api/v1/issues/'+id+'/trade',params);
/**
 * 查询当前上传issues的状态 status，"Uploading", "Uploaded", "Failure", "Success”
 */
export const getIssuesCurrent = params => get('/api/v1/issues/current', params);

/**
 * 获取发布书籍的权限
 */
export const getPermissions = params => get('/api/v1/permissions', params);

/**
 * 删除banner
 */
export const delBanners = params => deleteP('/api/v1/banners', params);

/**
 * banner
 */
export const postBanners = params => post('/api/v1/banners', params);
/**
 * banner
 */
export const getBanners = params => get('/api/v1/banners', params);
/**
 * 撤销挂单
 */
export const delTrades = id => deleteP('/api/v1/trades/'+id);
/**
 * 某一项挂单
 */
export const patchTrades = params => patch('/api/v1/trades', params);
/**
 * 卖出挂单
 */
export const postTrades = params => post('/api/v1/trades', params);
/**
 * list 交易详情的列表接口
 */
export const getTrades = params => get('/api/v1/trades', params);
/**
 * list 我的出售中书籍
 */
export const getUserTrades = params => get('/api/v1/trades/current-user', params);
/**
 * list 我的交易记录
 */
export const getUserTransactions = params => get('/api/v1/transactions/current-user', params);

/**
 * 购买
 */
export const postTransactions = params => post('/api/v1/transactions', params);
/**
 * 获取列表
 */
export const getTransactions = params => get('/api/v1/transactions', params);
/**
 * 合约
 */
export const delContracts = params => deleteP('/api/v1/contracts', params);
/**
 * 合约
 */
export const patchContracts = params => patch('/api/v1/contracts', params);
/**
 * 合约
 */
export const postContracts = params => post('/api/v1/contracts', params);
/**
 * 合约
 */
export const getContracts = params => get('/api/v1/contracts', params);
/**
 * 书籍分类
 */
export const delCategories = params => deleteP('/api/v1/categories', params);
/**
 * 书籍分类
 */
export const patchCategories = params => patch('/api/v1/categories', params);
/**
 * 书籍分类
 */
export const postCategories = params => post('/api/v1/categories', params);
/**
 * 书籍分类
 */
export const getCategories = params => get('/api/v1/categories', params);
