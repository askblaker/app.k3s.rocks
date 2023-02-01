import AppsIcon from "@mui/icons-material/Apps";
import BlenderIcon from "@mui/icons-material/Blender";
import ConstructionIcon from "@mui/icons-material/Construction";
import KeyIcon from "@mui/icons-material/Key";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { useRouter } from "next/router";
import * as React from "react";

const drawerWidth = 240;

export default function ClippedDrawer({ children }) {
  const router = useRouter();
  const routesOver = [
    {
      name: "SSH Keys",
      route: "/sshkeys",
      icon: <KeyIcon />,
    },
    {
      name: "Servers",
      route: "/servers",
      icon: <BlenderIcon />,
    },
    {
      name: "Tools",
      route: "/tools",
      icon: <ConstructionIcon />,
    },
    {
      name: "Apps",
      route: "/apps",
      icon: <AppsIcon />,
    },
  ];
  const routesUnder = [
    {
      name: "Profile",
      route: "/profile",
      icon: <InboxIcon />,
    },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Link href="/" passHref>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ "&:hover": { cursor: "pointer" } }}
            >
              app.k3s.rocks
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            {routesOver.map((item) => (
              <Link href={item.route} passHref key={item.name}>
                <ListItem
                  button
                  selected={router.route === item.route}
                  component="a"
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItem>
              </Link>
            ))}
          </List>
          <Divider />
          <List>
            {routesUnder.map((item) => (
              <Link href={item.route} passHref key={item.name}>
                <ListItem
                  button
                  selected={router.route === item.route}
                  component="a"
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItem>
              </Link>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {children}
      </Box>
    </Box>
  );
}
