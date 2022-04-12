let houses = require('./db.json')
let houseID = 4
let priceAdjust = 10000


module.exports = {
    getHouses: (req, res) => {
        res.status(200).send(houses)
    }, 
    deleteHouse: (req, res) => {
        let index = houses.findIndex(elem => elem.id === +req.params.id)
        houses.splice(index, 1)
        res.status(200).send(houses)
    },
    createHouse: (req, res) => {
        const {address, price, imageURL} = req.body
        let newHouse = {
            id: houseID,
            address,
            price: +price,
            imageURL
        }
        houses.push(newHouse)
        houseID++
        res.status(200).send(houses)
    },
    updateHouse: (req, res) => {
        let {id} = req.params
        let {type} = req.body
        let index = houses.findIndex(elem => elem.id === +id)

        if (type === 'minus') {
            houses[index].price -= priceAdjust
            res.status(200).send(houses)
        } 
        else if (type === 'plus') {
            houses[index].price += priceAdjust
            res.status(200).send(houses)
        }
        else {
            res.status(400).send('Something went wrong...')
        }
    }
}