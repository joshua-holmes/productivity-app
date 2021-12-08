import TableCell from "@mui/material/TableCell";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import TableRow from "@mui/material/TableRow";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";

function BudgetList({ incomeOrExpenses, handleRemove, budgetData, monthName }) {
    function createCategoryArray(incomeOrExpenses) {
        const returnedArray = [];
        const categories = budgetData && budgetData[monthName][incomeOrExpenses].categories
        for ( let item in categories ) {
            returnedArray.push({ name: item, amount: categories[item] })
        }
        return returnedArray
    }
    return (
        createCategoryArray(incomeOrExpenses).map((inc) => {
            // an array of our income list items
            return (
                <TableContainer key={inc.name} sx={{ mb: 4, px: 1 }}>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell align="left" sx={{ width: "33%" }}>
                                    {inc.name}
                                </TableCell>
                                <TableCell align="center" sx={{ width: "33%" }}>
                                    {inc.amount}
                                </TableCell>
                                <TableCell align="right" sx={{ width: "33%" }}>
                                    <IconButton onClick={() => handleRemove(inc.name, parseFloat(inc.amount), incomeOrExpenses)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            );
        })
    )
}

export default BudgetList
