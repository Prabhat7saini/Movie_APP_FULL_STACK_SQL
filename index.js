const express=require("express");
const app=express();
const db=require(`./models`);
const userRoutes=require('./routes/auth')
const movieRoutes=require('./routes/movie');
const cors = require("cors");
const cookieParser = require('cookie-parser')
app.use(express.json());

app.get('/', (req, res) => {
    return res.json({
        success: true,
        message: "your server is up and running...."
    });
});

app.use(
cors({
    origin: 'http://localhost:5173',
    credential: true,
})
);


app.use(cookieParser());

app.use('/api/v1/auth', userRoutes);
app.use('/api/v1/movie',movieRoutes)
db.sequelize.sync({ }) // `force: true` will drop existing tables and recreate them
    .then(() => {
        console.log('Database & tables created!');
    })
    .catch(error => {
        console.error('Error creating database & tables:', error);
    });
    
// db.sequelize.sync().then((req)=>{
    app.listen(8000,()=>{
        console.log(`running`)
    })
// })



