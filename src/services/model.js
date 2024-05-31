
 function makeService(){
    async function makeRequest(form){
        const url = '/api/model/request'
        const option = {
            method:"POST",
            body:form
        }
        return await fetch(url,option).then(res => res.json())
    }
    return {
        makeRequest
    }
}

export default makeService()