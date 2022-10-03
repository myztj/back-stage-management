import request from "../http";

export const getLabellistApi= (data)=>{
    return request({
        url:'/article/label/search',
        method:'POST',
        data
    })
}

//编辑查询

export const editFindApi= (id)=>{
     return request({
        url:`/article/label/${id}`,
        method:'GET'
     })
}

export const addSubmitApi= (data)=>{
    return request({
        url:'/article/label',
        method:"POST",
        data
    })
}

//编辑事件
export const editSubmitApi=(data)=>{
    return request({
        url:'/article/label',
        method:"PUT",
        data
    })
}

