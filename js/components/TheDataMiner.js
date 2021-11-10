// a callback is a reference to another function that gets called at a certain point in your programming flow
// params is the object we're passing in that contains an id or another bit of data. it looks like this: {id: 1} or { id:1, name:"Trevor", role: "prof" } => needs to become this: id=1&&name=Trevor
function getData(params, cb) {
    // cb is for callback, way to run a function we want.
    // params = paramaters so if we want to do paramaters we can pass them in 

    // use the Fetch API to retrieve some data
    let baseURL = "./includes/index.php";

    if (params) {
        let keys = Object.keys(params); // takes an object and creates an array of the keys ["id", "name"]

        // look at the MDN reference for Array.map to see what it does
        // it just re-uses the values however you like -> in this case we're building some text
        let newQStringParams = keys.map(key => `${key}=${params[key]}`).join("&&");

        baseURL += `?${newQStringParams}`;
    }    
    
    fetch(baseURL)
    .then(res => res.json()) // unpack the API response (turn it back into plain JS)
    .then(data => {
        // do anything else here that we want with our data
        // call a function to generate our dynamic content
        cb(data[0]);
    })
    .catch(error => console.error(error)); // catch and report any errors
}

export { getData }
