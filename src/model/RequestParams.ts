interface RequestParams{
    solnum?: string,
    title: string,
    noticeid? : string,
    postedFrom: Date, 
    postedTo: Date, 
    state?: string,
    status? : string, 
    zip?: string,
    organizationCode?  : string, 
    organizationName? : string, 
    ccode? : string, 
    rdlfrom? : Date, 
    rdlto? : Date, 
    limit?: number, 
    offset? : number
}
export default RequestParams;   