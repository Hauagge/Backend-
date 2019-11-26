const express = require('express');
const bcrypt = require('bcryptjs');


const User = require('../model/user');

const router = express.Router();

router.post('/register', async (req, res) => {
    const  usuario  = req.body;
    console.log(usuario);
    try {
        
        if (await User.findOne({ usuario }))
            return res.status(400).send({ error: 'Este usuário ja existe!' });


        const user = await User.create(req.body);
        user.senha = undefined;
        return res.send({ user });

    } catch (err) {
        console.log(err)
        return res.status(400).send({ error: 'Falha ao tentar criar cadastro' })
    }
});

router.post('/login', async (req, res) => {
    const usuario = req.body;
    const user = await User.findOne({ user : usuario.user }).select('+senha');
    console.log(user)
    if (!user)
        return res.status(400).send({ error: 'Usuário não existe' });



    if (!await bcrypt.compare(usuario.senha, user.senha))
        return res.status(400).send({ error: 'Senha incorreta' });

    res.send({ user })
});

module.exports = app => app.use('/', router); 