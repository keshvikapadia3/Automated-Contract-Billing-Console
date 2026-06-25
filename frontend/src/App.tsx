import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setContracts } from "./features/contracts/contractSlice";
import { setPoints } from "./features/points/pointSlice";
import AppRoutes from "./routes/AppRoutes";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch contracts
    fetch("http://127.0.0.1:8000/contracts")
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((c: any) => ({
          id: c.id,
          name: c.name,
          startDate: c.start_date,
          endDate: c.end_date,
        }));
        dispatch(setContracts(formatted));
      })
      .catch((err) => console.error(err));

    // Fetch points
    fetch("http://127.0.0.1:8000/points")
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((p: any) => ({
          id: p.id.toString(),
          contractId: p.contract_id,
          pointName: p.point_name,
          value: p.value,
        }));
        dispatch(setPoints(formatted));
      })
      .catch((err) => console.error(err));
  }, [dispatch]);

  return <AppRoutes />;
};

export default App;