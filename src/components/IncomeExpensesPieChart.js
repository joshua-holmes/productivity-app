import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

function IncomeExpensesPieChart({ budgetData, incomeOrExpenses, monthName }) {

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
        return `${data.category} ${formatAsDollar(data.amount)}`
    }
    const formatAsDollar = Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format;
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']
    const dataIsLoaded = !!budgetData;
    const pieData = dataIsLoaded && getMonthlyBudgetData(budgetData, monthName, incomeOrExpenses);
    // const fakeData = [
    //     {category: "cool thing", amount: 500},
    //     {category: "stuff", amount: 800},
    //     {category: "more stuff", amount: 300},
    //     {category: "hey there", amount: 600},
    //     {category: "lots of stuff", amount: 200},
    // ]
    const renderChart = () => {
        return (
            <ResponsiveContainer>
                <PieChart>
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
