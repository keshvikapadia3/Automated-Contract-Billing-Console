import { useState } from "react";
import {
  Button, Chip, Divider, FormControl, InputLabel,
  MenuItem, Paper, Select, TextField,
  Card, CardContent, IconButton, Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../app/store";
import { addPoint, updatePoint, deletePoint } from "../features/points/pointSlice";

interface Contract { id: number; name: string; }
interface Point { id: string; contractId: number; pointName: string; value: number; }

const PointPage = () => {
  const contracts = useSelector((state: RootState) => state.contracts.contracts);
  const points = useSelector((state: RootState) => state.points.points as Point[]);
  const dispatch = useDispatch();

  const [contractId, setContractId] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [pointName, setPointName] = useState("");
  const [value, setValue] = useState(0);
  const [editingPoint, setEditingPoint] = useState<Point | null>(null);

  const handleEditPoint = (point: Point) => {
    setEditingPoint(point); setPointName(point.pointName); setValue(point.value); setShowForm(true);
  };

  const handleDeletePoint = (id: string) => {
    if (window.confirm("Are you sure you want to delete this point?")) dispatch(deletePoint(id));
  };

  const handleSave = () => {
    if (!pointName || value <= 0) { alert("Please enter valid data"); return; }
    if (editingPoint) {
      dispatch(updatePoint({ ...editingPoint, pointName, value }));
    } else {
      dispatch(addPoint({ contractId, pointName, value }));
    }
    setPointName(""); setValue(0); setShowForm(false); setEditingPoint(null);
  };

  const handleCancelForm = () => {
    setShowForm(false); setEditingPoint(null); setPointName(""); setValue(0);
  };

  const filteredPoints = points.filter((p) => p.contractId === contractId);
  const selectedContract = contracts.find((c: Contract) => c.id === contractId);

  return (
    <div style={{ padding: "32px", paddingTop: "48px", backgroundColor: "#f5f5f5", minHeight: "100vh", fontFamily: "Roboto, sans-serif" }}>

      <div style={{ marginBottom: "32px" }}>
        <h2 style={{ color: "#003A70", margin: 0, fontWeight: "bold" }}>Billing Points</h2>
        <p style={{ color: "#888", marginTop: "4px" }}>Define point values for each contract</p>
      </div>

      <Paper elevation={2} style={{ padding: "24px", borderRadius: "12px", marginBottom: "32px" }}>
        <h3 style={{ color: "#003A70", margin: "0 0 16px 0" }}>Select Contract</h3>
        <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
          <FormControl style={{ minWidth: "250px" }}>
            <InputLabel>Select Contract</InputLabel>
            <Select value={contractId} label="Select Contract" onChange={(e) => { setContractId(Number(e.target.value)); handleCancelForm(); }}>
              {contracts.map((contract: Contract) => (
                <MenuItem key={contract.id} value={contract.id}>{contract.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            variant="contained" size="large"
            onClick={() => { if (showForm && !editingPoint) { handleCancelForm(); } else { setEditingPoint(null); setPointName(""); setValue(0); setShowForm(true); } }}
            style={{ backgroundColor: "#003A70", borderRadius: "8px", fontWeight: "bold", padding: "10px 32px" }}
          >
            {showForm && !editingPoint ? "Cancel" : "+ Add Point"}
          </Button>
        </div>

        {showForm && (
          <>
            <Divider style={{ margin: "24px 0" }} />
            <h3 style={{ color: "#003A70", margin: "0 0 16px 0" }}>
              {editingPoint ? "Edit Point" : `Add Point to "${selectedContract?.name}"`}
            </h3>
            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", alignItems: "flex-end" }}>
              <TextField label="Point Name" value={pointName} onChange={(e) => setPointName(e.target.value)} style={{ flex: 2, minWidth: "200px" }} />
              <TextField label="Value" type="number" value={value} onChange={(e) => setValue(Number(e.target.value))} style={{ width: "150px" }} />
              <Button variant="contained" size="large" onClick={handleSave} style={{ height: "56px", padding: "0 32px", backgroundColor: "#2e7d32", borderRadius: "8px", fontWeight: "bold" }}>
                {editingPoint ? "Update Point" : "Save Point"}
              </Button>
              <Button variant="outlined" size="large" onClick={handleCancelForm} style={{ height: "56px", padding: "0 24px", borderRadius: "8px" }}>Cancel</Button>
            </div>
          </>
        )}
      </Paper>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <h3 style={{ color: "#003A70", margin: 0 }}>Points for "{selectedContract?.name}"</h3>
        <Chip label={`${filteredPoints.length} Points`} style={{ backgroundColor: "#003A70", color: "white", fontWeight: "bold" }} />
      </div>
      <Divider style={{ marginBottom: "24px" }} />

      {filteredPoints.length === 0 ? (
        <Paper elevation={1} style={{ borderRadius: "12px", textAlign: "center", padding: "48px" }}>
          <h3 style={{ color: "#888", margin: 0 }}>No points added yet</h3>
          <p style={{ color: "#aaa", marginTop: "8px" }}>Click "+ Add Point" button above to get started</p>
        </Paper>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "24px", marginBottom: "32px" }}>
          {filteredPoints.map((point) => (
            <div key={point.id} style={{ width: "calc(33.33% - 16px)", minWidth: "250px" }}>
              <Card elevation={3} style={{ borderRadius: "12px", borderTop: "4px solid #003A70", transition: "transform 0.2s, box-shadow 0.2s" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(-6px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 24px rgba(0,0,0,0.15)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.boxShadow = ""; }}
              >
                <CardContent style={{ padding: "24px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                    <Chip label={`# ${filteredPoints.indexOf(point) + 1}`} size="small" style={{ backgroundColor: "#e8f4fd", color: "#003A70", fontWeight: "bold" }} />
                    <div>
                      <Tooltip title="Edit Point">
                        <IconButton size="small" onClick={() => handleEditPoint(point)} sx={{ color: "#003A70", mr: 0.5 }}><EditIcon fontSize="small" /></IconButton>
                      </Tooltip>
                      <Tooltip title="Delete Point">
                        <IconButton size="small" onClick={() => handleDeletePoint(point.id)} sx={{ color: "#d32f2f" }}><DeleteIcon fontSize="small" /></IconButton>
                      </Tooltip>
                    </div>
                  </div>
                  <h3 style={{ color: "#003A70", margin: "0 0 8px 0", fontWeight: "bold" }}>{point.pointName}</h3>
                  <Divider style={{ margin: "12px 0" }} />
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <p style={{ color: "#888", margin: 0 }}>Billing Value</p>
                    <h2 style={{ color: "#2e7d32", margin: 0 }}>{point.value}</h2>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PointPage;