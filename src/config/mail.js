module.exports = {
    host:  process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: false, // se vai ser enviado com segurança. por padrão esta false
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
};