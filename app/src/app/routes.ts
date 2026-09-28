import { createHashRouter } from "react-router";
import { AppLayout } from "./components/layout/AppLayout";
import DashboardScreen from "./screens/DashboardScreen";
import MapScreen from "./screens/MapScreen";
import TaskPlannerScreen from "./screens/TaskPlannerScreen";
import PlantMonitoringScreen from "./screens/PlantMonitoringScreen";
import RobotControlScreen from "./screens/RobotControlScreen";
import DataReportsScreen from "./screens/DataReportsScreen";
import AIChatScreen from "./screens/AIChatScreen";
import CommunityScreen from "./screens/CommunityScreen";
import ProfileScreen from "./screens/ProfileScreen";

// Hash routing keeps every screen directly refreshable on GitHub Pages,
// which does not provide an application-level SPA fallback.
export const router = createHashRouter([
  {
    path: "/",
    Component: AppLayout,
    children: [
      { index: true, Component: DashboardScreen },
      { path: "map", Component: MapScreen },
      { path: "tasks", Component: TaskPlannerScreen },
      { path: "plants", Component: PlantMonitoringScreen },
      { path: "robot", Component: RobotControlScreen },
      { path: "reports", Component: DataReportsScreen },
      { path: "community", Component: CommunityScreen },
      { path: "chat", Component: AIChatScreen },
      { path: "profile", Component: ProfileScreen },
    ],
  },
]);
