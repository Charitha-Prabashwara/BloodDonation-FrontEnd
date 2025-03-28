import React, {useState, useEffect} from "react";
import { fetchTestData } from "../api/api.test";


function ApiTest(){
    const[data, setData] = useState(null);
    const[error, setError] = useState(null);
    
    useEffect(()=>{
        const getData = async()=>{
            try {
                const result = await fetchTestData();
                setData(result);
            } catch (error) {
                setError(error.message)
            }
        }
        getData();
    }, [])
    

    return(
        <>
            <div>
                <h1>Test Page</h1>
                {error && <p style={{ color: 'red' }}>Error: {error}</p>}
                {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>Loading...</p>}
            </div>

        </>
    );

}

export default ApiTest