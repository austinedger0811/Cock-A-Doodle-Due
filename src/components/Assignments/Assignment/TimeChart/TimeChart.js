import React from 'react'
import { PieChart, Pie, Legend, ResponsiveContainer } from 'recharts'


const TimeChart = ({ estimatedTime, timeCompleted, timeRemaining }) => {

  const estimate = [
    {name: 'Estimated Time', time: estimatedTime}
  ]
  
  const remaining = [
    {name: 'Time Completed', time: timeCompleted},
    {name: 'Time Remaining', time: timeRemaining}
  ] 

  return (
    <ResponsiveContainer width={100} height={120}>
      <PieChart>
        <Pie data={estimate} dataKey="time" nameKey="name" innerRadius={35} outerRadius={50} fill="#82ca9d"  />
        <Pie data={remaining} dataKey="time" nameKey="name" outerRadius={30} fill="#8884d8"  />
      </PieChart>
    </ResponsiveContainer>
  )
}

export default TimeChart
