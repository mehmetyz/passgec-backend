const uuidv4 = require('uuidv4');
const { generate } = require('../auth/jwt');
const { compare, hash } = require('../auth/password');
const repository = require('../repository/user.repository');

const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await repository.findByEmail(email);

    if(!user) {
        return res.status(401).json({
            message: 'User not found'
        });
    }

    const isValid = await compare(password, user.password);

    if(!isValid) {
        return res.status(401).json({
            message: 'Invalid password'
        });
    }

    delete user.image;
    const token = await generate(user);

    res.status(200).json({
        token
    });
}

const register = async (req, res) => {
    const { fullname, email, password } = req.body;

    const user = await repository.findByEmail(email);

    if(user) {
        return res.status(401).json({
            message: 'User already exists'
        });
    }

    const id = uuidv4.uuid();
    const newPassword = await hash(password);
    
    const newUser = {
        fullname,
        id,
        email,
        password: newPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
        image:  `https://iili.io/U5nwwg.png`
    };

    await repository.save(newUser);

    res.status(200).json({
        message: 'User created'
    });
}


module.exports = { 
    login,
    register
}