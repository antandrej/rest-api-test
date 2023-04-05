const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

const movies = [
    { id: 1, name: "Movie1", genres: ["Drama", "Horror", "Action"]},
    { id: 2, name: "Movie2", genres: ["Comedy", "Thriller", "Action"]},
    { id: 3, name: "Movie3", genres: ["Biography", "Action", "Drama"]},
    { id: 4, name: "Movie4", genres: ["Musical", "Sci-Fi", "War"]},
]

app.get('/api/movies', (req, res) => {
    res.send(movies);
});

app.get('/api/movies/:id', (req, res) => {
    const movie = movies.find(c => c.id === parseInt(req.params.id));
    if (!movie) return res.status(404).send("The movie with the given id does not exist!")
    res.send(movie);
});

app.post('/api/movies', (req, res) => {
    if(!req.body.name || !req.body.genres) return res.status(400).send("Name and at least one genre of the movie is required !");

    const movie = {
        id: movies.length + 1,
        name: req.body.name,
        genres: req.body.genres
    }
    movies.push(movie);
    res.send(movie);
});

app.put('/api/movies/:id', (req, res) => {
    const movie = movies.find(c => c.id === parseInt(req.params.id));
    if (!movie) return res.status(404).send("The movie with the given id does not exist!")
    
    if(!req.body.name || !req.body.genres) return res.status(400).send("Name and at least one genre of the movie is required !");

    movie.name = req.body.name;
    movie.genres = req.body.genres;

    res.send(movie);
});

app.delete('/api/movies/:id', (req, res) => {
    const movie = movies.find(c => c.id === parseInt(req.params.id));
    if (!movie) return res.status(404).send("The movie with the given id does not exist!")

    const index = movies.indexOf(movie);
    movies.splice(index, 1);

    res.send(movie);
});

const port = process.env.PORT || 3000;
app.listen(3000, () => console.log(`Listening on port ${port} . . .`));