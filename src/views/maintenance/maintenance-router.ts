import Maintenance from "@/views/maintenance/index.vue";
import MaintenanceHome from "@/views/maintenance/home.vue";
import Verify from "@/views/maintenance/verify.vue";

export const maintenanceRouter = {
  path: "/maintenance",
  component: Maintenance,
  children: [
    {
      path: "verify",
      component: Verify
    },
    {
      path: "*",
      redirect: "/maintenance"
    },
  ]
};
