const results = async function(id){
    await fetch('https://localhost:44382/api/segmentleaks/'+id)
        .then(response => response.json())
        .then(data => {
            return data;
        })
        .catch(error => {
            console.log('FAILED TO FETCH: error -', error)
        })
}
