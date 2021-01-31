var config = {};

config.port = 8060;
config.cluster = {};
config.cluster.name = 'minikube';
config.cluster.server = 'https://192.168.99.100:8443';
config.cluster.certFilePath = '/home/achoudhuri/.minikube/ca.crt';

module.exports = config;