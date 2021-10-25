const router = require('express').Router();
const { proxy } = require('./controllers');

router.get('/ping', async function(req, res){
  res.json({ok: true, message: 'ok'});
});

router.post('/*', proxy); // auth.login: /Login/NuiLogin.aspx?ntlmlogin
router.get('/0/ServiceModel/EntityDataService.svc/:entityName', proxy); // api.getData
router.get('/0/img/entity/hash/SysImage/Data/:id', proxy); // img
router.get('/0/rest/UsrCustomConfigurationService/:getRequest', proxy);

module.exports = router
