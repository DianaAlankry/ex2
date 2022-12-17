const express = require("express");
const {default: mongoose} = require("mongoose");
const Product = require('./models/Product');
const cors = require("cors");
const bodyParser = require("body-parser");
const methodOverride = require('method-override');

const app = express();

const corsOptions = {
    origin: '*',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json);

app.use(methodOverride('_method'));
app.use(cors(corsOptions))

mongoose.connect('mongodb://localhost:27017/farmStand', {useNewUrlParser: true})
    .then(() => {
        console.log("mongo connection open!!");
    }).catch(err => {
    console.log("no connection start");
})

app.get('/products/new', async (req, res) => {
    res.render('products/new');
})

app.get('/products/:id/edit', async (req, res) => {
    const {id} = req.params;
    const product = await Product.findById(id);
    res.render('products/edit', {product});

})


app.post('/products/:id', async (req, res) => {

    const {id} = req.params;
    const pro = await Product.findByIdAndUpdate(id, req.body, {runValidators: true, new: true})
    res.send(id);
    // res.redirect(`/product/${pro._id}`);
})

app.post('/product/:id', async (req, res) => {
    const {id} = req.params;
    const pro = await Product.findByIdAndDelete(id);
    res.redirect(`/products`);

})

app.post('/products/r', async (req, res) => {
    console.log(req.body);
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(200).send(newProduct.id);
    res.redirect(`/product/${newProduct._id}`);


})

app.get('/products', async (req, res) => {
    const products = await Product.find({});
    res.send(products);
    res.render('products/index', {products});

})
app.get('/product/:id', async (req, res) => {
    const {id} = req.params;
    const product = await Product.findById(id);
    res.render('products/show', {product});

})

app.listen(3000, () => {
    console.log("listening on port 3000!");
})


//************ */

// app.use((req, res) => {

//     console.log("we got a new request");
//     res.send("<h1> we got your request ! thank you </h1>");
// });
// app.get('/', (req, res) => {

//         res.render('home.ejs');
//     });


//     app.get('/search', (req, res) => {

//         const { q } = req.query.split('&');
//         if (!q) {
//             res.send("error this is null");
//         }
//         else {
//             res.send(`this is the ${q[0]}  and ${q[1]} page`);
//         }

//     })

//     app.get('/r/:subreddit', (req, res) => {

//         const { subreddit } = req.params;
//         res.send(`this is my ${subreddit} page`);
//     });

//     app.get('/r/:subreddit/:postid', (req, res) => {

//         const { subreddit, postid } = req.params;
//         res.send(` this is the page of ${subreddit} and ${postid}`);
//     });

//     app.get('/cats', (req, res) => {

//         res.send("<h1> we got your request ! thank you from cats  </h1>");
//     });

//     app.get('/dogs', (req, res) => {

//         res.send("<h1> we got your request ! thank you from dogs </h1>");
//     });

//     app.get('*', (req, res) => {

//         res.send("<h1> i dont know what you want  </h1>");
//     });
    