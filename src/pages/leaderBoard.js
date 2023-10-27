import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Nav from "./nav";
import axios from "axios";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";

const columns = [
    { id: "Rank", label: "Rank", minWidth: 100 },
    { id: "Name", label: "Name", minWidth: 170 },
    {
        id: "Points",
        label: "Points",
        minWidth: 170,
        align: "right",
    },
];

export default function StickyHeadTable() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [data, setData] = React.useState([]);

    const fetchData = async () => {
        try {
            const config = {
                withCredentials: true,
            };

            const response = await axios.get("", config);

            if (response.data.success === false) {
                toast.error(response.data.message);
            } else {
                const result = response.data;

                if (Array.isArray(result)) {
                    const sortedData = result.sort((a, b) => b.Points - a.Points);
                    const dataWithRanks = sortedData.map((item, index) => ({
                        Rank: index + 1,
                        Name: item.Name,
                        Points: item.Points,
                    }));

                    setData(dataWithRanks);
                } else {
                    toast.error("Data format is incorrect");
                }
            }
        } catch (error) {
            toast.error("Error fetching data");
        }
    };

    React.useEffect(() => {
        fetchData();
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <>
            <Nav className="styles.navText"></Nav>
            <ToastContainer autoClose={2000} />
            <div className="app-background" />
            <Paper
                sx={{
                    width: "80%",
                    overflow: "hidden",
                    backgroundColor: "transparent",
                    margin: "auto",
                    marginTop: 20,
                    border: "2px solid grey",
                }}
            >
                <TableContainer sx={{ maxHeight: 500 }}>
                    <Table stickyHeader aria-label="sticky table" sx={{ borderRadius: 10 }}>
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{
                                            minWidth: column.minWidth,
                                            color: "gold",
                                            backgroundColor: "transparent",
                                        }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.Name}>
                                        {columns.map((column) => (
                                            <TableCell
                                                key={column.id}
                                                align={column.align}
                                                sx={{ color: "gold" }}
                                            >
                                                {row[column.id]}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    sx={{ color: "gold" }}
                />
            </Paper>
        </>
    );
}
