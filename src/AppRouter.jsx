import { Route } from "react-router";

import { Login } from "./public/Login/Login";
import { HomePage } from "./pages/Home";
import { Services } from "./pages/Services";



import { RoutesWithNotFount } from "./components/RoutesWithNotFound";
import { HairCutDetails } from "./pages/HairCutDetails";
import { PageOrderSuccess } from "./pages/Success";
import { Register } from "./public/Register/Register";
import { PrivateGuard } from "./guard/PrivateGuard";
import { PrivateRouter } from "./private/PrivateRoutes/privateRoutes";


export const AppRouter = () => {
  return (
        <RoutesWithNotFount>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:haircutId" element={<HairCutDetails />} />
          <Route path="/success" element={<PageOrderSuccess />} />

          <Route element={<PrivateGuard />}>
            <Route path="/private/*" element={<PrivateRouter />} />
          </Route>
        </RoutesWithNotFount>

  );
};
