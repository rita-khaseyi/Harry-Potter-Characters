
export const getMovies =async() =>{
    try{
    const response = await fetch (`/api/get-characters`,{
        method:'GET',
      
    })
    const result = await response.json();
    return result;
    }
    catch(error){
        return error;
    }
    }