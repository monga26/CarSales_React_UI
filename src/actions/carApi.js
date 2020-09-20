import axios from "axios";

const baseurl="http://localhost:55217/api/"



export default {

cars(url=baseurl+'cars/'){

return {
getAll:()=> axios.get(url),
getById:id=> axios.get(url+id),
create: newRecord=>axios.post(
    url,
    newRecord
   // JSON.stringify(newRecord)
    ),
updtae: (id,updateRecord)=>axios.put(url+id,updateRecord),
delete:id=>axios.delete(url+id)
}
}

}


 