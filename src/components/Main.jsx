

import React, { useEffect, useState } from 'react'
import OrchidsPresentation from './OrchidsPresentation';
export default function Main() {
  const [api, setAPI] = useState([])
  const baseURL = 'https://670ddcdb073307b4ee44b093.mockapi.io/OrchidResources'
  
 const fetchAPI = ()=>{
  fetch(baseURL + '?sortBy=id&order=asc')
 .then(resp => resp.json())
 .then(data => setAPI(data))
 .catch(err => console.error(err))
}
useEffect(() => {
  fetchAPI()
}, []);


  return (
    <>
    <OrchidsPresentation orchidData={api}/>
    </>
  )
}

