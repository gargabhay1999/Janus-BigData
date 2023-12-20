export default class APIService {

    static GetRoutesWithRiskScore(source, destination) {
        if(source === '' || destination === ''){
            alert("Please enter valid source and destination.")
            return
        }
        const queryParams = new URLSearchParams({ source, destination }).toString();
        return fetch(`${process.env.REACT_APP_JANUS_API_HOST}/get-routes-risk-score?${queryParams}`, {
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
        return fetch(`${process.env.REACT_APP_JANUS_API_HOST}/get-safest-route?${queryParams}`, {
            'method': 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(resp => resp.json())
    }
}