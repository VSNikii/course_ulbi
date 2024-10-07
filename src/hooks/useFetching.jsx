import { useState } from "react";


export function useFetching(callback){
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    
    
    const fetching = async (id) => {
        try {
            setIsLoading(true);
            await callback(id);   
        } catch(e){
            setError(e.message);
        } finally {
            setIsLoading(false);
        }
    }

    return [fetching, isLoading, error];
}