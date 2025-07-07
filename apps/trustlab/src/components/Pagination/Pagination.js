import { Box, Button, usePagination } from "@mui/material";

function Pagination(props) {
  const { count, onChange } = props;
  const { items } = usePagination(props);

  if (!count || count < 2) {
    return null;
  }

  const buttons = items.filter(({ type }) =>
    ["previous", "next"].includes(type),
  );
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        py: 2,
      }}
    >
      {buttons.map((item) => {
        if (item.page === 0) {
          return null;
        }
        let label;
        if (item.type === "next" && item.page === 2) {
          label = "SEE MORE";
        } else {
          label = item.type.slice(0, 4);
        }
        return (
          <Button
            key={item.page}
            {...item}
            onClick={() => onChange(item.page)}
            variant="contained"
            size="small"
          >
            {label}
          </Button>
        );
      })}
    </Box>
  );
}

export default Pagination;
