const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.env.PORT || 5000;
const authRoutes = require('./routes/authRoutes');  
const userRoutes = require('./routes/userRoutes');  
const app = express();

app.use(cors());
app.use(bodyParser.json());

const apiRouter = express.Router(); 

apiRouter.use('/auth', authRoutes); 
apiRouter.use('/users', userRoutes);  

app.use('/api', apiRouter); 

app.get('/', (req, res) => {
    res.send('Welcome to the Backend!');
});

app.listen(port, () => {
    console.log(`Server is running on Port ${process.env.PORT}.`);
});