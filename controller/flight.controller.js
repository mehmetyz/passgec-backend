const uuidv4 = require('uuidv4');
const repository = require('../repository/flight.repository');


const create = async (req, res) => {
    const entity = req.body;

    const flight = {
        id: uuidv4.uuid(),
        userId: entity.userId,
        ...entity
    }

    const isExist = (await repository.findAll()).find(f => f.PNR === flight.PNR);
    
    if(isExist)
        return res.status(401).json({
            message: "Flight already exist"
        });
        


    await repository.save(flight);

    require('../repository/notification.repository').save({
        id: uuidv4.uuid(),
        userId: flight.userId,
        type: 'flight',
        title: 'Flight Created',
        text: `[PNR : ${flight.PNR}] Flight: ${flight.DepartureLocation} - ${flight.ArrivalLocation}`,
        time: Date.now()
    });

    res.status(200).json({
        message: "Flight Information Added Successfully",
        flightId: flight.id
    });
}

const findByUserId = async (req, res) => {
    const userId = req.params.userId;
    const flights = (await repository.findAll())
                    .filter(flight => flight.userId === userId);

    if(!flights || !flights.length)
        return res.status(401).json({
            message: "Flights not found"
        });

    res.status(200).json({
        flights
    });
}

const find = async (req, res) => {
    const id = req.params.id;

    const flight = await repository.find(id);

    if(!flight)
        return res.status(401).json({
            message: "Flight not found"
        });

    res.status(200).json({
        flight
    });
}

const update = async (req, res) => {

    const id = req.params.id;
    const entity = req.body;

    const flight = await repository.find(id);

    if(!flight)
        return res.status(401).json({
            message: "Flight not found"
        });
    
    await repository.update(id, entity);

    res.status(200).json({
        message: "Flight Information Updated Successfully"
    });
}


const remove = async (req, res) => {
    const id = req.params.id;

    const flight = await repository.find(id);

    if(!flight)
        return res.status(401).json({
            message: "Flight not found"
        });
    
    await repository.remove(id);

    res.status(200).json({
        message: "Flight Information Removed Successfully"
    });
}


module.exports = {
    create,
    findByUserId,
    find,
    update,
    remove
}