import axios from '../axios/axios';

const Repository = {

    getAllBooks: () => {
        return axios.get('/book');
    },

    addBook: (name, category, author, availableCopies) => {
        return axios.post('/book/add', {
            "name": name,
            "category": category,
            "author": author,
            "availableCopies": availableCopies
        });
    },

    editBook: (id, name, category, author, availableCopies) => {
        return axios.put(`/book/edit/${id}`, {
            "name": name,
            "category": category,
            "author": author,
            "availableCopies": availableCopies
        });
    },

    deleteBook: (id) => {
        return axios.delete(`/book/delete/${id}`);
    },

    borrowBook: (id) => {
        return axios.get(`/book/borrow/${id}`);
    },

    returnBook: (id) => {
        return axios.get(`/book/return/${id}`);
    },

    getCategories: () => {
        return axios.get('/book/categories');
    },
    getAuthors: () => {
        return axios.get('/book/authors');
    },

    getBookById: (id) => {
        return axios.get(`/book/${id}`);
    }

}    

export default Repository;