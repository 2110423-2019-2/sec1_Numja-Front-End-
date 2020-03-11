import Maintenance from "@/views/maintenance/index.vue";
import AdminSuspendUser from "@/views/maintenance/suspend/AdminSuspendUser.vue";
import Verify from "@/views/maintenance/Verify.vue";

export const maintenanceRouter = {
  path: "/maintenance",
  name: "Maintenance",
  component: Maintenance,
  children: [
    {
      path: "suspend",
      component: AdminSuspendUser
    },
    {
      path: "*",
      redirect: "/"
    }
  ]
};
