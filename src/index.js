import { createRoot } from "react-dom/client";

import App from "./App/App";

const appElement = <App />;

if (typeof window !== "undefined") {
  createRoot(document.getElementById("root")).render(appElement);
}

export default appElement;
