import { createRoot } from "../dom/render";
import { VNode } from "../jsx/type";

interface Route {
  path: string;
  component: VNode;
}

class Router {
  private static instance: Router;
  private routes: Route[] = [];
  private currentPath = window.location.pathname;

  private constructor() {
    window.addEventListener("popstate", () => {
      this.currentPath = window.location.pathname;
      this.render();
    });
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new Router();
    }
    return this.instance;
  }

  addRoute(route: Route) {
    this.routes.push(route);
  }

  navigate(path: string) {
    window.history.pushState(null, "", path);
    this.currentPath = window.location.pathname;
    this.render();
  }

  render() {
    const currentComponent = this.routes.find(
      (route) => route.path === this.currentPath
    );

    if (currentComponent) {
      const root = document.getElementById("app")!;
      createRoot(root).render(currentComponent.component);
    }
    console.error("존재하지 않는 route");
  }
}

const router = Router.getInstance();

export { router };
