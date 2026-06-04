import { createSlice } from "@reduxjs/toolkit";
import type {PayloadAction }from "@reduxjs/toolkit";
interface Contract {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
}

interface ContractState {
  contracts: Contract[];
}

const initialState: ContractState = {
  contracts: [
    { id: 1, name: "Netflix",   startDate: "2025-01-01", endDate: "2026-12-31" },
    { id: 2, name: "Amazon",    startDate: "2025-02-01", endDate: "2027-10-30" },
    { id: 3, name: "Microsoft", startDate: "2025-03-01", endDate: "2026-08-31" },
  ],
};

const contractSlice = createSlice({
  name: "contracts",
  initialState,
  reducers: {
    addContract(state, action: PayloadAction<Omit<Contract, "id">>) {
      const newId = state.contracts.length
        ? Math.max(...state.contracts.map((c) => c.id)) + 1
        : 1;
      state.contracts.push({ id: newId, ...action.payload });
    },
    updateContract(state, action: PayloadAction<Contract>) {
      const index = state.contracts.findIndex((c) => c.id === action.payload.id);
      if (index !== -1) state.contracts[index] = action.payload;
    },
    deleteContract(state, action: PayloadAction<number>) {
      state.contracts = state.contracts.filter((c) => c.id !== action.payload);
    },
  },
});

export const { addContract, updateContract, deleteContract } = contractSlice.actions;
export default contractSlice.reducer;