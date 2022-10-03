import request from "../http";

export const getLabellistApi= (data)=>{
    return request({
        url:'/article/advert/search',
        method:'POST',
        data
    })
}

//编辑查询

export const editFindApi= (id)=>{
     return request({
        url:`/article/advert/${id}`,
        method:'GET'
     })
}

export const addSubmitApi= (data)=>{
    return request({
        url:'/article/advert',
        method:"POST",
        data
    })
}

//编辑事件
export const editSubmitApi=(data)=>{
    return request({
        url:'/article/advert',
        method:"PUT",
        data
    })
}

