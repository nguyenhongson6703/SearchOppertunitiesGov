import React, { ChangeEvent, FC, useState } from "react";
import RequestParams from "../model/RequestParams";
import { fetchOpportunity } from "../fetch/fetchOpportunity";
import { formatDate, formatDateString, isWithinOneYear } from "../utils/utils";
import { Opportunity } from "../model/ResponseParams";
const MainLayout : React.FC = () => {

    // Khai báo các giá trị 
    const [requestParams, setRequestParams] = useState<RequestParams>({
        postedFrom: new Date(), 
        postedTo: new Date(),
        title: "", 
        limit: 25, 
        offset: 0
    });
    const [message, setMessage] = useState<string|null>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [totalRecords , setTotalRecords] = useState<number>(0);
    const [opportinities, setOpportunities] = useState<Opportunity[]>([]);
    // sử dụng useEffect


    // khai báo các sự kiện
    const validateRequestParams = (params: RequestParams): string | null =>  {
        if(!isWithinOneYear(params.postedFrom, params.postedTo)){
            return "Posted date from and Posted date to must be within one year";
        }
        if(params.rdlfrom && params.rdlto && !isWithinOneYear(params.rdlfrom, params.rdlto)){
            return "Response deadline time from and Response deadline time to must be within one year ";
        }
        return null;
    }
    const handleFetchingData = async ()   => {
        setIsLoading(true);
        setMessage(null);
        const errorMessage = validateRequestParams(requestParams);
        if(errorMessage){
            setMessage(errorMessage);
            setIsLoading(false);
            return {    opportunites: [], totalRecords: 0};
        }
        try{
            const data = await fetchOpportunity(requestParams);
            console.log('Data fetching: ', data);
            if(!data || !data.opportunitiesData){
                console.log("Invalid data format");
                return { opportunites: [], totalRecords: 0}
            }
            console.log("data.opportunitiesData", data.opportunitiesData);
            const opportunities = data.opportunitiesData.map((item: any): Opportunity => ({
                noticeId: item.noticeId,
                fullParentPathName: item.fullParentPathName,
                baseType: item.baseType,
                title: item.title,
                organizationType: item.organizationType,
                uiLink: item.uiLink,
                officeAddress: item.officeAddress,
                postedDate: item.postedDate,
                responseDeadLine: item.responseDeadLine,
            }));
            setOpportunities(opportunities);
            setTotalRecords(data.totalRecords);
            

        }catch(error){
            console.log("Error: ", error);
            setMessage("Failed to fetch opportunities. Please try again");
            
        }finally{
            setIsLoading(false);
        }

    }
    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value, type} = e.target;
        setRequestParams(   (prevRequestParams) => ({
            ...prevRequestParams,
            [name] : name.includes("post") || name.startsWith("rdl") ? new Date(value):
            type === "number" ? Number(value) : value,
        }));
    }
    const handleSearchChange = (e : ChangeEvent<HTMLInputElement>) => {
        const {value} = e.target;
        setRequestParams((prevRequestParams) => ({
            ...prevRequestParams, 
            ["title"] : value
        }));

    }
   
    return (
        <div className="main-layout">
            <div className="header d-flex flex-row ">
                <div className="fs-4 me-4">Search</div>
                <div className="search-bar ">
                    <button data-bs-toggle="modal" data-bs-target="#filterModal"  className="filter-button custom-border">Filter By <i className="bi bi-funnel"></i></button>
                    <input onChange={handleSearchChange} className="search-text custom-border" type="text" placeholder="e.g Award Schedule"/>
                    <button onClick={handleFetchingData} className="search-button custom-border" ><i className="bi bi-search"></i></button>
                </div>
            </div>
            <div className="modal fade" id="filterModal" tabIndex={-1} aria-labelledby="filterModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                    <h1 className="modal-title fs-5" id="filterModalLabel">Modal title</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="content-filter">
                            <form action="">
                                <div className="mb-3">
                                    <label htmlFor="solnum" className="form-label">Solicition Number</label>
                                    <input value={requestParams.solnum || ""} onChange={handleInputChange} type="text" className="form-control" id="solnum" name="solnum" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="noticeid" className="form-label">Notice Id</label>
                                    <input value={requestParams.noticeid} onChange={handleInputChange} type="text" className="form-control" id="noticeid" name="noticeid" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="postedFrom" className="form-label">Posted date from</label>
                                    <input value={requestParams.postedFrom.toISOString().split("T")[0]} onChange={handleInputChange} required type="date" className="form-control" id="postedFrom" name="postedFrom" />
                                </div>
                                <div className="mb-3">  
                                    <label htmlFor="postedTo" className="form-label">Posted date to</label>
                                    <input value={requestParams.postedTo.toISOString().split("T")[0]} onChange={handleInputChange} required type="date" className="form-control" id="postedTo" name="postedTo"/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="state" className="form-label">State</label>
                                    <input value={requestParams.state|| ""} onChange={handleInputChange } type="text" className="form-control" id="state" name="state" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="status" className="form-label">Status of opportunity</label>
                                    <select value={requestParams.status || ""} onChange={handleInputChange} name="status" id="status" className="form-select form-select-lg " aria-label="Select one of the status">
                                        <option className="text-black" value={"active"} selected>active</option>
                                        <option className="text-black" value={"inactive"}>inactive</option>
                                        <option className="text-black" value={"archived"}>archived</option>
                                        <option className="text-black" value={"cancelled"}>cancelled</option>
                                        <option className="text-black" value={"deleted"}>deleted</option>

                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="zip" className="form-label">Place of performance(zip code)</label>
                                    <input value={requestParams.zip || ""} onChange={handleInputChange} type="text" className="form-control" id="zip" name="zip" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="organizationCode" className="form-label">Code of associated organization</label>
                                    <input value={requestParams.organizationCode || ""} onChange={handleInputChange} type="text" className="form-control" id="organizationCode" name="organizationCode" />
                                </div>  
                                <div>
                                    <label htmlFor="organizationName" className="form-label">Name of associated organization. </label>
                                    <input value={requestParams.organizationName || ""} onChange={handleInputChange}  type="text" className="form-control" id="organizationName" name="organizationName"/>
                                </div>
                                <div>
                                    <label htmlFor="ccode" className="form-label">Classification Code </label>
                                    <input value={requestParams.ccode || ""} onChange={handleInputChange} type="text" className="form-control" id="ccode" name="ccode"/>
                                </div>
                                <div className="mb-3">  
                                    <label htmlFor="rdlfrom" className="form-label">Response Deadline date from</label>
                                    <input value={requestParams.rdlfrom?.toISOString().split("T")[0]} onChange={handleInputChange}  type="date" className="form-control" id="rdlfrom" name="rdlfrom"/>
                                </div>
                                <div className="mb-3">  
                                    <label htmlFor="rdlto" className="form-label">Response Deadline date to</label>
                                    <input value={requestParams.rdlfrom?.toISOString().split("T")[0] } onChange={handleInputChange}  type="date" className="form-control" id="rdlto" name="rdlto" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="limit" className="form-label">Total number of records to be retrieved per page.</label>
                                    <input value={requestParams.limit || 25} onChange={handleInputChange} type="number" className="form-control" id="limit" name="limit" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="offset" className="form-label">Indicates the page index.</label>
                                    <input value={requestParams.offset || 0} onChange={handleInputChange} type="number" className="form-control" id="offset" name="offset" />
                                </div>
                                
                            </form>
                        </div>
                    </div>
                    <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
                </div>
            </div>
            {isLoading ? (<>
            
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                            
            </>): (<>
            {message && <p className="text-danger mt-2">{message}</p>}
            <div className="content container">
                <div className="head-content d-flex justify-content-between">
                    <div className="number-resutl">
                        <p className="fs-6">Showing {requestParams.offset? requestParams.offset +  1: 0}-{requestParams.limit}  of {totalRecords} results</p>
                    </div>
                    <div className="sort-by">
                         <span className="sort-text">Sort by</span>
                        <button className="sort-btn">Date Modified/Update <i className="bi bi-caret-down"></i></button>
                    </div>
                </div>
                {opportinities.map((oppertunity) => (

                
                <div className="content-item container">
                    <div className="row">
                        <div className="left-portion col-9 p-3">'
                            <h5 className="text-primary">{oppertunity.fullParentPathName}</h5>
                            <h6 className="text-black text-uppercase">NOTICE ID: {oppertunity.noticeId}</h6>
                            <p className="text-body">{oppertunity.title}</p>
                            <div className="office-content d-flex justify-content-between">
                                <div className="office-content-item">
                                    <span className="text-body">Type of an organization</span>
                                    <h6 className="text-info text-uppercase">{oppertunity.organizationType}</h6>
                                </div>
                                <div className="office-content-item">
                                    <span className="text-body">Resource</span>
                                    <a style={{display:"block"}} href={oppertunity.uiLink} className="text-info">{oppertunity.uiLink}</a>
                                </div>
                                <div className="office-content-item">
                                    <span className="text-body">Address Office</span>
                                    <h6 className="text-info text-uppercase">{`${oppertunity.officeAddress.zipcode} , ${oppertunity.officeAddress.city}, ${oppertunity.officeAddress.countryCode}`}</h6>
                                </div>
                            </div>
                        </div>
                        <div className="right-portion col-3 p-3">
                            <button className="button-contract">Contract opportunity</button>
                            <div className="right-portion-item">
                                <span className="text-body">Current response date</span>
                                <h6 className="text-black ">{formatDateString((new Date()).toISOString().split("T")[0])}</h6>
                            </div>
                            <div className="right-portion-item">
                                <span className="text-body">Notice type</span>  
                                <h6 className="text-black ">{oppertunity.baseType}</h6>
                            </div>
                            <div className="right-portion-item">
                                <span className="text-body">Oppertunity posted date</span>
                                <h6 className="text-black ">{formatDateString(oppertunity.postedDate)}</h6>
                            </div>
                            <div className="right-portion-item">
                                <span className="text-body">Response deadline date</span>
                                <h6 className="text-black ">{oppertunity.responseDeadLine? formatDateString(oppertunity.responseDeadLine.split("T")[0]): null}</h6>
                            </div>
                        </div>
                    </div>
                    

                </div>

                ))}

            </div>
            </>)}
        </div>
    )

}
export default MainLayout;