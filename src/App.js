import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { BookProvider } from "./context/BookContext";
import DashboardLayout from "./layout/DashboardLayout";
import AddBook from "./pages/books/AddBook";
import BooksList from "./pages/books/BooksList";
import EditBook from "./pages/books/EditBook";
import ViewBook from "./pages/books/ViewBook";
import Login from "./pages/login/Login";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { NotFound } from "./components/NotFoundComponent";
import InitialRoute from "./components/InitialRoute";

function App() {
  return (
    <Router>
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
    </Router>
  );
}

export default App;
