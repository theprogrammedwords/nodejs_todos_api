// File: app.js
const http = require('http');
const port = 8081;

let todoList = ["Complete Node Byte", "Play Cricket"];

http.createServer((request, response) => {
    const { method, url } = request;

    if (url == "/todos") {

        /* Get all TODOS:   
        ** curl -v http://localhost:8081/todos
        */
        if (method === "GET") {
            response.writeHead(200);
            response.write(todoList.toString())

        }
        /* Add a TODO to the list
        ** curl -v -X POST -d '{"name":"Plan for next week"}' http://localhost:8081/todos -H 'content-type:application/json'
        */
        else if (method === "POST") {
            let body = '';

            request.on('error', (err) => {
                console.error(err);

            }).on('data', (chunk) => {
                body += chunk;

            }).on('end', () => {
                body = JSON.parse(body);
                let newTodo = body.name
                todoList.push(newTodo)

                response.writeHead(201);
            });

        } 
        /* Delete a TODO to the list
        ** curl -v -X DELETE -d '{"name":"Play Cricket"}' http://localhost:8081/todos
        */
        else if (method === "DELETE") {
            let body = '';
            request.on('error', (err) => {
                console.error(err);

            }).on('data', (chunk) => {
                body += chunk;

            }).on('end', () => {
                body = JSON.parse(body);
                let deleteTodo = body.name;
                for (let i = 0; i < todoList.length; i++) {
                    if (todoList[i] === deleteTodo) {
                        todoList.splice(i, 1);
                    }
                }

                response.writeHead(204);
            });

        } else {
            response.writeHead(501);
        }

    } else {
        response.writeHead(404);
    }

    response.end();

}).listen(port, () => {
    console.log(`Nodejs server started on port ${port}`)
});


// // Set response status code and response headers
// response.writeHead(200);

// // Set response body i.e, data to be sent
// response.write('<h1>TODO</h1>');

// response.write(`<ul>`);
// todoList.forEach( (todo) => {
//     response.write(`<li>${todo}</li>`)
// })
// response.write(`</ul>`);

// response.write('<p>Created by: Crio.Do</p>');
