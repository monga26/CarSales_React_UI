import carApi from "./carApi"

export const ACTION_TYPE ={
    
    CREATE: 'CREATE',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE',
    GETALL: 'GETALL'
}

const formateData=data =>({
    ...data
})


export const getAll=()=> dispach =>{
    //Get Car Details
    carApi.cars().getAll()
    .then(
       response=>{
       // console.log(response)
        dispach({
            type:ACTION_TYPE.GETALL,
            payload: response.data
     })

    })    
    .catch(err=> console.log(err))

}




export const create =(data,onSuccess)=> dispach =>{
    data=formateData(data)
    carApi.cars().create(data)
    .then(res=>{

        dispach({
            type:ACTION_TYPE.CREATE,
            headers: { 'Content-Type': 'application/json' },
            payload: res.data
     })
     onSuccess()
    })
    .catch(err=> console.log(err))

}

export const update =(id,data,onSuccess)=> dispach =>{
    data=formateData(data)
    carApi.cars().update(id,data)
    .then(res=>{
        dispach({
            type:ACTION_TYPE.UPDATE,
            payload: {id, ...data}
     })
     onSuccess()
    })
    .catch(err=> console.log(err))

}


export const Delete =(id,onSuccess)=> dispach =>{
    carApi.cars().delete(id)
    .then(res=>{
        dispach({
            type:ACTION_TYPE.DELETE,
            payload: id
     })
     onSuccess()
    })
    .catch(err=> console.log(err))

}


 