//Create web server
const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Read json file
let comments = JSON.parse(fs.readFileSync(path.join(__dirname, 'comments.json')));

//Read comments
app.get('/comments', (req, res) => {
    res.send(comments);
});

//Create comment
app.post('/comments', (req, res) => {
    let comment = {
        id: comments.length + 1,
        name: req.body.name,
        comment: req.body.comment
    };
    comments.push(comment);
    fs.writeFileSync(path.join(__dirname, 'comments.json'), JSON.stringify(comments));
    res.redirect('http://localhost:3000');
});

//Delete comment
app.delete('/comments/:id', (req, res) => {
    let comment = comments.find(item => item.id == req.params.id);
    let index = comments.indexOf(comment);
    comments.splice(index, 1);
    fs.writeFileSync(path.join(__dirname, 'comments.json'), JSON.stringify(comments));
    res.redirect('http://localhost:3000');
});

//Update comment
app.put('/comments/:id', (req, res) => {
    let comment = comments.find(item => item.id == req.params.id);
    comment.name = req.body.name;
    comment.comment = req.body.comment;
    fs.writeFileSync(path.join(__dirname, 'comments.json'), JSON.stringify(comments));
    res.redirect('http://localhost:3000');
});

//Start server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});