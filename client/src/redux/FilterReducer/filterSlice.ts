import { createSlice } from "@reduxjs/toolkit";

export interface Filter {
  selectedBrand: string;
  selectedYear: string;
  selectedSituation: string;
  selectedGearshift: string;
  priceRange: {
    minPrice: string;
    maxPrice: string;
  };
  selectedColors: string[];
}

interface FilterState {
  filter: Filter;
}

const initialState: FilterState = {
  filter: {
    selectedBrand: "",
    selectedYear: "",
    selectedSituation: "",
    selectedGearshift: "",
    priceRange: {
      minPrice: "5000",
      maxPrice: "200000",
    },
    selectedColors: [],
  },
};

export const filterSlice = createSlice({
  initialState,
  name: "filter",
  reducers: {
    updateFilter: (state, action) => {
      state.filter = { ...state.filter, ...action.payload };
    },
    resetFilter: (state) => {
      state.filter = initialState.filter;
    },
  },
});

export const { updateFilter, resetFilter } = filterSlice.actions;
