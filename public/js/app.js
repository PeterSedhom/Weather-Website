 console.log("This is a client side js file")

 const fetching = (loc, message1, message2) => {
    fetch(`/weather?address=${encodeURIComponent(loc)}`).then((res) => {
     res.json().then((data) => {
         if(data.error)
            return message1.textContent = data.error
        
        message1.textContent = data.location
        message2.textContent = data.forecast
     })
 })
 }
 

 const weatherForm = document.querySelector('form')
 const search = document.querySelector('input') 
 const message1 = document.querySelector('#message-1')
 const message2 = document.querySelector('#message-2')

 weatherForm.addEventListener('submit', (e) => {
     e.preventDefault()
     const location = search.value  
     message1.textContent = "Loading..."
     message2.textContent = ""
     fetching(location, message1, message2)
 })