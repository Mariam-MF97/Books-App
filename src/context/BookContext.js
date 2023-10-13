import React, { createContext, useContext, useReducer } from "react";

const initialState = {
  bookData: [],
  viewedBook: null,
};

const bookReducer = (state, action) => {
  switch (action.type) {
    case "ADD_BOOK":
      return { ...state, bookData: [...state.bookData, action.payload] };
    case "DELETE_BOOK":
      return {
        ...state,
        bookData: state.bookData.filter((book) => book.id !== action.payload),
      };
    case "EDIT_BOOK":
      const updatedBookData = state.bookData.map((book) => {
        if (book.id === action.payload.id) {
          return { ...book, ...action.payload };
        } else {
          return book;
        }
      });
      return { ...state, bookData: updatedBookData };
    case "VIEW_BOOK":
      const bookToView = state.bookData.find(
        (book) => book.id === action.payload
      );
      return { ...state, viewedBook: bookToView };

    default:
      return state;
  }
};

const BookContext = createContext();

export const useBookContext = () => useContext(BookContext);

export const BookProvider = ({ children }) => {
  const [state, dispatch] = useReducer(bookReducer, initialState);

  return (
    <BookContext.Provider value={{ state, dispatch }}>
      {children}
    </BookContext.Provider>
  );
};
