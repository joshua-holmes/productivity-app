import { AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

function RetAreaChart({ data }) {

    return (
        <AreaChart style={{margin: "auto"}} width={600} height={300} data={data}>
            <Area type="monotone" dataKey="dollars" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="years" />
            <YAxis />
            <Tooltip />
        </AreaChart>
    )
}

export default RetAreaChart;
