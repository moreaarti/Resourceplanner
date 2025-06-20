import React, { useMemo } from 'react'
import DataTable from 'react-data-table-component';
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function TableSkeleton({ headers = [] }) {


      const customStyles = {
    head: {
      style: {
        minHeight: "45px",
        overflow: "hidden",
      },
    },
    headCells: {
      style: {
        backgroundColor: "#F8F7FC",
        color: "#26212E",
        fontWeight: "600",
        textAlign: "center",
        fontSize: "16px",
        borderLeft: ".5px solid #E1DCFF",
        "&:nth-child(2)": {
          borderLeft: "none",
        },
        padding: "12px",
      },
    },
    rows: {
      style: {
        minHeight: "50px",
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #E1DCFF",
        "&:hover": {
          backgroundColor: "#F8F7FC",
          cursor: "pointer",
        },
      },
    },
    cells: {
      style: {
        "&:nth-child(2)": {
          borderLeft: "none",
        },
        borderLeft: "1px solid #E1DCFF",
        padding: "12px",
        fontSize: "14px",
        color: "#26212E",
        fontWeight: "400",
      },
    },
  };

  const skeletonColumns = useMemo(() => {
    return headers.map((headerName) => ({
      name: headerName,
      selector: () => (
        <Skeleton
          baseColor="#E0E0E0"
          highlightColor="#C8C8C8"
          width={100}
          height={20}
        />
      ),
      sortable: false,
    }));
  }, [headers]);


  return (
    <div className="dashboard-table" >
        <DataTable
            columns={skeletonColumns}
            data={ Array(7).fill({})}
            selectableRows
            responsive
             customStyles={customStyles}
          />
    </div>
  )
}
