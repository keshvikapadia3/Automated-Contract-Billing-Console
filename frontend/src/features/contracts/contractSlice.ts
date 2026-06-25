import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
export interface Contract {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
}

interface ContractState {
  contracts: Contract[];
}

const initialState: ContractState = {
  contracts: [],
};

const contractSlice = createSlice({
  name: "contracts",
  initialState,
  reducers: {
    setContracts(state, action: PayloadAction<Contract[]>) {
      state.contracts = action.payload;
    },

    addContract(state, action: PayloadAction<Omit<Contract, "id">>) {
      const newContract: Contract = {
        id: Date.now(),
        ...action.payload,
      };
      state.contracts.push(newContract);
    },

    updateContract(state, action: PayloadAction<Contract>) {
      const index = state.contracts.findIndex(
        (c) => c.id === action.payload.id
      );
      if (index !== -1) {
        state.contracts[index] = action.payload;
      }
    },

    deleteContract(state, action: PayloadAction<number>) {
      state.contracts = state.contracts.filter(
        (c) => c.id !== action.payload
      );
    },
  },
});

export const {
  setContracts,
  addContract,
  updateContract,
  deleteContract,
} = contractSlice.actions;

export default contractSlice.reducer;