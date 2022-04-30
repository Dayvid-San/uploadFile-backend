const multer = require('multer')
const path = require('path')
const crypto = require('crypto') // também está dentro do node
const multerS3 = require('multer-s3')
const aws = require('aws-sdk')


// O storages salvas os arquivos
const storageTypes = {
    local: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve(__dirname, '..', '..', 'tmp', 'uploads'))
        },
        filename: (req, file, cb) => {
            // aqui nós garantimos que as imagens não tem o mesmo nome
            crypto.randomBytes(16, (err, hash) => {
                if (err) cb(err);

                file.key = `${hash.toString('hex')}-${file.originalname}`;

                cb(null, fileName);
            })
        },
    }),
    s3: multerS3({
        s3: new aws.S3(),
        bucket: 'nome do banco de uploads',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: 'public-read',  // Para que todos os arquivos salvos na AWS sejam publicos
        key: (req, file, cb) => {
            crypto.randomBytes(16, (err, hash) => {
                if (err) cb(err);

                const fileNmae = `${hash.toString('hex')}-${file.originalname}`;

                cb(null, fileName);
            })
        }
    })
}

module.exports = {
    dest: path.resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    storage: storageTypes['local'],
    limits: {
        // configurando os limites do celular
        fileSize: 2 * 1024 * 1024,
    },
    fileFilter: (req, file, cb) => {
        // Para filtrar o upload de arquivos
        const allowedMimes = [
            'image/jpeg',
            'image/pjpeg',
            'image/png',
            'image/gif'
        ];

        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        
        }
        else {
            cb(new Error('Invalid file type.'))
        }
    },
}