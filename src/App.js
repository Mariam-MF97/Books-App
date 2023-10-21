import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import React, { useEffect } from "react";
import { I18nextProvider } from "react-i18next";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import InitialRoute from "./components/InitialRoute";
import { NotFound } from "./components/NotFoundComponent";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import { BookProvider } from "./context/BookContext";
import DashboardLayout from "./layout/DashboardLayout";
import i18n from "./localization/i18n";
import AddBook from "./pages/books/AddBook";
import BooksList from "./pages/books/BooksList";
import EditBook from "./pages/books/EditBook";
import ViewBook from "./pages/books/ViewBook";
import Login from "./pages/login/Login";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import stylisRTLPlugin from "stylis-plugin-rtl";

function App() {
  const [isRTL, setIsRtl] = React.useState(i18n.dir() === "rtl");
  const styleCacheAR = createCache({
    key: "rtl",
    prepend: true,
    stylisPlugins: [stylisRTLPlugin],
  });

  const styleCacheEn = createCache({
    key: "ltr",
  });

  const theme = createTheme({
    direction: i18n.dir(),
  });

  useEffect(() => {
    i18n.on("languageChanged", (lng) => {
      setIsRtl(lng === "ar");
    });
  }, [i18n.language]);

  return (
    <CacheProvider value={isRTL ? styleCacheAR : styleCacheEn}>
      <Router>
        <I18nextProvider i18n={i18n}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <AuthProvider>
              <BookProvider>
                <Routes>
                  <Route path="/" element={<InitialRoute />} />
                  <Route path="/login" element={<Login />} />
                  <Route
                    path="/books-list/*"
                    element={
                      <DashboardLayout>
                        <Routes>
                          <Route
                            index
                            element={
                              <ProtectedRoute>
                                <BooksList />
                              </ProtectedRoute>
                            }
                          />
                          <Route
                            path="/add-book"
                            element={
                              <ProtectedRoute>
                                <AddBook />
                              </ProtectedRoute>
                            }
                          />
                          <Route
                            path="/view-book/:id"
                            element={
                              <ProtectedRoute>
                                <ViewBook />
                              </ProtectedRoute>
                            }
                          />
                          <Route
                            path="/edit-book/:id"
                            element={
                              <ProtectedRoute>
                                <EditBook />
                              </ProtectedRoute>
                            }
                          />
                          <Route path="*" element={<NotFound />} />
                        </Routes>
                      </DashboardLayout>
                    }
                  />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BookProvider>
            </AuthProvider>
          </ThemeProvider>
        </I18nextProvider>
      </Router>
    </CacheProvider>
  );
}

export default App;
