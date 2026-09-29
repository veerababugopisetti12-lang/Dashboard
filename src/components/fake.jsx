import React,{useState,useEffect} from 'react'
import {ResponsiveContainer,LineChart,Line,XAxis,YAxis,Legend,Tooltip} from 'recharts'



const Graph = () => {
    const [temp,setTemp] = useState([])
    useEffect(()=>{
        fetch("https://api.open-meteo.com/v1/forecast?latitude=28.61&longitude=77.21&current=temperature_2m,wind_speed_10m&hourly=temperature_2m")
        .then((response)=>response.json())
        .then((result)=>{ setTemp(result);
    console.log(result);
      })
      .catch((error) => {
        console.log("API Error:", error);
      });
    },[]);
  return (
    <>
    <div><h1>TEMPERATAURE VS TIME </h1></div>
    
    
  </>
  )
}

export default Graph