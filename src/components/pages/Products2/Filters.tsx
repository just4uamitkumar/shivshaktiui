import { Grid, MenuItem, Select, Stack, TextField } from "@mui/material";
import IconBtn from "../../common/IconBtn";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import DownloadIcon from "@mui/icons-material/Download";

interface Props {
  query: string;
  setQuery: (query: string) => void;
  categoryList: string[] | unknown[];
  selectedCategory: string;
  setSelectedCategory: (selectedCategory: string) => void;
  handleIncrement?: () => void;
  handleDecrement?: () => void;
}

const Filters: React.FC<Props> = ({
  query,
  setQuery,
  categoryList,
  selectedCategory,
  setSelectedCategory,
  handleDecrement,
  handleIncrement,
}) => {
  return (
    <>
      <Grid size={4}>
        <TextField
          value={query}
          variant="outlined"
          placeholder="Search products..."
          type="text"
          onChange={(
            e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
          ) => setQuery(e.target.value)}
        />
      </Grid>
      <Grid size={6}>
        <Select
          size="small"
          value={selectedCategory}
          label="Select Category"
          onChange={(event) =>
            setSelectedCategory(event.target.value as string)
          }
        >
          <MenuItem value="none">
            <em>Select Category</em>
          </MenuItem>
          {categoryList &&
            categoryList.map(
              (item) =>
                (typeof item === "string" || typeof item === "number") && (
                  <MenuItem key={item} value={String(item)}>
                    {item}
                  </MenuItem>
                )
            )}
        </Select>
      </Grid>
      <Grid size={2}>
        <Stack
          display={"flex"}
          justifyContent={"space-between"}
          flexDirection={"row"}
          alignItems={"center"}
        >
          <IconBtn
            IconComponent={FileUploadIcon}
            iconClass="primary-btn mr-2"
            onClick={handleIncrement}
          />
          {"Price"}
          <IconBtn
            IconComponent={DownloadIcon}
            iconClass="primary-btn"
            onClick={handleDecrement}
          />
        </Stack>
      </Grid>
    </>
  );
};

export default Filters;
