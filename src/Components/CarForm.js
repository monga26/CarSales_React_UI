import { FormControl, Grid, InputLabel, MenuItem, TextField, withStyles,Select,Button, FormHelperText } from "@material-ui/core";
import React,{useState, useEffect} from "react";
import useForm  from "./useForm";
import {connect} from "react-redux";
import * as actions from "../actions/vehicle"
import { useToasts} from "react-toast-notifications"


const styles=theme=>({
    root:{
    '& .MuiTextfiled-root':{
      margin: theme.spacing(1),
      minWidth: 220,
    }},
    formControl:{ 
          margin: theme.spacing(1),
          minWidth: 220,
    },
    smMargin:{
        margin: theme.spacing(1),
    }
})

const initialCarListValues={

    make: '',
    model: '',
    wheels:'',
    engineType:'',
    engineCapactity:'',
    vehicleType:'',
    doors:'',
    carType:''
}




const CarForm =({classes,...props})=>{

    const { addToast }=useToasts()
     
    const validate=(feildValues=values)=>{
      let temp={...errors}
      if('make' in feildValues)
         temp.make=feildValues.make ? "" : "This field is required."
      if('model' in feildValues)
         temp.model=(/^[0-9\b]+$/).test(feildValues.model)?"":"This Field is not valid."
      if('wheels' in feildValues)
          temp.wheels=(/^[0-9\b]+$/).test(feildValues.wheels)?"":"This Field is not valid."
      if('carType' in feildValues)
        temp.carType=feildValues.carType?"":"This field is required."
      if('engineType' in feildValues)
        temp.engineType=feildValues.engineType?"":"This field is required."
        if('doors' in feildValues)
        temp.doors=(/^[0-9\b]+$/).test(feildValues.doors)?"":"This Field is not valid."

      setErrors({
          ...temp
      })

      if(feildValues==values)
      {
           return  Object.values(temp).every(x=>x == "")
      }
    }


    const {
        values,
        setValues,
        errors, 
        setErrors,
        hanldeInputChange,
        clearForm
    }=useForm(initialCarListValues,validate,props.setCurrentId);

    const inputLabel=React.useRef(null);
    const [labelWidth,setLabelWidth]=React.useState(0);
    React.useEffect(()=>{
        setLabelWidth(inputLabel.current.offsetWidth);
    },[]);
     

    const handleSubmit = (e) => {

        e.preventDefault();

        if(validate())
        {
           const onSuccess=()=> addToast("Data Saved successfully",{appearance:'success'})
            props.createCar(values,onSuccess)
            clearForm()
        }

   }
 

   useEffect(() => {
       if(props.currentId!=0)
       {
           setValues({
               ...props.CarRecordList.find(x=> x.id== props.currentId)
           })
       }
   }, [props.currentId])



    return (
    
        <form autoCapitalize="off" noValidate className={classes.root} onSubmit={handleSubmit}>
         <Grid container>
          <Grid item xs={3}>
          <TextField name="make"    {...(errors.make && {error:true, helperText:errors.make})} variant="outlined" values={values.make} onChange={hanldeInputChange} label="Maker"></TextField>
          </Grid>
          <Grid item xs={3}>
          <TextField name="model"   {...(errors.model && {error:true, helperText:errors.model})}  variant="outlined" values={values.model} onChange={hanldeInputChange} label="Model"></TextField>

          </Grid>
          <Grid item xs={3}>
          <TextField name="wheels"    {...(errors.wheels && {error:true, helperText:errors.wheels})}     variant="outlined" values={values.wheels} onChange={hanldeInputChange} label="wheels#"></TextField>
          </Grid>
          <Grid item xs={3}>
          <FormControl className={classes.formControl} {...(errors.engineType && {error:true})}      variant="outlined">
              <InputLabel ref={inputLabel}>Engine Type</InputLabel>
              <Select name="engineType" values={values.engineType}   labelWidth={labelWidth} onChange={hanldeInputChange}>
              <MenuItem value="">Select Engine type</MenuItem>
               <MenuItem value="1">Diesel</MenuItem>
               <MenuItem value="2">Patrol</MenuItem>
              </Select>
              {errors.engineType && <FormHelperText>{errors.engineType}</FormHelperText>}
          </FormControl>
          </Grid>
          <Grid item xs={3}>
          <TextField name="engineCapactity" variant="outlined" values={values.engineCapactity} onChange={hanldeInputChange} label="Capactity"></TextField>
          </Grid>
          <Grid item xs={6}>
          <TextField name="doors"   variant="outlined" {...(errors.doors && {error:true, helperText:errors.doors})}  values={values.doors} onChange={hanldeInputChange} label="Doors"></TextField>

          <FormControl className={classes.formControl}   {...(errors.carType && {error:true})}    variant="outlined">
              <InputLabel ref={inputLabel}>Car Type</InputLabel>
              <Select name="carType" values={values.carType}  labelWidth={labelWidth}  onChange={hanldeInputChange}>
                <MenuItem value="">Select Car type</MenuItem>
               <MenuItem value="1">Hatchback</MenuItem>
               <MenuItem value="2">Sedan</MenuItem>
              </Select>
             {errors.carType && <FormHelperText>{errors.carType}</FormHelperText>}
             </FormControl>
          <div>
              <Button variant="contained" type="submit" className={classes.smMargin} color="primary">Add Car</Button>
              <Button variant="contained"  onClick={clearForm} className={classes.smMargin} >Clear Form</Button>
          </div>
          </Grid>
         </Grid>

        </form>
    
        );
}


const mapStateToProps= state=>({
    CarRecordList:state.Car.list
})

const mapActionToProps={
createCar: actions.create,
updateCar: actions.update
}



export default connect(mapStateToProps,mapActionToProps) (withStyles(styles) (CarForm));