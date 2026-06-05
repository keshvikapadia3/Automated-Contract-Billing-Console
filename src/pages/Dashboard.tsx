import {
  Box, Card, CardContent, Chip, Paper, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Typography,
} from "@mui/material";
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

  const getStatus = (endDate: string) => {
    const end = new Date(endDate);
    if (end < today) return "Expired";
    if (end <= in30Days) return "Expiring Soon";
    return "Active";
  };

  const getStatusChip = (endDate: string) => {
    const status = getStatus(endDate);
    if (status === "Active") {
      return (
        <Chip
          label="Active"
          size="small"
          sx={{ backgroundColor: "#e0f7ea", color: "#1b5e20", fontWeight: "bold" }}
        />
      );
    }
    if (status === "Expiring Soon") {
      return (
        <Chip
          label="Expiring Soon"
          size="small"
          sx={{ backgroundColor: "#fff3e0", color: "#e65100", fontWeight: "bold" }}
        />
      );
    }
    return (
      <Chip
        label="Expired"
        size="small"
        sx={{ backgroundColor: "#fdecea", color: "#d32f2f", fontWeight: "bold" }}
      />
    );
  };

  const activeCount = contracts.filter((c) => getStatus(c.endDate) === "Active").length;
  const expiredCount = contracts.filter((c) => getStatus(c.endDate) === "Expired").length;

  return (
    <Box sx={{ p: 4, mt: 3 }}>

      {/* Page Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "#003A70" }}>
          Dashboard
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          Welcome to Automated Contract Billing Console
        </Typography>
      </Box>

      {/* Summary Cards */}
      <Box sx={{ display: "flex", gap: 3, mb: 4, flexWrap: "wrap" }}>
        <Card sx={{ flex: 1, minWidth: 180, borderTop: "4px solid #003A70", borderRadius: 2, backgroundColor: "#e8f0fe" }}>
          <CardContent>
            <Typography variant="body2" color="text.secondary">Total Contracts</Typography>
            <Typography variant="h4" sx={{ fontWeight: "bold", color: "#003A70" }}>
              {contracts.length}
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ flex: 1, minWidth: 180, borderTop: "4px solid #2e7d32", borderRadius: 2, backgroundColor: "#e0f7ea" }}>
          <CardContent>
            <Typography variant="body2" color="text.secondary">Active</Typography>
            <Typography variant="h4" sx={{ fontWeight: "bold", color: "#2e7d32" }}>
              {activeCount}
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ flex: 1, minWidth: 180, borderTop: "4px solid #d32f2f", borderRadius: 2, backgroundColor: "#fdecea" }}>
          <CardContent>
            <Typography variant="body2" color="text.secondary">Expired</Typography>
            <Typography variant="h4" sx={{ fontWeight: "bold", color: "#d32f2f" }}>
              {expiredCount}
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ flex: 1, minWidth: 180, borderTop: "4px solid #0077b6", borderRadius: 2, backgroundColor: "#e0f4ff" }}>
          <CardContent>
            <Typography variant="body2" color="text.secondary">Total Points</Typography>
            <Typography variant="h4" sx={{ fontWeight: "bold", color: "#0077b6" }}>
              {points.length}
            </Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Contract Overview Table */}
      {/* Expiring Soon Warning */}
{contracts
  .filter((c) => getStatus(c.endDate) === "Expiring Soon")
  .map((c) => {
    const daysLeft = Math.ceil(
      (new Date(c.endDate).getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );
    return (
      <Paper
        key={c.id}
        elevation={2}
        sx={{
          p: 2,
          mb: 2,
          borderRadius: 2,
          backgroundColor: "#fff3e0",
          border: "1px solid #e65100",
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Typography sx={{ color: "#e65100", fontWeight: "bold" }}>
          ⚠ Contract "{c.name}" is expiring in {daysLeft} day{daysLeft !== 1 ? "s" : ""} 
        </Typography>
      </Paper>
    );
  })}
      <Typography variant="h5" sx={{ fontWeight: "bold", color: "#003A70", mb: 2 }}>
        Contract Overview
      </Typography>
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
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {contracts.map((contract, index) => (
                <TableRow
                  key={contract.id}
                  sx={{ "&:hover": { backgroundColor: "#f0f4ff" }, transition: "0.2s" }}
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <Typography sx={{ fontWeight: "bold" }}>{contract.name}</Typography>
                  </TableCell>
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
                  <TableCell>{getStatusChip(contract.endDate)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default Dashboard;