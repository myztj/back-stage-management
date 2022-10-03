import request from "../http";

//获取中数据
export const getCategoryLsitApi= (data)=>{
    return request({
        url:'/article/category/search',
        method:'POST',
        data
    })
}

//编辑查询

export const editFindApi = (id)=>{
    return request({
        url:`/article/category/${id}`,
        method:'GET'
    })
}

//添加事件
export const addSubmitApi=(data)=>{
    return request({
        url:'/article/category',
        method:"POST",
        data
    })
}

//编辑事件
export const editSubmitApi=(data)=>{
    return request({
        url:'/article/category',
        method:"PUT",
        data
    })
}