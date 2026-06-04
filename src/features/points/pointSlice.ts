import { createSlice } from "@reduxjs/toolkit";
import type {PayloadAction }from "@reduxjs/toolkit";

interface Point {
  id: string;
  contractId: number;
  pointName: string;
  value: number;
}

interface PointState {
  points: Point[];
}

const initialState: PointState = {
  points: [],
};

const pointSlice = createSlice({
  name: "points",
  initialState,
  reducers: {
    addPoint(state, action: PayloadAction<Omit<Point, "id">>) {
      state.points.push({ id: Date.now().toString(), ...action.payload });
    },
    updatePoint(state, action: PayloadAction<Point>) {
      const index = state.points.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) state.points[index] = action.payload;
    },
    deletePoint(state, action: PayloadAction<string>) {
      state.points = state.points.filter((p) => p.id !== action.payload);
    },
    clearPoints(state) {
      state.points = [];
    },
  },
});

export const { addPoint, updatePoint, deletePoint, clearPoints } = pointSlice.actions;
export default pointSlice.reducer;