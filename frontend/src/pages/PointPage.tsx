import { useState } from "react";

import {
  Box, Button, Chip, Divider, FormControl, InputLabel,
  MenuItem, Paper, Select, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, TextField, Typography, IconButton,
} from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../app/store";

import {
  
  setPoints,
  deletePoint,
} from "../features/points/pointSlice";

interface Contract {
  id: number;
  name: string;
}

interface Point {
  id: string;
  contractId: number;
  pointName: string;
  value: number;
}

const PointPage = () => {
  const dispatch = useDispatch();

  const contracts = useSelector((state: RootState) => state.contracts.contracts);
  const points = useSelector((state: RootState) => state.points.points as Point[]);

  const [contractId, setContractId] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [pointName, setPointName] = useState("");
  const [value, setValue] = useState(0);
  const [editingPoint, setEditingPoint] = useState<Point | null>(null);

  // 🔥 SINGLE SOURCE OF TRUTH: DB
  const fetchPoints = async () => {
    const res = await fetch("http://127.0.0.1:8000/points");
    const data = await res.json();

    const formatted = data.map((p: any) => ({
      id: p.id.toString(),
      contractId: p.contract_id,
      pointName: p.point_name,
      value: p.value,
    }));

    dispatch(setPoints(formatted));
  };

  const resetForm = () => {
    setPointName("");
    setValue(0);
    setShowForm(false);
    setEditingPoint(null);
  };

  const handleSave = async () => {
  if (!pointName || value <= 0) {
    alert("Please enter valid data");
    return;
  }

  try {
    if (editingPoint) {
      // UPDATE
      await fetch(`http://127.0.0.1:8000/points/${editingPoint.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contract_id: contractId,
          point_name: pointName,
          value
        }),
      });

      // ❌ REMOVE THIS — causes stale intermediate state
      // dispatch(updatePoint({ ... }));

    } else {
      // CREATE
      await fetch("http://127.0.0.1:8000/points", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contract_id: contractId,
          point_name: pointName,
          value
        }),
      });

      // ❌ REMOVE THIS TOO — same reason
      // dispatch(addPoint({ ... }));
    }

    // ✅ Single source of truth — this updates Redux from DB
    await fetchPoints();
    resetForm();

  } catch (error) {
    console.error(error);
    alert("Operation failed");
  }
};
  const handleDeletePoint = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this point?")) return;

    try {
      await fetch(`http://127.0.0.1:8000/points/${id}`, {
        method: "DELETE",
      });

      dispatch(deletePoint(id));

      // 🔥 SYNC AGAIN AFTER DELETE
      await fetchPoints();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditPoint = (point: Point) => {
    setEditingPoint(point);
    setPointName(point.pointName);
    setValue(point.value);
    setContractId(point.contractId);
    setShowForm(true);
  };

  const filteredPoints = points.filter((p) => p.contractId === contractId);
  const selectedContract = contracts.find((c: Contract) => c.id === contractId);

  return (
    <Box sx={{ p: 4, mt: 3 }}>

      {/* ===== UI EXACT SAME ===== */}

      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "#003A70" }}>
          Billing Points
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          Define point values for each contract
        </Typography>
      </Box>

      <Paper elevation={2} sx={{ p: 3, borderRadius: 2, mb: 4 }}>
        <Typography variant="h6" sx={{ color: "#003A70", fontWeight: "bold", mb: 2 }}>
          Select Contract
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap" }}>
          <FormControl sx={{ minWidth: 250 }}>
            <InputLabel>Select Contract</InputLabel>
            <Select
              value={contractId}
              label="Select Contract"
              onChange={(e) => {
                setContractId(Number(e.target.value));
                resetForm();
              }}
            >
              {contracts.map((contract: Contract) => (
                <MenuItem key={contract.id} value={contract.id}>
                  {contract.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            variant="contained"
            size="large"
            onClick={() => {
              if (showForm && !editingPoint) {
                resetForm();
              } else {
                setEditingPoint(null);
                setPointName("");
                setValue(0);
                setShowForm(true);
              }
            }}
            sx={{
              backgroundColor: "#003A70",
              borderRadius: 2,
              fontWeight: "bold",
              "&:hover": { backgroundColor: "#002a54" },
            }}
          >
            {showForm && !editingPoint ? "Cancel" : "+ Add Point"}
          </Button>
        </Box>

        {showForm && (
          <>
            <Divider sx={{ my: 3 }} />
            <Typography variant="h6" sx={{ color: "#003A70", fontWeight: "bold", mb: 2 }}>
              {editingPoint ? "Edit Point" : `Add Point to "${selectedContract?.name}"`}
            </Typography>

            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", alignItems: "flex-end" }}>
              <TextField
                label="Point Name"
                value={pointName}
                onChange={(e) => setPointName(e.target.value)}
                sx={{ flex: 2, minWidth: "200px" }}
              />

              <TextField
                label="Value"
                type="number"
                value={value}
                onChange={(e) => setValue(Number(e.target.value))}
                sx={{ width: "150px" }}
              />

              <Button
                variant="contained"
                size="large"
                onClick={handleSave}
                sx={{
                  height: "56px",
                  px: 4,
                  backgroundColor: "#2e7d32",
                  borderRadius: 2,
                  fontWeight: "bold",
                }}
              >
                {editingPoint ? "Update Point" : "Save Point"}
              </Button>

              <Button variant="outlined" size="large" onClick={resetForm}>
                Cancel
              </Button>
            </Box>
          </>
        )}
      </Paper>

      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: "bold", color: "#003A70" }}>
          Points for "{selectedContract?.name}"
        </Typography>

        <Chip
          label={`${filteredPoints.length} Points`}
          sx={{ backgroundColor: "#003A70", color: "white", fontWeight: "bold" }}
        />
      </Box>

      <Divider sx={{ mb: 3 }} />

      <Paper elevation={2}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#003A70" }}>
                <TableCell sx={{ color: "white" }}>#</TableCell>
                <TableCell sx={{ color: "white" }}>Point Name</TableCell>
                <TableCell sx={{ color: "white" }}>Billing Value</TableCell>
                <TableCell sx={{ color: "white" }}>Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredPoints.map((point, index) => (
                <TableRow key={point.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{point.pointName}</TableCell>
                  <TableCell>{point.value}</TableCell>
                  <TableCell>
  <Tooltip title="Edit Point">
    <IconButton
      size="small"
      onClick={() => handleEditPoint(point)}
      sx={{ color: "#003A70", mr: 0.5 }}
    >
      <EditIcon fontSize="small" />
    </IconButton>
  </Tooltip>

  <span
    style={{
      color: "#ccc",
      fontWeight: 300,
      fontSize: "18px",
      verticalAlign: "middle",
    }}
  >
    |
  </span>

  <Tooltip title="Delete Point">
    <IconButton
      size="small"
      onClick={() => handleDeletePoint(point.id)}
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
    </Box>
  );
};

export default PointPage;