import React, {useState} from "react";
import {Link} from "react-router-dom";
import ReactPaginate from 'react-paginate';

export default function ListBooks (props)  {

    const [page,setPage] = useState(0);
    const [size,setSize] = useState(5);


    const handlePageClick = (data) => {
        let selected = data.selected;
        setPage(selected)
    }

    const getProductsPage = (offset, nextPageOffset) => {
        return props.products.map((term) => {
            return (
                <tr key={term.id}>
                    <td>{term.name}</td>
                    <td>{term.author.name}</td>
                    <td>{term.category}</td>
                    <td>{term.availableCopies}</td>
                    <td className="text-right">
                        <a title={"Delete"} className={"btn btn-danger me-2"} onClick={() => props.onDelete(term.id)}>
                            Delete
                        </a>
                        <a title={"Borrow"} className={"btn btn-primary me-2"} onClick={() => props.onBorrow(term.id)}>
                            Mark As Taken
                        </a>
                        <Link className={"btn btn-info ml-2"}
                            onClick={() => props.onEdit(term.id)}
                            to={`/edit/${term.id}`}>
                            Edit
                        </Link>
                    </td>
                </tr>
            )
        }).filter((product, index) => {
            return index >= offset && index < nextPageOffset;
        })
    }

    const offset = size * page;
    const nextPageOffset = offset + size;
    const pageCount = Math.ceil(props.products.length / size);
    const products = getProductsPage(offset, nextPageOffset);

    return (
        <div className={"container mm-4 mt-5"}>
            <div className={"row"}>
                <div className={"table-responsive"}>
                    <table className={"table table-striped"}>
                        <thead>
                        <tr>
                            <th scope={"col"}>Name</th>
                            <th scope={"col"}>Author</th>
                            <th scope={"col"}>Category</th>
                            <th scope={"col"}>Available Copies</th>
                            <th scope={"col"}>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {products}
                        </tbody>
                    </table>
                </div>
                <div className="col mb-3">
                    <div className="row">
                        <div className="col-sm-12 col-md-12">
                            <Link className={"btn btn-block btn-dark"} to={"/add"}>Add new book</Link>
                        </div>
                    </div>
                </div>
            </div>
            <ReactPaginate previousLabel={"back"}
                            nextLabel={"next"}
                            breakLabel={<a href="/#">...</a>}
                            breakClassName={"break-me"}
                            pageClassName={"page-item"}
                            pageCount={pageCount}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={handlePageClick}
                            containerClassName={"pagination m-4 justify-content-center"}
                            activeClassName={"active"}
                            />
        </div>
        
    )


}
