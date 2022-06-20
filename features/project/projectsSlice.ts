import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API, graphqlOperation } from "aws-amplify";
import toast from "react-hot-toast";
import { createNotification } from "../notificationCenter/notificationSlice";
import {
  updateBucket,
  createProject as createProjectMutation,
  deleteProject as deleteProjectMutation,
  updateProject as updateProjectMutation,
  createMovement as createMovementMutation,
  updateMovement as updateMovementMutation,
  deleteMovement as deleteMovementMutation,
} from "../../src/graphql/mutations";
import {
  projectsByBucket,
  movementsByProject,
} from "../../src/graphql/queries";
import {
  ProjectsState,
  LoadingStates,
  Project,
  Movement,
  NotificationTypes,
  Notification,
} from "../../types";
import { money, compareDates } from "../../utils";

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
interface NewProject extends Project {
  userName: string;
}

export const addProject = createAsyncThunk(
  "projects/addProject",
  async (data: NewProject, { rejectWithValue }) => {
    const { userName, ...project } = data;
    const input = {
      ...project,
      status: "pending",
      startDate: new Date().toISOString(),
      isActive: true,
    };
    const response = await API.graphql(
      graphqlOperation(createProjectMutation, { input })
    );
    try {
      await createNotification({
        message: `Agregó un nuevo Proyecto ${data.name} por ${money(
          Number(data.amountGoal)
        )}`,
        date: new Date().toISOString(),
        type: NotificationTypes.PROJECT,
        bucketID: data.bucketID,
        userName: data.userName,
      } as Notification);
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.errors[0].message);
    }
    return response;
  }
);

export const updateProject = createAsyncThunk(
  "projects/updateProject",
  async (data: Project, { rejectWithValue }) => {
    const { movements, createdAt, updatedAt, loadingState, ...project } = data;
    const input = {
      ...project,
    };

    try {
      const response = await API.graphql(
        graphqlOperation(updateProjectMutation, { input })
      );
      return response;
    } catch (obj) {
      console.log(obj);
      return rejectWithValue(obj.errors[0].message);
    }
  }
);

export const deleteProject = createAsyncThunk(
  "projects/deleteProject",
  async (projectID: string) => {
    const response = await API.graphql(
      graphqlOperation(deleteProjectMutation, { input: { id: projectID } })
    );
    return response;
  }
);

export const addMovement = createAsyncThunk(
  "projects/addMovement",
  async (data: Movement) => {
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

export const updateMovement = createAsyncThunk(
  "projects/updateMovement",
  async (data: Movement) => {
    const { createdAt, updatedAt, ...movement } = data;
    const input = {
      ...movement,
    };
    const response = await API.graphql(
      graphqlOperation(updateMovementMutation, { input })
    );
    return response;
  }
);

export const deleteMovement = createAsyncThunk(
  "projects/deleteMovement",
  async (movementID: string) => {
    const response = await API.graphql(
      graphqlOperation(deleteMovementMutation, { input: { id: movementID } })
    );
    return response;
  }
);

export const fetchMovementsByProject = createAsyncThunk(
  "projects/fetchMovementsByProject",
  async (projectID: string) => {
    const response = (await API.graphql(
      graphqlOperation(movementsByProject, { projectID })
    )) as any;
    const items = response.data.movementsByProject.items.sort((a, b) => {
      return compareDates(new Date(b.date), new Date(a.date));
    });
    return { response: items, projectID };
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
    [updateProject.fulfilled.type]: (state, action) => {
      const index = state.items.findIndex(
        (project) => project.id === action.payload.data.updateProject.id
      );
      state.items[index] = action.payload.data.updateProject;
      state.status = LoadingStates.SUCCEEDED;
    },
    [updateProject.rejected.type]: (state, action) => {
      toast.error(action.payload);
      state.error = action.payload;
      state.status = LoadingStates.FAILED;
    },
    [updateProject.pending.type]: (state) => {
      state.status = LoadingStates.LOADING;
    },
    [deleteProject.fulfilled.type]: (state, action) => {
      toast.success("Eliminado correctamente!");
      const index = state.items.findIndex(
        (project) => project.id === action.payload.data.deleteProject.id
      );
      state.items.splice(index, 1);
      state.status = LoadingStates.SUCCEEDED;
    },
    [deleteProject.rejected.type]: (state, action) => {
      toast.error("Hubo un error!");
      state.error = action.payload;
      state.status = LoadingStates.FAILED;
    },
    [deleteProject.pending.type]: (state) => {
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
    [updateMovement.fulfilled.type]: (state, action) => {
      toast.success("Movimiento Guardado!");
      const movement = action.payload.data.updateMovement;
      const project = state.items.find((p) => p.id === movement.projectID);
      if (project) {
        const index = project.movements.findIndex((m) => m.id === movement.id);
        project.movements[index] = movement;
      }
      state.status = LoadingStates.SUCCEEDED;
    },
    [updateMovement.rejected.type]: (state, action) => {
      toast.error("Hubo un error!");
      state.error = action.payload;
      state.status = LoadingStates.FAILED;
    },
    [updateMovement.pending.type]: (state) => {
      state.status = LoadingStates.LOADING;
    },
    [deleteMovement.fulfilled.type]: (state, action) => {
      toast.success("Movimiento Eliminado!");
      const movement = action.payload.data.deleteMovement;
      const project = state.items.find((p) => p.id === movement.projectID);
      if (project) {
        const index = project.movements.findIndex((m) => m.id === movement.id);
        project.movements.splice(index, 1);
      }
      state.status = LoadingStates.SUCCEEDED;
    },
    [deleteMovement.rejected.type]: (state, action) => {
      toast.error("Hubo un error!");
      state.error = action.payload;
      state.status = LoadingStates.FAILED;
    },
    [fetchMovementsByProject.fulfilled.type]: (state, action) => {
      const project = state.items.find(
        (p) => p.id === action.payload.projectID
      );
      if (project) {
        project.movements = action.payload.response || [];
        project.loadingState = LoadingStates.SUCCEEDED;
      }
      state.status = LoadingStates.SUCCEEDED;
    },
    [fetchMovementsByProject.rejected.type]: (state, action) => {
      state.error = action.payload;
      state.status = LoadingStates.FAILED;
    },
  },
});

// export const { addMovement } = projectsSlice.actions;
export default projectsSlice.reducer;
