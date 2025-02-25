
export interface OfficeAddress{
    zipcode?: string;
    city:   string;
    countryCode: string;
    state: string;
}
export interface Opportunity{
    noticeId: string;
    fullParentPathName: string;
    baseType: string;
    title: string;
    organizationType: string;
    uiLink: string;
    officeAddress: OfficeAddress;
    postedDate: string;
    responseDeadLine: string;
}