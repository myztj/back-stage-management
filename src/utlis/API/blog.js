import request from '../http'

export const getArticleListApi = (data) => {
  return request({
    url: '/article/article/search',
    method: 'POST',
    data
  })
}

//查看APi
export const getExamineApi=(id)=>{
    return request({
      url:`/article/article/${id}`,
      method:"GET"
    })
}

//查看的列表
export const geiExamineListApi = ()=>{
    return request({
      url:'article/category/label/list',
      method:'GET'
    })
}

//审核
export const handerlPassApi=(id)=>{
  return request({
    url:`/article/article/audit/success/${id}`,
    method:'GET'
  })
}

export const handerlNotPassApi=(id)=>{
  return request({
    url:`/article/article/audit/fail/${id}`,
    method:'GET'
  })
}
