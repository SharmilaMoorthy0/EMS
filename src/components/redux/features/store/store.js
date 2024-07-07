import { configureStore } from "@reduxjs/toolkit";
import  TotalSlice  from "../Counter";


 export const store=configureStore({
    reducer:{
       EmployeData:TotalSlice
    }
 })