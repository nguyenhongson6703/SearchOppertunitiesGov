import React, { FC } from "react";

const MainLayout : React.FC = () => {
    return (
        <div className="main-layout">
            <div className="header d-flex flex-row ">
                <div className="fs-4 me-4">Search</div>
                <div className="search-bar ">
                    <button data-bs-toggle="modal" data-bs-target="#exampleModal"  className="filter-button custom-border">Filter By <i className="bi bi-funnel"></i></button>
                    <input className="search-text custom-border" type="text" placeholder="e.g Award Schedule"/>
                    <button className="search-button custom-border" ><i className="bi bi-search"></i></button>
                </div>
            </div>
            <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                    ...
                    </div>
                    <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary">Save changes</button>
                    </div>
                </div>
                </div>
            </div>
            <div className="content container">
                <div className="head-content d-flex justify-content-between">
                    <div className="number-resutl">
                        <p className="fs-6">Showing 1-25  of 388 results</p>
                    </div>
                    <div className="sort-by">
                         <span className="sort-text">Sort by</span>
                        <button className="sort-btn">Date Modified/Update <i className="bi bi-caret-down"></i></button>
                    </div>
                </div>
                <div className="content-item container">
                    <div className="row">
                        <div className="left-portion col-9">'
                            <h5 className="text-primary">Full parent path name</h5>
                            <h6 className="text-black text-uppercase">NOTICE ID: notice id</h6>
                            <p className="text-body">title opportunity</p>
                            <div className="office-content d-flex justify-content-between">
                                <div className="office-content-item">
                                    <span className="text-body">Type of an organization</span>
                                    <h6 className="text-info text-uppercase">Office</h6>
                                </div>
                                <div className="office-content-item">
                                    <span className="text-body">Resource</span>
                                    <a style={{display:"block"}} href="https://sam.gov/opp/66fa12dc46624eaa82e12f4f0542fcd0/view" className="text-info">https://sam.gov/opp/66fa12dc46624eaa82e12f4f0542fcd0/view</a>
                                </div>
                                <div className="office-content-item">
                                    <span className="text-body">Address Office</span>
                                    <h6 className="text-info text-uppercase">Address of office</h6>
                                </div>
                            </div>
                        </div>
                        <div className="right-portion col-3">
                            <button>Contract opportunity</button>
                            <div className="right-portion-item">
                                <span className="text-body">Current response date</span>
                                <h6 className="text-black ">March 04, 2025</h6>
                            </div>
                            <div className="right-portion-item">
                                <span className="text-body">Notice type</span>
                                <h6 className="text-black ">Original sourch sought</h6>
                            </div>
                            <div className="right-portion-item">
                                <span className="text-body">Oppertunity posted date</span>
                                <h6 className="text-black ">March 04, 2025</h6>
                            </div>
                            <div className="right-portion-item">
                                <span className="text-body">Response deadline date</span>
                                <h6 className="text-black ">March 04, 2025</h6>
                            </div>
                        </div>
                    </div>
                    

                </div>

            </div>
        </div>
    )

}
export default MainLayout;