import React from 'react'
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts'


const TimeChart = ({ estimatedTime, timeCompleted, timeRemaining }) => {

  const estimate = [
    {name: 'Estimated Time', time: estimatedTime}
  ]
  
  const remaining = [
    {name: 'Time Completed', time: timeCompleted},
    {name: 'Time Remaining', time: timeRemaining}
  ] 

  return (
    <ResponsiveContainer width={84} height={84}>
      <PieChart>
        <Pie data={remaining} dataKey="time" outerRadius={30} fill="#8884d8" />
        <Pie data={estimate} dataKey="time" innerRadius={32} outerRadius={42} fill="#82ca9d" />
      </PieChart>
    </ResponsiveContainer>
  )
}

export default TimeChart
