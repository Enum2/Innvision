import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
function CabinsTableOperations() {
  return (
    <div>
      <TableOperations>
        <Filter
          filterField="discount"
          options={[
            { value: "all", label: "All" },
            { value: "no-discount", label: "No discount" },
            { value: "with-discount", label: "With discount" },
          ]}
        />
        <SortBy
          options={[
            {
              value: "name-asc",
              label: "sort by name(A-Z)",
            },
            {
              value: "name-desc",
              label: "sort by name(z-A)",
            },
            {
              value: "regularPrice-asc",
              label: "sort by price(low first)",
            },
            {
              value: "regularPrice-desc",
              label: "sort by price (high first)",
            },
            {
              value: "maxCapacity-asc",
              label: "sort by maxCapacity(low first)",
            },
            {
              value: "maxCapacity-desc",
              label: "sort by maxCapacity(high first)",
            },
          ]}
        ></SortBy>
      </TableOperations>
    </div>
  );
}

export default CabinsTableOperations;
