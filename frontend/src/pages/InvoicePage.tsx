import {
  Box, Card, CardContent, Paper, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import type { RootState } from "../app/store";

const InvoicePage = () => {
  const contracts = useSelector((state: RootState) => state.contracts.contracts);
  const points = useSelector((state: RootState) => state.points.points);

  const getTotalValue = (contractId: number) =>
    points
      .filter((p) => p.contractId === contractId)
      .reduce((sum, p) => sum + p.value, 0);

  const grandTotal = contracts.reduce(
    (sum, c) => sum + getTotalValue(c.id),
    0
  );

  return (
    <Box sx={{ p: 4, pt: 6 }}>

      {/* HEADER */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "#003A70" }}>
          Invoice Report
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          Total billing overview across all contracts
        </Typography>
      </Box>

      {/* CARDS */}
      <Box sx={{ display: "flex", gap: 3, mb: 4 }}>
        <Card sx={{ flex: 1, borderTop: "4px solid #003A70", borderRadius: 2 }}>
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              Total Contracts
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: "bold", color: "#003A70" }}>
              {contracts.length}
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ flex: 1, borderTop: "4px solid #0077b6", borderRadius: 2 }}>
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              Total Points
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: "bold", color: "#0077b6" }}>
              {points.length}
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ flex: 1, borderTop: "4px solid #00b4d8", borderRadius: 2 }}>
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              Grand Total Value
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: "bold", color: "#00b4d8" }}>
              {grandTotal}
            </Typography>
          </CardContent>
        </Card>
      </Box>

      {/* TABLE */}
      <Paper elevation={2} sx={{ borderRadius: 2, overflow: "hidden" }}>
        <TableContainer>
          <Table>

            <TableHead>
              <TableRow sx={{ backgroundColor: "#003A70" }}>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>#</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Contract Name
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Start Date
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  End Date
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Total Value
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {contracts.map((contract, index) => (
                <TableRow
                  key={contract.id}
                  sx={{ "&:hover": { backgroundColor: "#f0f4ff" } }}
                >
                  <TableCell>{index + 1}</TableCell>

                  <TableCell>
                    <Typography sx={{ fontWeight: "bold" }}>
                      {contract.name}
                    </Typography>
                  </TableCell>

                  {/* FIXED FIELD NAMES (important) */}
                  <TableCell>
                  {contract.startDate ? contract.startDate.split("-").reverse().join("-") : ""}
                  </TableCell>

                  <TableCell>
                  {contract.endDate ? contract.endDate.split("-").reverse().join("-") : ""}
                  </TableCell>
                  

                  <TableCell>
                    <Typography sx={{ fontWeight: "bold", color: "#003A70" }}>
                      {getTotalValue(contract.id)}
                    </Typography>
                  </TableCell>

                </TableRow>
              ))}
            </TableBody>

          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default InvoicePage;