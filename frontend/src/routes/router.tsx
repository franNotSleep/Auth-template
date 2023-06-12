import {
  createBrowserRouter,
  createRoutesFromElements,
  Route
} from "react-router-dom";

import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/login/" element={<SignIn />}/>
      <Route path="/register/" element={<SignUp />}/>
    </Route>
  )
);

export default router;
