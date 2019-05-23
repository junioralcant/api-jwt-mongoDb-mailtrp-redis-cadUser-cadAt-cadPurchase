const kue = require('kue');
const Sentry = require('@sentry/node');
const redisConfig = require('../../config/redis');
const jobs = require('../jobs'); 

const Queue = kue.createQueue({ redis: redisConfig });

Queue.process(jobs.PurchaseMail.key, jobs.PurchaseMail.handle); // diz pro node processar a fila para todos o jobs que tem a key em questão, que é o metodo key da class PurchaseMail. E chama o metodo handle da class PurchaseMail se estiver com a key em questão

Queue.on('error', Sentry.captureException); // para tratar erros das  nossa filas no ambiente de produção 

module.exports = Queue;
