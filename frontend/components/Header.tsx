"use client";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  TextField,
  Box,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/app/providers/authProvider";
import { useState } from "react";
import { isChampionName } from "@/app/(api)/riot/riot";

const Header = () => {
  const [search, setSearch] = useState("");
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.includes("#")) {
      const [name, tag] = search.split("#");
      router.push(`/players/${name}/${tag}`);
      setSearch("");
    } else if (isChampionName(search)) {
      router.push(`/champions/${search}`);
      setSearch("");
    } else {
      router.push(`/unknown`);
      setSearch("");
    }
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const goToLogin = () => {
    router.push("/login");
  };

  const renderHeaderSearch = (pathname: string) => {
    const noRender = ["/login", "/register", "/", "/champions"];
    if (noRender.includes(pathname)) {
      return true;
    }
    return false;
  };

  return (
    <AppBar
      position="static"
      style={{ backgroundColor: "#2b2d3d", padding: "1rem" }}
    >
      <Toolbar>
        <Typography
          variant="h5"
          noWrap
          sx={{
            flexGrow: 1,
            display: { xs: "none", sm: "block" },
            textAlign: "left",
          }}
          color="#5383e9"
        >
          <Link
            href="/"
            passHref
            replace
            style={{ textDecoration: "none", color: "#3b82f6" }}
          >
            League of L👀kup
          </Link>
        </Typography>
        <Box
          alignItems={"center"}
          gap={"1rem"}
          sx={{
            display: { xs: "none", sm: "flex" },
          }}
        >
          {renderHeaderSearch(pathname) ? null : (
            <form
              onSubmit={(e) => {
                handleSubmit(e);
                setSearch("");
              }}
            >
              <TextField
                variant="outlined"
                size="small"
                placeholder="Search again?"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                slotProps={{ input: { sx: { color: "#5383e9" } } }}
                sx={{
                  backgroundColor: "#1e2029",
                  borderRadius: "4px",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#3b82f6",
                    },
                    "&:hover fieldset": {
                      borderColor: "#5383e9",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#5383e9",
                    },
                  },
                }}
              />
            </form>
          )}
          <Link
            href="/champions"
            passHref
            style={{
              textDecoration: "none",
              color: "#3b82f6",
            }}
          >
            <Typography>CHAMPIONS</Typography>
          </Link>
          {isAuthenticated ? (
            <Button
              variant="contained"
              color="primary"
              onClick={logout}
              sx={{
                ":hover": {
                  color: "#3b82f6",
                  backgroundColor: "#2b2d3d",
                },
                display: { xs: "none", sm: "block" },
              }}
            >
              Logout
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={goToLogin}
              sx={{
                ":hover": {
                  color: "#3b82f6",
                  backgroundColor: "#2b2d3d",
                },
                display: { xs: "none", sm: "block" },
              }}
            >
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
