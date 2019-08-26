// Import the required libraries
let express = require("express");
let router = express.Router();

// Initialize the DB
let db = [];

// Home page
router.get("/", function(req, res){
    res.send("Home Page")
});

// Listing all the items
router.get("/listAllItems", function(req, res){
    res.send(generateList());
})

// Listing all the items
router.get("/listAllItems", function(req, res){
    res.send("generateList()");
})

// Adding an item
router.get("/newItem/:name/:quantity/:price", function(req, res){
    db.push({
        id: Math.round(Math.random()*1000),
        name: req.params.name,
        quantity: req.params.quantity,
        price: req.params.price
    })

    res.send("Item has been added to the database.");
});

// Get total value
router.get("/totalValue", function(req,res){
    let total = 0; 
    for (let i = 0; i < db.length; i++) {
        total += db[i].quantity * db[i].price;
    }
    res.send("Total Value of the Warehouse is " + total);
});

// deleting an item using id
router.get("/deleteItem/:deleteID", function(req, res){
    const deleteID = req.params.deleteID;
    if (deleteRecord(deleteID)){
        res.send("Record deleted.");
    }
    else{
        res.send("Record does not exist.");
    }
})

// function that displays the contents of the database
const generateList = () => {
    let st = 'Id    Name    Quantity    Price   Cost</br>';
    for (let i = 0; i < db.length; i++) {
        st += db[i].id + ' | ' + db[i].name + ' | ' + db[i].quantity + ' | ' + db[i].price + ' | ' 
        + (db[i].quantity * db[i].price) + '</br>';
    }
    return st;
}

// function that deletes an item from a database based on the id given, and returns true if the item is deleted
// false otherwise
const deleteRecord = (id) => {
    for (let i = 0; i < db.length; i++){
        if (db[i].id == id) {
            db.splice(i, 1);
            return true;
        }
    }
    return false;
}




// exporting the router 
module.exports = router;