
const express = require('express');
const mongoose = require('mongoose');
const uploadRoute = require('./upload');    
const apiRoute = require('./routes/api');
require('dotenv').config();
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true})
    .then(() => console.log('mongodb running on 27017'))
    .catch(err => console.log(err))

const app = express();
app.use(express.json());

//Task-1
// Use routes
app.use('/upload', uploadRoute);  
app.use('/api', apiRoute); 
//Policy Info -  policy number, policy start date, policy end date, policy category- collection id, company collection id, and user id.
app.use('/api/agents', require('./routes/agent'));
app.use('/api/users', require('./routes/user'));
app.use('/api/accounts', require('./routes/account'));
app.use('/api/lobs', require('./routes/lob'));
app.use('/api/carriers', require('./routes/carrier'));
app.use('/api/policies', require('./routes/policy'));

//Task -2
require('./monitor');
const messageRoute = require('./routes/message');
app.use('/api', messageRoute); 



app.listen(process.env.PORT || 3000, function() {
	console.log('Express app running on port ' + (process.env.PORT || 3000))
});

