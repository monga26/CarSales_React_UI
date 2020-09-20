import React, {useState, useEffect}  from  "react"


const useForm=(initialFielValues,validate,setCurrentId)=>{
    const [values, setValues] = useState(initialFielValues)
    const [errors, setErrors] = useState({})

    const hanldeInputChange=e=>{      

     const {name,value}= e.target
     const fieldValue={[name]:value}

    setValues({
        ...values,
        ...fieldValue
        })
        validate(fieldValue)
    }

    const clearForm=()=>{
        setValues({
            ...initialFielValues
        })
        setErrors({})
        setCurrentId(0)
    }

 return {
     values,setValues,errors, setErrors,hanldeInputChange,clearForm
 };

  
}

export default useForm;