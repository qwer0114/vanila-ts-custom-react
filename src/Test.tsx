import { router } from "./lib/route/router";

function Test() {
  return (
    <div>
      <h1>공통 부분</h1>
      <h1 onClick={() => router.navigate("/")}>Test</h1>
    </div>
  );
}

export default Test;
