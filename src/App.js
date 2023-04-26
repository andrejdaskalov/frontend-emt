import {React, useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Link, Routes, Redirect} from 'react-router-dom';
import Header from './components/Header/header';
import ListBooks from './components/Books/ListBooks/listbook';
import Repository from "./repository/repository";
import AddBook from './components/Books/AddBook/addbook';
import EditBook from './components/Books/EditBook/editbook';
import Categories from './components/Categories/categories';

function App() {

  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [book, setBook] = useState({});

  const loadData = () => {
    Repository.getAllBooks().then((response)=>{
      setBooks(response.data);
    })
    Repository.getAuthors().then((response)=>{
      setAuthors(response.data);
    })
    Repository.getCategories().then((response)=>{
      setCategories(response.data);
    })

  }

  useEffect(() => {
    loadData();
  }, []);

  const addBook = (name, author, category, availableCopies) => {
    Repository.addBook(name, category, author, availableCopies).then(()=>{
      loadData();
    })
  }

  const editBook = (id, name, author, category, availableCopies) => {
    Repository.editBook(id, name, category, author, availableCopies).then(()=>{
      loadData();
    })
  }

  const getBook = (id) => {
    Repository.getBookById(id).then((response)=>{
      setBook(response.data);
    })
  }

  const deleteBook = (id) => {
    Repository.deleteBook(id).then(()=>{
      loadData();
    })
  }

  const borrowBook = (id) => {
    Repository.borrowBook(id).then(()=>{
      loadData();
    })
  }
  
  return (
    <Router>
      <Header></Header>
      <main>
        <div className="container">
          <Routes>
            <Route path={'/books'} exact element = {
              <ListBooks products = {books} onEdit={getBook} onDelete={deleteBook} onBorrow={borrowBook}/>
            }/>
            <Route path={'/add'} exact element = {
              <AddBook authors = {authors} categories = {categories} onAddBook = {addBook}/>
            }/>
            <Route path={'/edit/:id'} exact element = {
              <EditBook authors = {authors} categories = {categories} onEditBook = {editBook} book={book}/>
            }/>
            <Route path={'/categories'} exact element = {
              <Categories categories = {categories}/>
            }/>
          </Routes>
          
        </div>
      </main>
    </Router>
  );

  
}

export default App;
