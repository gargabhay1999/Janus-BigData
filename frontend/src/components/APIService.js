export default class APIService {

    static GetRoutesWithRiskScore(source, destination) {
        // if(source === '' || destination === ''){
        //     alert("Please enter valid source and destination.")
        //     return
        // }
        // source = "Latourette Park"
        // destination = "New Springville"
        // alert(source + destination)
        const queryParams = new URLSearchParams({ source, destination }).toString();
        return fetch(`http://127.0.0.1:5000/get-routes-risk-score?${queryParams}`, {
            'method': 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(resp => resp.json())
    }    
}