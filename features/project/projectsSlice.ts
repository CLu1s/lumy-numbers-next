import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { ProjectsState, LoadingStates, Project } from "../../types";

const proyectos: Project[] = [
  {
    id: "1",
    name: "Viaje a Japon",
    description:
      "Esse quasi tempora est minima voluptas blanditiis. Et at et dolor vel. Voluptatibus dolores id id officia iure. Omnis in quia nostrum ipsum. Eius modi qui eligendi beatae. Rerum exercitationem nisi occaecati sapiente minima fuga fugit voluptatem consequatur.",
    date: new Date("2022-03-12").toISOString(),
    dueDate: new Date("2023-05-01").toISOString(),
    amountGoal: 150000,
    status: "in-progress",
    movements: [
      {
        id: "1",
        date: "2020-01-01",
        description: "Gasto de mantenimiento",
        amount: 100,
        projectID: "a;klsjhd",
      },
      {
        id: "1",
        date: "2020-01-01",
        description: "Gasto de mantenimiento",
        amount: 100,
        projectID: "a;klsjhd",
      },
      {
        id: "1",
        date: "2020-01-01",
        description: "Gasto de mantenimiento",
        amount: 100,
        projectID: "a;klsjhd",
      },
      {
        id: "3",
        date: "2020-01-01",
        description: "Gasto de mantenimiento",
        amount: 1000,
        projectID: "a;klsjhd",
      },
      {
        id: "3",
        date: "2020-01-01",
        description: "Gasto de mantenimiento",
        amount: 1000,
        projectID: "a;klsjhd",
      },
    ],
  },
  {
    id: "2",
    name: "est dignissimos facere",
    description:
      "Aliquam quod dolore aut optio et. Sapiente reiciendis eum tempora exercitationem minus dicta. Provident illum tempore itaque ut ex cupiditate hic. Eaque accusantium assumenda ut quos consequuntur ex perferendis expedita.",
    status: "in-progress",
    date: new Date("2022-03-12").toISOString(),
    dueDate: new Date("2023-05-01").toISOString(),
    amountGoal: 1000,
    movements: [
      {
        id: "1",
        date: "2020-01-01",
        description: "Gasto de mantenimiento",
        amount: 300,
        projectID: "a;klsjhd",
      },
    ],
  },
  {
    id: "3",
    name: "Proyecto 3",
    description:
      "Esse quasi tempora est minima voluptas blanditiis. Et at et dolor vel. Voluptatibus dolores id id officia iure. Omnis in quia nostrum ipsum. Eius modi qui eligendi beatae.",
    status: "in-progress",
    date: new Date("2022-03-12").toISOString(),
    dueDate: new Date("2023-05-01").toISOString(),

    amountGoal: 5000,

    movements: [
      {
        id: "1",
        date: "2020-01-01",
        description: "Gasto de mantenimiento",
        amount: 100,
        projectID: "a;klsjhd",
      },
      {
        id: "2",
        date: "2020-01-01",
        description: "Gasto de mantenimiento",
        amount: 100,
        projectID: "a;klsjhd",
      },
    ],
  },
];

const initialState: ProjectsState = {
  items: proyectos,
  status: LoadingStates.IDLE,
  error: null,
};

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    addProject(state, action) {
      const project = action.payload;
      state.items.push(project);
      toast.success("Proyecto creado!");
    },
  },
});

export const { addProject } = projectsSlice.actions;
export default projectsSlice.reducer;
