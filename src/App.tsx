import React from 'react';
import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import MainLayout from './layout/main';

function App() {
  return (
    <MainLayout/>
   
  );
}

export default App;

{/* <div>
   
   <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
     Launch demo modal <i className="bi bi-funnel"></i>
   </button>

  
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
 </div> */}