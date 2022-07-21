import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import { Header } from "./components/Header";
import { History } from "./pages/History";
import { Home } from "./pages/Home";
import { DefaultLayout } from "./layouts/DefaultLayout";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DefaultLayout/>}>
            <Route index element={<Home/>} />
            <Route path="/history" element={<History/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
