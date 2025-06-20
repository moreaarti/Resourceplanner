import { createSlice } from '@reduxjs/toolkit';

// employeeSlice.js
const employeeSlice = createSlice({
  name: 'employees',
  initialState: {
    employees: [],
    pageInfo: {},
    loading: false,
    error: null,
  },
  reducers: {
    fetchEmployeesStart(state) {
      state.loading = true;
      state.error = null;
    },
    
    fetchEmployeesSuccess(state, action) {
      const { employees, pageInfo, variables } = action.payload;
    
      if (variables.search) {
        // Clear employees on new search
        state.employees = employees;
      } else if (variables.after) {
        // Append results for load more
        state.employees = [...state.employees, ...employees];
      } else {
        // Initial load or refresh
        state.employees = employees;
      }
    
      state.pageInfo = pageInfo;
      state.loading = false;
    },
    
    fetchEmployeesFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  fetchEmployeesStart,
  fetchEmployeesSuccess,
  fetchEmployeesFailure,
} = employeeSlice.actions;

export default employeeSlice.reducer;
