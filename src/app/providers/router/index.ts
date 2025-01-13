import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

import SignupForm from "@/components/SignupForm.vue";
import VerifyForm from "@/components/VerifyForm.vue";
import LoginForm from "@/components/LoginForm.vue";
import ResendCode from "@/components/ResendCode.vue";
import AuthorizationPage from "@/pages/auth/Authorization.vue";

const routes: Array<RouteRecordRaw> = [
  { path: "/signup", component: SignupForm },
  { path: "/verify", component: VerifyForm },
  { path: "/login", component: LoginForm },
  { path: "/resend", component: ResendCode },
  {path: "/auth", component: AuthorizationPage},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
