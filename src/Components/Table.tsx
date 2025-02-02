import DataTable, { TableColumn } from "react-data-table-component";
interface TableProps<T> {
  columns: TableColumn<T>[]; // ✅ Ensure columns are properly typed
  data: T[];
}

const Table = <T,>({ columns, data }: TableProps<T>) => {
  const customStyles = {
    rows: {
      style: {
        minHeight: "45px",
      },
    },
    headCells: {
      style: {
        // backgroundColor: "#f4f4f4",
        backgroundColor: "white",
        fontWeight: "bold",
      },
    },
  };
  return (
    <div className="rounded-md">
      <DataTable
        columns={columns}
        data={data}
        customStyles={customStyles}
        striped
        highlightOnHover
        pagination
      />
    </div>
  );
};

export default Table;
