const mongoose = require('mongoose')
const aws = require('aws-sdk')
const fs = require('fs')
const path = require('path')
// converte função de forma antiga de callbacks para pogramação assincrona para podermos ultilizar promiss no geral
const { promisify } = require('util')  

const s3 = new aws.S3()

const PostSchema = new mongoose.Schema({
    name: String,
    size: Number,
    key: String,
    url: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

PostSchema.pre('save', function() {
    if (!this.url) {
        this.url = `${process.env.APP_URL}/file/${this.key}`
    }
})

PostSchema.pre('remove', function() {
    if (process.env.STORAGE_TYPE == 's3') {
        return s3.deleteObject({

            Bucket: 'uploadexemple2',
            Key: this.key,
            
        })
        .promise()
    }
    else {
        return promisify(fs.uniink)(path.resolve(__dirname, '..', '..', 'tmp', 'upload', this.key))
    }
})

modeules.exports = mongoose.models('Post', PostSchema)