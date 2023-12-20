export default class APIService {

    static GetRoutesWithRiskScore(source, destination) {
        if(source === '' || destination === ''){
            alert("Please enter valid source and destination.")
            return
        }
        const queryParams = new URLSearchParams({ source, destination }).toString();
        return fetch(`http://127.0.0.1:5000/get-routes-risk-score?${queryParams}`, {
            'method': 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(resp => resp.json())
    }
    
    static GetSafestRoute(source, destination) {
        if(source === '' || destination === ''){
            alert("Please enter valid source and destination.")
            return
        }
        const queryParams = new URLSearchParams({ source, destination }).toString();
        return fetch(`http://127.0.0.1:5000/get-safest-route?${queryParams}`, {
            'method': 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(resp => resp.json())
    }
}