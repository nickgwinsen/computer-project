import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/providers/authProvider";

const Header = () => {
  {
    /* Make a header component and put it in the layout folder*/
  }
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const goToLogin = () => {
    router.push("/login");
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
      </Toolbar>
    </AppBar>
  );
};

export default Header;
