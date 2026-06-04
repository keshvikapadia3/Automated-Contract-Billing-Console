import { useState } from "react";
import {
  Box, Button, Card, CardContent, Chip, Dialog, DialogActions,
  DialogContent, DialogTitle, IconButton, Paper, Table,
  TableBody, TableCell, TableContainer, TableHead, TableRow,
  TextField, Tooltip, Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../app/store";
import { addContract, updateContract, deleteContract } from "../features/contracts/contractSlice";

interface Contract {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
}

// ── helpers ──────────────────────────────────────────────────────────────────
const getDaysUntilExpiry = (endDate: string): number => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const end = new Date(endDate);
  return Math.ceil((end.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
};

const isExpiringSoon = (endDate: string): boolean => {
  const days = getDaysUntilExpiry(endDate);
  return days > 0 && days <= 30;
};

const isExpired = (endDate: string): boolean => getDaysUntilExpiry(endDate) <= 0;
const getStatusChip = (endDate: string) => {
  if (!endDate) return null;
  if (isExpired(endDate)) {
    return <Chip label="Expired" size="small" sx={{ bgcolor: "#fde8e8", color: "#d32f2f", fontWeight: "bold", fontSize: "0.7rem" }} />;
  }
  if (isExpiringSoon(endDate)) {
    const days = getDaysUntilExpiry(endDate);
    return (
      <Chip
        icon={<WarningAmberIcon sx={{ fontSize: "14px !important" }} />}
        label={`Expires in ${days}d`}
        size="small"
        sx={{ bgcolor: "#fff3e0", color: "#e65100", fontWeight: "bold", fontSize: "0.7rem" }}
      />
    );
  }
  return <Chip label="Active" size="small" sx={{ bgcolor: "#e8f5e9", color: "#2e7d32", fontWeight: "bold", fontSize: "0.7rem" }} />;
};
// ─────────────────────────────────────────────────────────────────────────────

const ContractPage = () => {
  const dispatch = useDispatch();
  const contracts = useSelector((state: RootState) => state.contracts.contracts);

  const [openDialog, setOpenDialog] = useState(false);
  const [editingContract, setEditingContract] = useState<Contract | null>(null);
  const [formName, setFormName] = useState("");
  const [formStart, setFormStart] = useState("");
  const [formEnd, setFormEnd] = useState("");
  const [formError, setFormError] = useState("");

  // derived counts
  const expiringSoonCount = contracts.filter(c => isExpiringSoon(c.endDate)).length;
  const activeCount = contracts.filter(c => c.endDate && !isExpired(c.endDate)).length;

  const handleOpenAdd = () => {
    setEditingContract(null);
    setFormName(""); setFormStart(""); setFormEnd(""); setFormError("");
    setOpenDialog(true);
  };

  const handleOpenEdit = (contract: Contract) => {
    setEditingContract(contract);
    setFormName(contract.name);
    setFormStart(contract.startDate);
    setFormEnd(contract.endDate);
    setFormError("");
    setOpenDialog(true);
  };

  const handleSave = () => {
    if (!formName.trim()) { setFormError("Contract name is required"); return; }
    if (editingContract) {
      dispatch(updateContract({ ...editingContract, name: formName, startDate: formStart, endDate: formEnd }));
    } else {
      dispatch(addContract({ name: formName, startDate: formStart, endDate: formEnd }));
    }
    setOpenDialog(false);
  };

  return (
    <Box sx={{ p: 4, pt: 6 }}>
      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: "bold", color: "#003A70" }}>Contracts</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>Complete record of all contracts</Typography>
        </Box>
        <Button
          variant="contained"
          onClick={handleOpenAdd}
          sx={{ backgroundColor: "#003A70", borderRadius: 2, fontWeight: "bold", "&:hover": { backgroundColor: "#002a54" } }}
        >
          + Add Contract
        </Button>
      </Box>

      {/* Summary Cards */}
      <Box sx={{ display: "flex", gap: 3, mb: 4 }}>
        <Card sx={{ flex: 1, borderTop: "4px solid #003A70", borderRadius: 2 }}>
          <CardContent>
            <Typography variant="body2" color="text.secondary">Total Contracts</Typography>
            <Typography variant="h4" sx={{ fontWeight: "bold", color: "#003A70" }}>{contracts.length}</Typography>
          </CardContent>
        </Card>
        <Card sx={{ flex: 1, borderTop: "4px solid #2e7d32", borderRadius: 2 }}>
          <CardContent>
            <Typography variant="body2" color="text.secondary">Active</Typography>
            <Typography variant="h4" sx={{ fontWeight: "bold", color: "#2e7d32" }}>{activeCount}</Typography>
          </CardContent>
        </Card>
        <Card sx={{ flex: 1, borderTop: "4px solid #e65100", borderRadius: 2 }}>
          <CardContent>
            <Typography variant="body2" color="text.secondary">Expiring Soon</Typography>
            <Typography variant="h4" sx={{ fontWeight: "bold", color: "#e65100" }}>{expiringSoonCount}</Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Expiring Soon Banner */}
      {expiringSoonCount > 0 && (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, bgcolor: "#fff3e0", border: "1px solid #ffb74d", borderRadius: 2, px: 2.5, py: 1.5, mb: 3 }}>
          <WarningAmberIcon sx={{ color: "#e65100" }} />
          <Typography variant="body2" sx={{ color: "#e65100", fontWeight: "bold" }}>
            {expiringSoonCount} contract{expiringSoonCount > 1 ? "s are" : " is"} expiring within the next 30 days. Please review and take action.
          </Typography>
        </Box>
      )}

      {/* Table */}
      <Paper elevation={2} sx={{ borderRadius: 2, overflow: "hidden" }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#003A70" }}>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>#</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Contract Name</TableCell>++++++
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Start Date</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>End Date</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Status</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {contracts.map((contract, index) => {
                const expiring = isExpiringSoon(contract.endDate);
                const expired = isExpired(contract.endDate);
                return (
                  <TableRow
                    key={contract.id}
                    sx={{
                      "&:hover": { backgroundColor: "#f0f4ff" },
                      transition: "0.2s",
                      backgroundColor: expired ? "#fff8f8" : expiring ? "#fffbf2" : "inherit",
                    }}
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Typography sx={{ fontWeight: "bold" }}>{contract.name}</Typography>
                        {expiring && <WarningAmberIcon sx={{ fontSize: 16, color: "#e65100" }} />}
                      </Box>
                    </TableCell>
                    <TableCell>{contract.startDate}</TableCell>
                    <TableCell>
                      <Typography sx={{ color: expired ? "#d32f2f" : expiring ? "#e65100" : "inherit", fontWeight: (expiring || expired) ? "bold" : "normal" }}>
                        {contract.endDate}
                      </Typography>
                    </TableCell>
                    <TableCell>{getStatusChip(contract.endDate)}</TableCell>
                    <TableCell>
                      <Tooltip title="Edit Contract">
                        <IconButton size="small" onClick={() => handleOpenEdit(contract)} sx={{ color: "#003A70", mr: 0.5 }}>
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete Contract">
                        <IconButton size="small" onClick={() => { if (window.confirm(`Delete "${contract.name}"?`)) dispatch(deleteContract(contract.id)); }} sx={{ color: "#d32f2f" }}>
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Add / Edit Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: "bold", color: "#003A70" }}>
          {editingContract ? "Edit Contract" : "Add New Contract"}
        </DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, pt: "16px !important" }}>
          <TextField label="Contract Name" fullWidth value={formName} onChange={(e) => { setFormName(e.target.value); setFormError(""); }} error={!!formError} helperText={formError} />
          <TextField label="Start Date" type="date" fullWidth value={formStart} onChange={(e) => setFormStart(e.target.value)} slotProps={{ inputLabel: { shrink: true } }} />
          <TextField label="End Date" type="date" fullWidth value={formEnd} onChange={(e) => setFormEnd(e.target.value)} slotProps={{ inputLabel: { shrink: true } }} />
        </DialogContent>
        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSave} sx={{ backgroundColor: "#003A70", "&:hover": { backgroundColor: "#002a54" } }}>
            {editingContract ? "Update" : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ContractPage;