
 function makeService(){
    const headers = {
        "Content-type":"appilication/json"
    }
    async function makeRequest(form){
        const url = '/api/model/request'
        const option = {
            method:"POST",
            body:form
        }
        return await fetch(url,option).then(res => res.json())
    }
   

    async function get_all_model(){
        const url = '/api/model/get_all_model'
        const option = {
            headers:headers,
            method:"GET",
        }
        return await fetch(url,option).then(res => res.json())
    }

    async function get_active_model(){
        const url = '/api/model/get_active_model'
        const option = {
            headers:headers,
            method:"GET",
        }
        return await fetch(url,option).then(res => res.json())
    }

    return {
        makeRequest,
        get_all_model,
        get_active_model
    }
}

export default makeService()