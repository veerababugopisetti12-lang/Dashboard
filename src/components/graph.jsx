import React,{useState,useEffect} from 'react'
import {ResponsiveContainer,LineChart,Line,XAxis,YAxis,Legend,Tooltip} from 'recharts'



const Graph = () => {
    const [temp,setTemp] = useState([])
    useEffect(()=>{
        fetch("https://api.open-meteo.com/v1/forecast?latitude=28.61&longitude=77.21&current=temperature_2m,wind_speed_10m&hourly=temperature_2m")
        .then((response)=>response.json())
        .then((result)=>{ setTemp(result);
      })
      .catch((error) => {
        console.log("API Error:", error);
      });
    },[]);
    const chartData = temp.hourly?.time?.slice(0, 24).map((time, index) => ({
  time: time.slice(11, 16),
  temperature: temp.hourly.temperature_2m[index]
})) || [];
  return (
    <>
    <div className='title2'><h1>TEMPERATAURE VS TIME </h1>
    </div>
    <div className='grapht'>
    <ResponsiveContainer  width="100%" height={400}>
        <LineChart data = {chartData}
        margin={{top:20,right:20,left:0,bottom:5}}>
            <Line dataKey="time" />
            <Line dataKey="temperature" />
            <XAxis dataKey="time" interval={2} />
                <YAxis dataKey= "temperature" />
                <Tooltip />

            
        </LineChart>
    </ResponsiveContainer>
    </div>
    
  </>
  )
}

export default Graph