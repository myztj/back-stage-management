import request from "../http";

export const getLabellistApi= (data)=>{
    return request({
        url:'/system/role/search',
        method:'POST',
        data
    })
}

//编辑查询

export const editFindApi= (id)=>{
     return request({
        url:`/system/role/${id}`,
        method:'GET'
     })
}

export const addSubmitApi= (data)=>{
    return request({
        url:'/system/role',
        method:"POST",
        data
    })
}

//编辑事件
export const editSubmitApi=(data)=>{
    return request({
        url:'/system/role',
        method:"PUT",
        data
    })
}

//树形弹窗

export const terrListApi=()=>{
    return request({
        url:'/system/menu/search',
        method:"POST",
    })
}