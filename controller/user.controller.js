const QRCode = require('qrcode');

const repository = require('../repository/user.repository');
const { hash } = require('../auth/password');
const { uploadImage } = require('../common/image');



const update = async (req, res) => {
    const currentUser = req.user;
    const payload = req.body;
    const user = await repository.find(currentUser.id);

    if(!user) {
        return res.status(401).json({
            message: 'User not found'
        });
    }

    const newPassword = await hash(payload.password);

    const newUser = {
        _id: user._id,
        id: user.id,
        email: payload.email || user.email,
        password: newPassword,
        createdAt: user.createdAt,
        updatedAt: new Date()
    };

    await repository.update(newUser);

    res.status(200).json({
        message: 'User updated'
    });
}


const remove = async (req, res) => {
    const payload = req.user;
    const user = await repository.find(payload.id);

    if(!user) {
        return res.status(401).json({
            message: 'User not found'
        });
    }

    await repository.remove(user.id);

    res.status(200).json({
        message: 'User removed'
    });
}

const details = async (req, res) => {
    const payload = req.user;
    const user = await repository.find(payload.id);

    if(!user) {
        return res.status(401).json({
            message: 'User not found'
        });
    }

    delete user.password;
    delete user._id;

    res.status(200).json({
        user
    });
}

const uploadAvatar = async (req, res) => {
    const payload = req.user;
    const user = await repository.find(payload.id);

    if(!user) {
        return res.status(401).json({
            message: 'User not found'
        });
    }

    const image = req.files['file'].data.toString('base64');
    const response = await uploadImage(image);
    console.log(response.image.url);

    const newUser = {
        ...user,
        updatedAt: new Date(),
        image: response.image.url
    };

    await repository.update(newUser);

    res.status(200).json({
        message: 'User updated'
    });
}

const createQRCode = async (req, res) => {
    const payload = req.user;
    const user = await repository.find(payload.id);
    
    if(!user) {
        return res.status(401).json({
            message: 'User not found'
        });
    }

    const qrCode = `thy>${user.id}`;
    try {
        const qr = await QRCode.toDataURL(qrCode);
        res.status(200).send(`<img src="${qr}"></img>`); // !TODO : change to json
    }
    catch(err) {
        res.status(500).json({
            message: 'Error generating QR code'
        });
    }
}

module.exports = {
    update,
    remove,
    details,
    uploadAvatar,
    createQRCode
}