import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { API, graphqlOperation } from "aws-amplify";
import toast from "react-hot-toast";
import {
  updateBucket,
  createProject as createProjectMutation,
} from "../../src/graphql/mutations";
import { projectsByBucket } from "../../src/graphql/queries";
import { ProjectsState, LoadingStates, Movement } from "../../types";

const initialState: ProjectsState = {
  items: [],
  status: LoadingStates.IDLE,
  categoryID: null,
  error: null,
};
type addCategoryIDProps = {
  projectsCategoryID: string;
  id: string;
};

export const addCategoryID = createAsyncThunk(
  "projects/addCategoryID",
  async (input: addCategoryIDProps) => {
    const response = await API.graphql(
      graphqlOperation(updateBucket, { input })
    );
    return response;
  }
);

export const fetchProjects = createAsyncThunk(
  "projects/fetchProjects",
  async (bucketID: string) => {
    const response = await API.graphql(
      graphqlOperation(projectsByBucket, { bucketID })
    );
    return response;
  }
);

export const addProject = createAsyncThunk(
  "projects/addProject",
  async (data: any) => {
    const input = {
      ...data,
      status: "pending",
      startDate: new Date().toISOString(),
    };

    const response = await API.graphql(
      graphqlOperation(createProjectMutation, { input })
    );
    return response;
  }
);

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
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
  extraReducers: {
    [addCategoryID.fulfilled.type]: (state, action) => {
      toast.success("Guardado correctamente!");
      state.categoryID = action.payload.data.updateBucket.projectsCategoryID;
      state.status = LoadingStates.SUCCEEDED;
    },
    [addCategoryID.rejected.type]: (state, action) => {
      toast.error("Hubo un error!");
      state.error = action.payload;
      state.status = LoadingStates.FAILED;
    },
    [addCategoryID.pending.type]: (state) => {
      state.status = LoadingStates.LOADING;
    },
    [addProject.fulfilled.type]: (state, action) => {
      toast.success("Guardado correctamente!");
      state.items.push(action.payload.data.createProject);
      state.status = LoadingStates.SUCCEEDED;
    },
    [addProject.rejected.type]: (state, action) => {
      toast.error("Hubo un error!");
      state.error = action.payload;
      state.status = LoadingStates.FAILED;
    },
    [addProject.pending.type]: (state) => {
      state.status = LoadingStates.LOADING;
    },
    [fetchProjects.fulfilled.type]: (state, action) => {
      state.items = action.payload.data.ProjectsByBucket.items;
      state.status = LoadingStates.SUCCEEDED;
    },
    [fetchProjects.rejected.type]: (state, action) => {
      state.error = action.payload;
      state.status = LoadingStates.FAILED;
    },
    [fetchProjects.pending.type]: (state) => {
      state.status = LoadingStates.LOADING;
    },
  },
});

export const { addMovement } = projectsSlice.actions;
export default projectsSlice.reducer;
