import {
  Box, Card, CardContent,Paper, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Typography,
} from "@mui/material";
import {Chip} from "@mui/material";
import { useSelector } from "react-redux";
import type { RootState } from "../app/store";

const Dashboard = () => {
  const contracts = useSelector((state: RootState) => state.contracts.contracts);
  const points = useSelector((state: RootState) => state.points.points);

  const getTotalValue = (contractId: number) =>
    points.filter((p) => p.contractId === contractId).reduce((sum, p) => sum + p.value, 0);

  const today = new Date();
  const in30Days = new Date();
  in30Days.setDate(today.getDate() + 30);

  const expiringSoon = contracts.filter((c) => {
    const endDate = new Date(c.endDate);
    return endDate >= today && endDate <= in30Days;
  });

  const summaryCards = [
    { label: "Total Contracts", value: contracts.length, color: "#003A70", bg: "#e8f0fe" },
    { label: "Total Value Points", value: points.length, color: "#0077b6", bg: "#e0f4ff" },
  ];

  return (
    <Box sx={{ p: 4, pt: 6 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "#003A70" }}>Dashboard</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          Welcome to Automated Contract Billing Console
        </Typography>
      </Box>

      <Box sx={{ display: "flex", gap: 3, mb: 4, flexWrap: "wrap" }}>
        {summaryCards.map((card) => (
          <Card key={card.label} sx={{ flex: 1, minWidth: 200, borderTop: `4px solid ${card.color}`, borderRadius: 2, backgroundColor: card.bg }}>
            <CardContent>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Box>
                  <Typography variant="body2" color="text.secondary">{card.label}</Typography>
                  <Typography variant="h4" sx={{ fontWeight: "bold", color: card.color }}>{card.value}</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      {expiringSoon.length > 0 && (
        <Paper elevation={2} sx={{ p: 2, mb: 4, borderRadius: 2, backgroundColor: "#fff3e0", border: "1px solid #e65100" }}>
          <Typography sx={{ fontWeight: "bold", color: "#e65100", mb: 1 }}>⚠ Contracts Expiring Within 30 Days</Typography>
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            {expiringSoon.map((c) => (
              <Chip key={c.id} label={`${c.name} — expires ${c.endDate}`} sx={{ backgroundColor: "#ffe0b2", color: "#e65100", fontWeight: "bold" }} />
            ))}
          </Box>
        </Paper>
      )}

      <Box sx={{ mb: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: "bold", color: "#003A70", mb: 2 }}>Contract Overview</Typography>
        <Paper elevation={2} sx={{ borderRadius: 2, overflow: "hidden" }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#003A70" }}>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>#</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>Contract Name</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>Start Date</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>End Date</TableCell>
                  <TableCell sx={{ color: "white", fontWeight: "bold" }}>Total Value</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {contracts.map((contract, index) => (
                  <TableRow key={contract.id} sx={{ "&:hover": { backgroundColor: "#f0f4ff" }, transition: "0.2s" }}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell><Typography sx={{ fontWeight: "bold" }}>{contract.name}</Typography></TableCell>
                    <TableCell>{contract.startDate}</TableCell>
                    <TableCell>{contract.endDate}</TableCell>
                    <TableCell><Typography sx={{ fontWeight: "bold", color: "#003A70" }}>{getTotalValue(contract.id)}</Typography></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </Box>
  );
};

export default Dashboard;