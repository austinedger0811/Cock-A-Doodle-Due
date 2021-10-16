import React from 'react'
import { LineChart, Line, ReferenceLine, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts'

const ProgressChart = ({ data, currentDays, progress, totalDays }) => {

   return (
    <ResponsiveContainer width="100%" height={260}>
      <LineChart data={data}>
        <XAxis dataKey="days" type="number" domain={[0, totalDays]} />
        <YAxis dataKey="progress" type="number" domain={[0, 100]} hide={true} />
        <Tooltip />
        <ReferenceLine stroke="black" x={currentDays} />
        <ReferenceLine stroke="gray" strokeDasharray="4" segment={[{ x: data[data.length - 1]["days"], y: progress }, { x: currentDays, y: progress}]} />
        <ReferenceLine stroke="gray" strokeDasharray="4 10" segment={[{ x: 0, y: 0 }, { x: totalDays, y: 100 }]} allowDataOverflow={true}/>
        <Line type="monotone" dataKey="progress" stroke="#8884d8" strokeWidth={2} activeDot={{ r: 8 }} />
        <CartesianGrid strokeDasharray="3 3" />
      </LineChart> 
    </ResponsiveContainer>
  )
}

export default ProgressChart 
