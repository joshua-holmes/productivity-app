import { ResponsiveContainer, AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

function RetAreaChart({ data }) {

    return (
        
            <ResponsiveContainer  width="85%" height={300}>
            <AreaChart data={data}>
                <Area type="monotone" dataKey="dollars" stroke="#6a1b9a"  fill="#6a1b9a" />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey="years" />
                <YAxis />
                <Tooltip />
            </AreaChart>
            </ResponsiveContainer>
        
    )
}

export default RetAreaChart;
