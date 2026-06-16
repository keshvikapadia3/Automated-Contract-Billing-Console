import { useState } from "react";
import {
  Box, Button, Card, CardContent, Chip, Dialog, DialogActions,
  DialogContent, DialogTitle, IconButton, Paper, Table,
  TableBody, TableCell, TableContainer, TableHead, TableRow,
  TextField, Tooltip, Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../app/store";
import { addContract, updateContract, deleteContract } from "../features/contracts/contractSlice";

interface Contract {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
}

const ContractPage = () => {
  const dispatch = useDispatch();
  const contracts = useSelector((state: RootState) => state.contracts.contracts);

  const [openDialog, setOpenDialog] = useState(false);
  const [editingContract, setEditingContract] = useState<Contract | null>(null);
  const [formName, setFormName] = useState("");
  const [formStart, setFormStart] = useState("");
  const [formEnd, setFormEnd] = useState("");
  const [formError, setFormError] = useState("");

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

  const handleOpenAdd = () => {
    setEditingContract(null);
    setFormName("");
    setFormStart("");
    setFormEnd("");
    setFormError("");
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
    if (!formName.trim()) {
      setFormError("Contract name is required");
      return;
    }
    if (editingContract) {
      dispatch(updateContract({
        ...editingContract,
        name: formName,
        startDate: formStart,
        endDate: formEnd,
      }));
    } else {
      dispatch(addContract({ name: formName, startDate: formStart, endDate: formEnd }));
    }
    setOpenDialog(false);
  };

  const expiringSoonCount = contracts.filter((c) => getStatus(c.endDate) === "Expiring Soon").length;

  return (
    <Box sx={{ p: 4 ,mt: 3}}>
      {/* Page Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
  <Box>
    <Typography variant="h4" sx={{ fontWeight: "bold", color: "#003A70" }}>
      Contracts
    </Typography>
    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
      Complete record of all contracts
    </Typography>
  </Box>
  <Button
    variant="contained"
    onClick={handleOpenAdd}
    sx={{
      backgroundColor: "#003A70",
      borderRadius: 2,
      fontWeight: "bold",
      "&:hover": { backgroundColor: "#002a54" },
    }}
  >
    + Add Contract
  </Button>
</Box>
      {/* Summary Cards */}
      <Box sx={{ display: "flex", gap: 3, mb: 4 ,p:4, mt : 4}}>
        <Card sx={{ flex: 1, borderTop: "4px solid #003A70", borderRadius: 2 }}>
          <CardContent>
            <Typography variant="body2" color="text.secondary">Total Contracts</Typography>
            <Typography variant="h4" sx={{ fontWeight: "bold", color: "#003A70" }}>
              {contracts.length}
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ flex: 1, borderTop: "4px solid #2e7d32", borderRadius: 2 }}>
          <CardContent>
            <Typography variant="body2" color="text.secondary">Active</Typography>
            <Typography variant="h4" sx={{ fontWeight: "bold", color: "#2e7d32" }}>
              {contracts.filter((c) => getStatus(c.endDate) === "Active").length}
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ flex: 1, borderTop: "4px solid #e65100", borderRadius: 2 }}>
          <CardContent>
            <Typography variant="body2" color="text.secondary">Expiring Soon</Typography>
            <Typography variant="h4" sx={{ fontWeight: "bold", color: "#e65100" }}>
              {expiringSoonCount}
            </Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Table */}
      <Paper elevation={2} sx={{ borderRadius: 2, overflow: "hidden" }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#003A70" }}>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>#</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Contract Name</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Start Date</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>End Date</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Status</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Actions</TableCell>
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
                  <TableCell>{getStatusChip(contract.endDate)}</TableCell>
                  <TableCell>
                    <Tooltip title="Edit Contract">
                      <IconButton
                        size="small"
                        onClick={() => handleOpenEdit(contract)}
                        sx={{ color: "#003A70", mr: 0.5 }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <span style={{ color: "#ccc", fontWeight: 300, fontSize: "18px", verticalAlign: "middle" }}>|</span>
                    <Tooltip title="Delete Contract">
                      <IconButton
                        size="small"
                        onClick={() => {
                          if (window.confirm(`Delete "${contract.name}"?`)) {
                            dispatch(deleteContract(contract.id));
                          }
                        }}
                        sx={{ color: "#d32f2f", ml: 0.5 }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
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
          <TextField
            label="Contract Name"
            fullWidth
            value={formName}
            onChange={(e) => { setFormName(e.target.value); setFormError(""); }}
            error={!!formError}
            helperText={formError}
          />
          <TextField
            label="Start Date"
            type="date"
            fullWidth
            value={formStart}
            onChange={(e) => setFormStart(e.target.value)}
            slotProps={{ inputLabel: { shrink: true } }}
          />
          <TextField
            label="End Date"
            type="date"
            fullWidth
            value={formEnd}
            onChange={(e) => setFormEnd(e.target.value)}
            slotProps={{ inputLabel: { shrink: true } }}
          />
        </DialogContent>
        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleSave}
            sx={{ backgroundColor: "#003A70", "&:hover": { backgroundColor: "#002a54" } }}
          >
            {editingContract ? "Update" : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ContractPage;