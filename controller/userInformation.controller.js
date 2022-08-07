
const repository = require("../repository/userInformation.repository");


const create = async (req, res) => {
    const userId = req.user.id;
    const userInfo = req.body;

    const newUserInfo = {
        id: uuidv4.uuid(),
        userId,
        ...userInfo,
        createdAt: new Date(),
        updatedAt: new Date()
    };
    
    await repository.save(newUserInfo);

    res.status(200).json({
        message: 'User information created'
    });
}

const getUserInformation = async (req, res) => {
    const userId = req.user.id;

    const userInfo = await repository.findByUserId(userId);

    res.status(200).json({
        userInfo
    });
}

const update = async (req, res) => {
    const userId = req.user.id;
    const userInfo = req.body;

    const newUserInfo = {
        id: userInfo.id,
        userId,
        ...userInfo,
        updatedAt: new Date()
    };

    await repository.update(newUserInfo);

    res.status(200).json({
        message: 'User information updated'
    });
}


const remove = async (req, res) => {
    const userId = req.user.id;

    await repository.removeByUserId(userId);

    res.status(200).json({
        message: 'User information removed'
    });
}

