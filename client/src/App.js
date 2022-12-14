import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchNotes } from "./store/note-slice";
import Summarize from "./pages/Summarize";
import HomePage from "./pages/HomePage";
import NewNote from "./pages/NewNote";
import Settings from "./pages/Settings";
import ActiveNote from "./pages/ActiveNote";
import Layout from "./components/Layout/Layout";
import Registration from "./components/Login/Registration";
import LoadingSpinner from "./components/UI/LoadingSpinner/LoadingSpinner";

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  const isLoading = useSelector((state) => state.ui.isLoading);

  let routes;

  useEffect(() => {
    dispatch(fetchNotes(false));
  }, [dispatch]);

  if (isLoggedIn) {
    routes = (
      <>
        <Route path="/" element={<Navigate replace to="/home" />} />
        <Route path="/summarize" element={<Summarize />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/new-note" element={<NewNote />} />
        <Route path="/notes/:noteId" element={<ActiveNote />} />
        <Route path="/settings" element={<Settings />} />
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
    <>
      <Registration />
      {isLoading && <LoadingSpinner isLoading={isLoading} />}
      <Layout>
        <Routes>{routes}</Routes>
      </Layout>
    </>
  );
}

export default App;
