import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const BasicForm = () =>{
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");

  const [allEntry,setAllEntry] = useState([]);
  const [sucess,setSucess] = useState(false);
  const [seconds,setSeconds] = useState(0);
  const [minutes,setMinutes] = useState(0);

  const [data,setData]= useState([]);
  const originalData = [{name:"LKR",exchangerate:0},{name:"PKR",exchangerate:0},{name:"NPR",exchangerate:0},{name:"INR",exchangerate:0},{name:"AUD",exchangerate:0}];

  const submitForm = (e) => {
    e.preventDefault();
    if(name && email){
        const newEntry = {id: new Date().getTime().toString(),name:name, email:email};
        setAllEntry([...allEntry,newEntry]);
        console.log(allEntry);
        setName("");
        setEmail("");
        setSucess(true);
    }
    else{
        alert("Plz fill the complete data")
    }
    
  }
 

  useEffect(()=>{
    if(sucess==true){
    axios.get("https://api.currencyfreaks.com/latest?apikey=281eda603ff54acbab4d174bb6a874e6").then((r)=>setData(r.data.rates)).catch((e)=>err.message);
    
   
    
}},[sucess]);

let timer;

  useEffect(()=>{

    if(sucess==true){
      timer = setTimeout(()=>{
      
        setSeconds(seconds+1);
        
        if(seconds===59){
          setMinutes(minutes+1);
          setSeconds(0);
        }
      },1000)
     
      return()=>clearInterval(timer)
    }
  })
  
  for(let i=0;i<5;i++){
      if(i==0){
        originalData[i].exchangerate=data.LKR
      }
      if(i=1){
      originalData[i].exchangerate=data.PKR
    }
      if(i=2){
        originalData[i].exchangerate=data.NPR
      
    }
      if(i=3){
      originalData[i].exchangerate=data.INR
      
    }
      if(i=4){
      originalData[i].exchangerate=data.AUD
    
    }
  }

 console.log("orginialData",originalData)

  return (
    <div className="App">
     {sucess ?(
         <div>
          <div>
          {
             allEntry.map((currElem)=> {
                  return(
                     <div key={currElem.id}>
                         <p style={{color:"black"}}>{currElem.name}</p>
                     </div>
                  )
             })
         }
         <h1 style={{color:"black"}}>Last Fetched: {minutes<10? "0"+minutes: minutes}:{seconds<10?"0"+seconds:seconds}</h1>
         <h3 style={{color:"black"}}>Base:USD</h3>
          </div>
        
        <BarChart
          width={500}
          height={300}
          data={originalData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          barSize={20}
        >
          <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="exchangerate" fill="#8884d8" background={{ fill: '#eee' }} />
        </BarChart>
         
       </div>

     ):(
     <section>
     <form action="" onSubmit={submitForm}>
     <div>
       <label htmlFor="name">Name</label>
         <input type="text" name='name' id='name' autoComplete='off'
            value={name}
            required
            onChange={(e)=> setName(e.target.value)}
         />
     </div>
     <div>
        <label htmlFor="email">Email</label>
         <input type="email" name='email' id='email' autoComplete='off' 
            value={email}
            required
            onChange={(e)=> setEmail(e.target.value)}
         />
     </div>
     <button type="submit">Submit</button>
   </form>
   </section>
   )}
      
    </div>
  )
}

export default BasicForm;