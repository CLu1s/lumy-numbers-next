import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { API, graphqlOperation } from "aws-amplify";
import toast from "react-hot-toast";
import {
  updateBucket,
  createProject as createProjectMutation,
  createMovement as createMovementMutation,
} from "../../src/graphql/mutations";
import {
  projectsByBucket,
  movementsByProject,
} from "../../src/graphql/queries";
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

export const addMovement = createAsyncThunk(
  "projects/addMovement",
  async (data: any) => {
    const input = {
      ...data,
      date: new Date().toISOString(),
    };
    const response = await API.graphql(
      graphqlOperation(createMovementMutation, { input })
    );
    return response;
  }
);

export const fetchMovementsByProject = createAsyncThunk(
  "projects/fetchMovementsByProject",
  async (projectID: string) => {
    const response = await API.graphql(
      graphqlOperation(movementsByProject, { projectID })
    );
    return {response, projectID};
  }
);

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {},
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
    [addMovement.fulfilled.type]: (state, action) => {
      toast.success("Movimiento Guardado!");
      const movement = action.payload.data.createMovement;
      const project = state.items.find((p) => p.id === movement.projectID);
      if (project) {
        project.movements.push(movement);
      }
      state.status = LoadingStates.SUCCEEDED;
    },
    [addMovement.rejected.type]: (state, action) => {
      toast.error("Hubo un error!");
      state.error = action.payload;
      state.status = LoadingStates.FAILED;
    },
    [addMovement.pending.type]: (state) => {
      state.status = LoadingStates.LOADING;
    },
    [fetchMovementsByProject.fulfilled.type]: (state, action) => {
      const project = state.items.find(
        (p) => p.id === action.payload.projectID
      );
      if (project) {
        project.movements = action.payload.response.data.movementsByProject?.items || [];
      }
      state.status = LoadingStates.SUCCEEDED;
    },
    [fetchMovementsByProject.rejected.type]: (state, action) => {
      state.error = action.payload;
      state.status = LoadingStates.FAILED;
    },
    [fetchMovementsByProject.pending.type]: (state) => {
      state.status = LoadingStates.LOADING;
    },
  },
});

// export const { addMovement } = projectsSlice.actions;
export default projectsSlice.reducer;
