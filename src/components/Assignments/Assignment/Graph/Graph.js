import React from 'react'
import { LineChart, Line, ReferenceLine, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

const Graph = ({ data, currentDays, progress, totalDays }) => {

   return (
    <ResponsiveContainer width="100%" height={260}>
      <LineChart data={data}>
        <XAxis dataKey="days" type="number" domain={[0, totalDays]} />
        <YAxis dataKey="progress" type="number" domain={[0, 100]} hide={true} />
        <Tooltip />
        <ReferenceLine stroke="black" segment={[{ x: currentDays, y: 0 }, { x: currentDays, y: 100 }]} />
        <ReferenceLine stroke="gray" segment={[{ x: 0, y: progress }, { x: currentDays, y: progress}]} allowDataOverflow={true}/>
        {/* <ReferenceLine stroke="gray" strokeDasharray="3 10" segment={[{ x: 0, y: 10 }, { x: (totalDays - (.1 * totalDays)), y: 100 }]} allowDataOverflow={true}/> */}
        <ReferenceLine stroke="gray" strokeDasharray="3 10" segment={[{ x: 0, y: 0 }, { x: totalDays, y: 100 }]} allowDataOverflow={true}/>
        {/* <ReferenceLine stroke="gray" strokeDasharray="3 10" segment={[{ x: (totalDays -  (.9 * totalDays)), y: 0 }, { x: totalDays, y: 90 }]} allowDataOverflow={true}/> */}
        <Line type="monotone" dataKey="progress" stroke="#8884d8" strokeWidth={2} activeDot={{ r: 8 }} />
      </LineChart> 
    </ResponsiveContainer>
  )
}

export default Graph
