import store from "@/store";

export async function requireAuth(to, from, next) {
  try {
    await store.dispatch("fetchUsuario");
    next();
  } catch (error) {
    next({
      path: "/login",
      query: { redirect: to.fullPath },
    });
  }
}

export function requireAdmin(to, from, next) {
  if (!store.getters.currentUser.isAdmin) next("/");
  else next();
}

export function requireSuperAdmin(to, from, next) {
  if (!store.getters.currentUser.isSuperAdmin) next("/");
  else next();
}

export function lazyLoad(componentPath) {
  return () => import("@/pages/" + componentPath);
}
