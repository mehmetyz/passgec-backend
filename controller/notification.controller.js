const uuidv4 = require('uuidv4');
const repository = require('../repository/notification.repository');

const create = async (req, res) => {
   
    const entity = req.body;
    
    const notification = {
        id: uuidv4.uuid(),
        userId: entity.userId,
        type: entity.type,
        title: entity.title,
        text: entity.text,
        time: Date.now()
    };

    await repository.save(notification);

    res.status(200).json({
        message: 'Notification created',
        notificationId: notification.id
    });
}

const findByUserId = async (req, res) => {
    const userId = req.params.userId;
    const notifications = (await repository.findAll()).filter(notification => notification.userId === userId);
    
    if(!notifications) {
        return res.status(401).json({
            message: 'Notifications not found'
        });
    }

    res.status(200).json({
        notifications
    });
}

const find = async (req, res) => {
    const id = req.params.id;

    const notification = await repository.find(id);

    if(!notification) {
        return res.status(401).json({
            message: 'Notification not found'
        });
    }

    res.status(200).json({
        notification
    });
}


const update = async (req, res) => {
    const id = req.params.id;
    const entity = req.body;

    const notification = await repository.find(id);

    if(!notification) {
        return res.status(401).json({
            message: 'Notification not found'
        });
    }

    const newNotification = {
        _id: notification._id,
        id: notification.id,
        userId: notification.userId,
        type: entity.type || notification.type,
        title: entity.title || notification.title,
        text: entity.text || notification.text,
        time: notification.time
    };

    await repository.update(newNotification);

    res.status(200).json({
        message: 'Notification updated'
    });
}

const remove = async (req, res) => {
    const id = req.params.id;

    const notification = await repository.find(id);

    if(!notification) {
        return res.status(401).json({
            message: 'Notification not found'
        });
    }

    await repository.remove(notification.id);

    res.status(200).json({
        message: 'Notification removed'
    });
}

module.exports = {
    create,
    findByUserId,
    find,
    update,
    remove
}