import React from 'react'
import { LineChart, CartesianGrid, Line, ReferenceLine, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

const Graph = ({ data, totalDays }) => {

   return (
    <ResponsiveContainer width="100%" height={260}>
      <LineChart data={data}>
        <CartesianGrid />
        <XAxis dataKey="days" type="number" domain={[0, totalDays]} />
        <YAxis dataKey="progress" type="number" domain={[0, 100]} hide={true} />
        <Tooltip />
        <ReferenceLine stroke="gray" strokeDasharray="3 3" segment={[{ x: 0, y: 0 }, { x: totalDays, y: 100 }]} allowDataOverflow={true}/>
        <Line type="monotone" dataKey="progress" stroke="#8884d8" strokeWidth={2} activeDot={{ r: 8 }} />
      </LineChart> 
    </ResponsiveContainer>
  )
}

export default Graph
