import { router } from "./lib/route/router";
import Home from "./Home";
import Test from "./Test";
import { createRoot } from "./lib/dom/render";

router.addRoute({ path: "/", component: <Home /> });
router.addRoute({ path: "/test", component: <Test /> });

const root = createRoot(document.getElementById("app")!);
root.render(<Home />);
