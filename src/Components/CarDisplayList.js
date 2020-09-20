import { ButtonGroup, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, withStyles, formatMs, Button } from "@material-ui/core";
import React,{useState, useEffect} from "react";
import {connect} from "react-redux";
import * as actions from "../actions/vehicle"
import CarForm from "./CarForm";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useToasts} from "react-toast-notifications"



const styles= theme =>({
  root:{
    "& .MuiTableCell-head": {
      fontSize: "1.25rem"
    }
  },
  paper: {
    margin: theme.spacing(2),
    padding: theme.spacing(2)
  }
})



const CarDataList =({classes,...props})=>{

  const [currentId, setCurrentId] = useState(0)

  useEffect(()=>{

    props.getAllCars()

  },[])

  const { addToast }=useToasts()

  const onDelete=id=>{
    if(window.confirm('Are you sure want to delete record?'))
    {
        props.deleteCarRecord(id,()=> addToast("Data deleted successfully",{appearance:'info'}))
    }
  }

    return (<Paper className={classes.paper} elevation={3}>
      <Grid container>  
             <Grid item xs={6}>
              <CarForm {...({currentId,setCurrentId})}></CarForm>
             </Grid>
             <Grid item xs={6}>
               <TableContainer>
                 <Table>
                   <TableHead className={classes.root}>
                   <TableRow>
                     <TableCell>Make</TableCell>
                     <TableCell>Model</TableCell>
                     <TableCell>Wheels</TableCell>
                     <TableCell>Engine Type</TableCell>
                     <TableCell>Engine Capacity</TableCell>
                     <TableCell>Vehicle Type</TableCell>
                     <TableCell>Doors</TableCell>
                     <TableCell>Car Type</TableCell>
                     <TableCell></TableCell>

                   </TableRow>
                   </TableHead>
                   <TableBody>
                     {

                       props.CarRecordList.map((record,index)=>{
                          return (<TableRow  key={index} hover>                            
                          <TableCell>{record.make}</TableCell>
                          <TableCell>{record.model}</TableCell>
                          <TableCell>{record.wheels}</TableCell>
                          <TableCell>{record.engineType}</TableCell>
                          <TableCell>{record.engineCapactity}</TableCell>
                          <TableCell>{record.vehicleType}</TableCell>
                          <TableCell>{record.doors}</TableCell>
                          <TableCell>{record.carType}</TableCell>
                          <TableCell>
                            <ButtonGroup variant="text" >
                               {/* <Button><EditIcon onClick={()=>{setCurrentId(record.id)}} color="primary"></EditIcon></Button> */}
                               <Button><DeleteIcon onClick={()=>onDelete(record.id)} color="secondary"></DeleteIcon></Button>

                            </ButtonGroup>
                          </TableCell>
                          </TableRow>)

                       })
                     }
                   </TableBody>
                 </Table>
               </TableContainer>
             </Grid>
  
      </Grid> 
    </Paper>);
}

const mapStateToProps= state=>({
        CarRecordList:state.Car.list
})

const mapActionToProps={
    getAllCars: actions.getAll,
    deleteCarRecord: actions.Delete
}


 

export default connect(mapStateToProps,mapActionToProps) (withStyles(styles)(CarDataList));