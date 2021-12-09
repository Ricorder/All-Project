import {config} from 'services/config'

export const getAvatarUrl = (id:string) => {

if(id === '00000000-0000-0000-0000-000000000000'){
    return null;
}
    return `${config.url.API_URL}/0/img/entity/hash/SysImage/Data/${id}`
}
