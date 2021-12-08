import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { useState } from "react";

function IncomeExpensesPieChart({ budgetData, incomeOrExpenses, monthName }) {

    const [ isMouseHovering, setIsMouseHovering ] = useState(false);

    function getMonthlyBudgetData(budgetData, monthName, incomeOrExpenses) {
        const returnedArray = [];
        const categories = budgetData[monthName][incomeOrExpenses].categories;
        for ( let item in categories ) {
            returnedArray.push({
                category: item,
                amount: categories[item]
            })
        }
        return returnedArray;
    }
    function getPieLabel(data) {
        return isMouseHovering ? `${data.category} ${formatAsDollar(data.amount)}` : null
    }
    const formatAsDollar = Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format;
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']
    const dataIsLoaded = !!budgetData;
    const pieData = dataIsLoaded && getMonthlyBudgetData(budgetData, monthName, incomeOrExpenses);

    const renderChart = () => {
        return (
            <ResponsiveContainer width="100%">
                <PieChart
                    width={730}
                    height={250}

                >
                    <Pie
                        data={pieData}
                        dataKey="amount"
                        nameKey="category"
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        fill="#8884d8"
                        label={getPieLabel}
                        onMouseEnter={() => setIsMouseHovering(true)}
                        onMouseLeave={() => setIsMouseHovering(false)}
                        labelLine={isMouseHovering}
                        isAnimationActive={false}
                    >
                        {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        )
    }
    const chart = dataIsLoaded ? renderChart() : null
    return chart;
}

export default IncomeExpensesPieChart;
