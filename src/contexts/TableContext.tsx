import { createContext, useContext, useState, useEffect, useMemo } from "react";
import {
  ColumnFiltersState,
  PaginationState,
  SortingState,
} from "@tanstack/react-table";
import { Profile } from "@/types/profile";
import { createClient } from "@/lib/supabase/supabaseClient";
import { useToast } from "@/hooks/use-toast";

const LOCAL_STORAGE_KEY = "dataTableState";

interface TableContextProps {
  profiles: Profile[];
  columnFilters: ColumnFiltersState;
  pagination: PaginationState;
  sorting: SortingState;
  setColumnFilters: (filters: ColumnFiltersState) => void;
  setPagination: (pagination: PaginationState) => void;
  setSorting: (sorting: SortingState) => void;
}

const TableContext = createContext<TableContextProps | undefined>(undefined);

export const TableProvider = ({ children }: { children: React.ReactNode }) => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState<SortingState>([]);
  const supabase = createClient();
  const { toast } = useToast();

  useEffect(() => {
    const savedState = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedState) {
      const { columnFilters, pagination, sorting } = JSON.parse(savedState);
      setColumnFilters(columnFilters);
      setPagination(pagination);
      setSorting(sorting);
    }
  }, []);

  useEffect(() => {
    const fetchProfiles = async () => {
      const { data, error } = await supabase.from("profiles").select("*");

      if (error) {
        toast({
          title: "Error",
          description: "There was an error fetching employee profiles.",
          variant: "destructive",
        });
        console.error("Error fetching profiles:", error);
      } else {
        setProfiles(data);
      }
    };

    fetchProfiles();
  }, [supabase, toast]);

  useEffect(() => {
    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify({ columnFilters, pagination, sorting })
    );
  }, [columnFilters, pagination, sorting]);

  const value = useMemo(
    () => ({
      profiles,
      columnFilters,
      pagination,
      sorting,
      setColumnFilters,
      setPagination,
      setSorting,
    }),
    [profiles, columnFilters, pagination, sorting]
  );

  return (
    <TableContext.Provider value={value}>{children}</TableContext.Provider>
  );
};

export const useTableContext = () => {
  const context = useContext(TableContext);
  if (context === undefined) {
    throw new Error("useTableContext must be used within a TableProvider");
  }
  return context;
};
