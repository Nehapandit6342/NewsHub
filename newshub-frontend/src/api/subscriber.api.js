import axios from "axios";


const API="http://localhost:5000/api/subscribers";


export const subscribeUser = async(email)=>{

const response =
await axios.post(API,{
email
});


return response.data;

};