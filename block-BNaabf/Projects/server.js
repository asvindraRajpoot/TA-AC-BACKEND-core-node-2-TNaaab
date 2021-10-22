// Write code to
//   - get relative path of `index.js` 
//   - get absolute path of `index.js`

// var path= require('path');
// console.log('./client/index.js');
// console.log(path.join(__dirname,'/client/index.js'));

// Create a basic http server which should grab data from a HTML form rendered on a specific route and display the content on a seperate page.
var http=require('http');
var server=http.createServer(handleRequest);
var fs=require('fs')
var qs=require('querystring');
function handleRequest(req,res){
    if(req.method==='GET' && req.url==='/form'){
        console.log('it is inside get method')
        res.writeHead(202,{'content-type':'text/html'});
        var formData=fs.createReadStream('./form.html','utf-8').pipe(res);
       
    }else if(req.method==='POST' && req.url=='/form'){
        console.log('it is inside post method');
        var store='';
        req.on('data',(chunk)=>{
            store+=chunk;

        })
        req.on('end',()=>{
            var dataFormat=req.headers['content-type']
            if(dataFormat==='application/x-www-form-urlencoded'){
                console.log(store);
                var parsedData=qs.parse(store);
                console.log(parsedData);
                res.writeHead(202,{'content-type':'text/html'})
                res.end(`name:<h2>${parsedData.name}</h2>email:<h2>${parsedData.email}</h2>age:<h2>${parsedData.age}</h2>`)

            }
           
        })

    }else{
        res.end('Page not found')
      
    }


}
server.listen(5678,()=>{
    console.log('Server is listening at port 5678');

})
// Folder structure is:-

// Project folder
//   - server.js
//   - form.html(html form)

// form.html is a basic html form with multiple inputs. Each input except input of `type=submit` must contain `name` attribute which is the key for value submitted on that specific input.
// - name
// - email
// - age

// lastly also add an `input type=submit` to submit the form

// Write code inside `server.js` to
// - create a basic server
// - add listener on port 5678
// - display the form.html page on `/form` route using `GET` http method
// - once the form is submitted, capture the data on server side using `data/end` event on request object
// - make sure to add `method` and `action` attribute to `HTML form` in form.html
// - send captured data in response as html page 

// You have to basically handle 2 routes
// 1. to display the form data -> GET on `/form` route
// 2. to capture data from form and display it -> POST on `/form` route

// ##### Note:-
// - action attribute determines the route which will be requested on server side
// - method defines HTTP method used to submit the form(ideally POST)