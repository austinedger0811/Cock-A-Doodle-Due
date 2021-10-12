import React from 'react'
import { LineChart, Line, XAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts'


const Graph = () => {

  const data = [{progress: 0, expected: 0, date: 0,},
                {progress: 10, expected: 25, date: 1},
                {progress: 60, expected: 50, date: 2},
                {progress: 80, expected: 75, date: 3},
                {expected: 100, date: 4}]

  return (
    <ResponsiveContainer width="100%" height={260}>
      <LineChart data={data} >
        <Line typle="monotone" dataKey="expected" stroke="#dddddd" strokeWidth={1} dot={false} />
        <Line typle="monotone" dataKey="progress" stroke="#8884d8" strokeWidth={2} activeDot={{ r: 8 }} />
        <XAxis dataKey="date" />
        <Tooltip />
        <Legend />
      </LineChart> 
    </ResponsiveContainer>
  )
}

export default Graph
