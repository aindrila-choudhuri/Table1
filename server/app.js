const express = require("express");
const k8s = require('@kubernetes/client-node');
const cors = require('cors')
const moment = require("moment");

const app = express();
app.use(cors())

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

app.get("/", (req, res1) => {
    k8sApi.listPodForAllNamespaces('default').then((res) => {
        const resBody = JSON.parse(JSON.stringify(res.body));

        let resArr = [];

        if (resBody.items && resBody.items.length) {
            resBody.items.forEach((item) => {
                //console.log(item.metadata.name)
                let resObj = {};

                resObj.name = item && item.metadata && item.metadata.name ? item.metadata.name : "";
                resObj.nameSpace = item && item.metadata && item.metadata.namespace ? item.metadata.namespace : "";
                resObj.status = item && item.status && item.status.phase ? item.status.phase : "";
                resObj.age = item && item.metadata && item.metadata.creationTimestamp ? 
                                moment(item.metadata.creationTimestamp).format('DD MMM YYYY, h:mm:ss a') : "";
                //resObj.uid = item && item.metadata && item.metadata.uid ? item.metadata.uid : "";
                resArr.push(resObj);
            });
        }

        res1.json(resArr)
    });
})

app.listen(3001, () => console.log("app is running"))