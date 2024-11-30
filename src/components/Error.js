import { useRouteError } from "react-router-dom";

const Error = ()=> {

    // gives an object
    const err = useRouteError();
  
    return (
        <div>
            <h1>Oops! Error</h1>
            <h2>page not found</h2>
            <h3>{err.status}</h3>
            <h3>{err.statusText}</h3>
        </div>
    )
}

export default Error;