"use client";
import { useState } from "react";
import {
  TextField,
  IconButton,
  Card,
  CardContent,
  InputAdornment,
} from "@mui/material";
import { useRouter } from "next/navigation";
import SearchIcon from "@mui/icons-material/Search";
import { isChampionName } from "@/app/(api)/riot/riot";
const SearchBar = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.includes("#")) {
      const [name, tag] = search.split("#");
      router.push(`/players/${name}/${tag}`);
    } else if (isChampionName(search)) {
      router.push(`/champions/${search}`);
    }
  };
  return (
    <>
      <Card
        sx={{
          flexGrow: 1,
          borderRadius: "50px",
          display: "flex",
          flexDirection: "row",
          backgroundColor: "#2b2d3d",
          height: "75px",
          alignItems: "center",
        }}
      >
        <CardContent
          sx={{
            flexGrow: 1,
            paddingLeft: "30px",
            paddingRight: "30px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <form style={{ flexGrow: 1 }} onSubmit={handleSubmit}>
            <TextField
              id="main-search"
              label="    Search"
              variant="standard"
              onChange={(e) => setSearch(e.target.value)}
              fullWidth
              placeholder="Game Name + #NA1"
              slotProps={{
                input: {
                  startAdornment: <InputAdornment position="start" />,
                  sx: { color: "#fff" },
                },
                inputLabel: { sx: { color: "#fff" } },
              }}
            ></TextField>
          </form>
          <IconButton size="large" onClick={handleSubmit}>
            <SearchIcon fontSize="large" sx={{ color: "#fff" }} />
          </IconButton>
        </CardContent>
      </Card>
    </>
  );
};

export default SearchBar;
