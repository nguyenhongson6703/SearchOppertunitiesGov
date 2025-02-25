import axios from "axios";
import RequestParams from "../model/RequestParams";
import { formatDate } from "../utils/utils";
import Key from "../model/key";

const URL_opportunities = "https://api.sam.gov/opportunities/v2/search";
export const fetchOpportunity = async (params : RequestParams) => {
    try{
        const response = await axios.get(URL_opportunities, {
            params: {
                solnum: params.solnum || "", 
                title: params.title, 
                noticeid: params.noticeid || "", 
                postedFrom: formatDate(params.postedFrom), 
                postedTo: formatDate(params.postedTo),
                state: params.state || "", 
                status: params.state || "", 
                zip: params.zip || "", 
                organizationCode: params.organizationCode || "", 
                organizationName: params.organizationName || "", 
                ccode: params.ccode || "", 
                rdlfrom: params.rdlfrom ? formatDate(params.rdlfrom) : "", 
                rdlto: params.rdlto ? formatDate(params.rdlto) : "",
                limit: params.limit || 25, 
                offset: params.offset || 0,
                api_key: Key
            }
        });
        return response.data;


    }catch(error){
        console.log("Error fetching opportunities", error);
            throw error;
    }
}