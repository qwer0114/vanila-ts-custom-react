import { router } from "./lib/route/router";

function Home() {
  return (
    <div>
      <h1>공통 부분</h1>
      <h1 onClick={() => router.navigate("/test")}>Home</h1>
    </div>
  );
}

export default Home;
