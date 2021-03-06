export const ARTICLE_ACTION_REQUEST = 'PRO/ARTICLE_ACTION_REQUEST';// 标识正在获取
export const ARTICLE_ACTION_FAILURE = 'PRO/ARTICLE_ACTION_FAILURE';//  获取失败
export const ARTICLE_ACTION_SUCCESS = 'PRO/ARTICLE_ACTION_SUCCESS';// 获取成功

export const ARTICLE_ACTION_ADD = 'PRO/ARTICLE_ACTION_ADD';// 添加文章
export const ARTICLE_ACTION_DELETE = 'PRO/ARTICLE_ACTION_DELETE';// 删除文章
export const ARTICLE_ACTION_UPDATE = 'PRO/ARTICLE_ACTION_UPDATE';// 修改文章
export const ARTICLE_ACTION_UPDATE_STATE = 'PRO/ARTICLE_ACTION_UPDATE_STATE';// 修改文章
export const ARTICLE_ACTION_GETARTICLEBYID = 'PRO/ARTICLE_ACTION_GETARTICLEBYID';// 根据id获取对应文章
export const ARTICLE_ACTION_GETARTICLESBYUSERID = 'PRO/ARTICLE_ACTION_GETARTICLESBYUSERID';// 后台 根据用户id,标题获取文章
export const ARTICLE_ACTION_GETARTICLES = 'PRO/ARTICLE_ACTION_GETARTICLES';// 前台 根据用户id查询文章列表

export const ARTICLE_ACTION_GETARTICLEANDPREANDNEXTBYID = 'PRO/ARTICLE_ACTION_GETARTICLEANDPREANDNEXTBYID';// 以选中id为中，获取上中下三篇文章

// 归档
export const ARTICLE_ACTION_GETARCHIVESBYCREATETIME = 'PRO/ARTICLE_ACTION_GETARCHIVESBYCREATETIME';// 根据创建时间归档
