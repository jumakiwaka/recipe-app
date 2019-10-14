const Item = require('../models/productSchema');
const fs = require('fs');

exports.getAllProducts = (req, res, next) => {
    Item.find().then((product) => {
        res.status(200).json(product);
    }).catch((error) => {
        res.status(400).json({
            error,
        })
    })
    //next();
}

exports.addProducts = (req, res) => {
    req.body.thing = JSON.parse(req.body.thing);
    const url = req.protocol + '://' + req.get('host');
    const item = new Item({
        title: req.body.thing.title,
        description: req.body.thing.description,
        imageUrl: url + '/images/' + req.file.filename,
        userId: req.body.thing.userId,
        price: req.body.thing.price,
    });
    item.save().then(() => {
        res.status(201).json({
            message: 'Saved to db successfully!'
        });
    }).catch((error) => {
        res.status(400).json({
            message: 'Saving to db failed!'
        });
    })
};

exports.deleteProduct = (req, res, next) => {
    const { id } = req.params;
    Item.findOne({ _id: id }).then(
        (product) => {
            const filename = product.imageUrl.split('/images/')[1];
            fs.unlink('images/' + filename, () => {
                Item.deleteOne({
                    _id: id
                }).then(() => {
                    res.status(200).json({
                        message: 'Item deleted successfully!',
                    });
                }).catch((error) => {
                    res.status(400).json({
                        error
                    });
                });
            })
        }
    )

    // next();
};

exports.updateProduct = (req, res, next) => {
    const { id } = req.params;
    let product = new Item({ _id: id });
    if (req.file) {
        req.body.thing = JSON.parse(req.body.thing);
        const url = req.protocol + '://' + req.get('host');
        product = {
            _id: id,
            title: req.body.thing.title,
            description: req.body.thing.description,
            imageUrl: url + '/images/' + req.file.filename,
            userId: req.body.thing.userId,
            price: req.body.thing.price,
        };
    } else {
        product = {
            _id: id,
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            imageUrl: req.body.imageUrl,
            userId: req.body.userId
        }
    }

    Item.updateOne({ _id: id }, product).then(() => {
        res.status(200).json({
            message: 'Db updated successfully!',
        });
    }).catch((error) => {
        res.status(400).json({
            error,
        })
    });
    // next();
};

exports.getOneProduct = (req, res, next) => {
    const { id } = req.params;
    Item.findOne({
        _id: id,
    }).then((product) => {
        res.status(200).json(product);
    }).catch((error) => {
        res.status(400).json(error);
    });
    // next();
};