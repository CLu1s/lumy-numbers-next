import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { ProjectsState, LoadingStates, Movement } from "../../types";

const initialState: ProjectsState = {
  items: [
    {
      id: "1",
      name: "Project 1",
      description: "Project 1 description",
      status: "active",
      amountGoal: 1000,
      movements: [],
      bucketID: "1",
      date: new Date().toISOString(),
      dueDate: new Date("2023-05-10").toISOString(),
    },
  ],
  status: LoadingStates.IDLE,
  error: null,
};

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    addProject(state, action) {
      const project = action.payload;
      state.items.push({
        ...project,
        id: `${Math.random()}`,
        amountGoal: Number(project.amountGoal),
        date: new Date().toISOString(),
        movements: [],
      });
      toast.success("Proyecto creado!");
    },
    addMovement(state, action: PayloadAction<Movement>) {
      console.log(action.payload);
      const movement = action.payload;
      const project = state.items.find((p) => p.id === movement.projectID);
      if (project) {
        project.movements.push({
          ...movement,
          id: `${Math.random()}`,
          date: new Date().toISOString(),
        });
        toast.success("Movimiento creado!");
      }
    },
  },
});

export const { addProject, addMovement } = projectsSlice.actions;
export default projectsSlice.reducer;
