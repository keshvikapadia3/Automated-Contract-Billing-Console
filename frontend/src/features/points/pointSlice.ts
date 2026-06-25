import { createSlice} from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
export interface Point {
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
    setPoints(state, action: PayloadAction<Point[]>) {
      state.points = action.payload;
    },

    addPoint(state, action: PayloadAction<Omit<Point, "id">>) {
      const newPoint: Point = {
        ...action.payload,
        id: Date.now().toString(),
      };
      state.points.push(newPoint);
    },

    updatePoint(state, action: PayloadAction<Point>) {
      const index = state.points.findIndex(
        (p) => p.id === action.payload.id
      );
      if (index !== -1) {
        state.points[index] = action.payload;
      }
    },

    deletePoint(state, action: PayloadAction<string>) {
      state.points = state.points.filter(
        (p) => p.id !== action.payload
      );
    },
  },
});

  export const { setPoints, addPoint, updatePoint, deletePoint } =
  pointSlice.actions;

export default pointSlice.reducer;