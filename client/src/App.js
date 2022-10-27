import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchNotes } from "./store/note-slice";
import Summarize from "./pages/Summarize";
import Layout from "./components/Layout/Layout";
import HomePage from "./pages/HomePage";
import NewNote from "./pages/NewNote";
import Setting from "./pages/Setting";
import ActiveNote from "./pages/ActiveNote";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.login.user);
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);

  let routes;

  useEffect(() => {
    if (user.id) {
      dispatch(fetchNotes(user.id));
    }
  }, [dispatch, user.id]);

  if (isLoggedIn) {
    routes = (
      <>
        <Route path="/" element={<Navigate replace to="/home" />} />
        <Route path="/summarize" element={<Summarize />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/new-note" element={<NewNote />} />
        <Route path="/notes/:noteId" element={<ActiveNote />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </>
    );
  } else {
    routes = (
      <>
        <Route path="/" element={<Navigate replace to="/summarize" />} />
        <Route path="/summarize" element={<Summarize />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </>
    );
  }

  return (
    <Layout>
      <Routes>{routes}</Routes>
    </Layout>
  );
}

export default App;
