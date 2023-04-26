import {React, useState} from 'react';
import {useNavigate} from 'react-router-dom';

const EditBook = (props) => {

    const history = useNavigate();
    
    const [formData, updateFormData] = useState({
        name: "",
        author: 1,
        category: "THRILLER",
        availableCopies: 1
    })

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        })
    }

    const onFormSubmit = (e) => {
        e.preventDefault();
        const name = formData.name;
        const author = formData.author;
        const category = formData.category;
        const availableCopies = formData.availableCopies;

        props.onEditBook(props.book.id,name, author, category, availableCopies);
        history("/books");
    }

    return(
        <div className="row mt-5">
            <div className="col-md-5">
                <form onSubmit={onFormSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Product name</label>
                        <input type="text"
                               className="form-control"
                               id="name"
                               name="name"
                               required
                               placeholder={props.book.name}
                               onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="author">Author</label>
                        <select name="author" id='author' className="form-control" onChange={handleChange}>
                        {props.authors.map((term) =>
                        {
                            if (term.id === props.book?.author?.id) {
                                return (
                                    <option value={term.id} selected>{term.name}</option>
                                )
                            }
                            else return (
                                <option value={term.id}>{term.name}</option>
                            )
                        }
                        )}
                        </select>
                    </div>
                    
                    <div className="form-group">
                        <label>Category</label>
                        <select name="category" className="form-control" onChange={handleChange}>
                            {props.categories.map((term) =>
                            {
                                if (term === props.book.category) {
                                    return (
                                        <option value={term} selected>{term}</option>
                                    )
                                }
                                else return (
                                    <option value={term}>{term}</option>
                                )
                            }
                            )}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Available Copies</label>
                        <input type="number" name="availableCopies" className="form-control" onChange={handleChange} placeholder={props.book.availableCopies}/>
                    </div>
                    <button id="submit" type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default EditBook;