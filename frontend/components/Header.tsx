import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import Link from "next/link";

const Header = () => {
  {
    /* Make a header component and put it in the layout folder*/
  }
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
          <Typography
            variant="h5"
            color="#5383e9"
            component="a"
            sx={{
              textDecoration: "none",
              "&:hover": { textDecoration: "none" },
            }}
          >
            <Link href="/" passHref>
              League of L👀kup
            </Link>
          </Typography>
        </Typography>
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
