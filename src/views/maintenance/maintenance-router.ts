import Maintenance from "@/views/maintenance/index.vue";
import MaintenanceHome from "@/views/maintenance/home.vue";

export const maintenanceRouter = {
  path: "/maintenance",
  component: Maintenance,
  children: [
    {
      path: "",
      component: MaintenanceHome
    },
    {
      path: "*",
      redirect: "/maintenance"
    }
  ]
};
