import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { HomeLayout } from "./features/Home/pages/HomeLayout";
import { SearchLayout } from "./features/Search/Pages/SearchLayout";
import { TopicPhotoLayout } from "./features/TopicPhoto/Pages/TopicPhotoLayout";

function App() {
  return (
    <Routes>
      <Route path="/MyPhoto/" element={<HomeLayout />} />
      <Route path="/topic/:id" element={<TopicPhotoLayout />} />
      <Route path="/search/:keyword" element={<SearchLayout />} />
    </Routes>
  );
}

export default App;
