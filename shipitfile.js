module.exports = function (shipit) {
  shipit.initConfig({
    staging: {
      servers: '35.190.196.235'
    }
  });
  
  shipit.blTask('move', function () {
    return shipit.remoteCopy('./', '/var/www/backend');
  });
  
  shipit.blTask('install', function () {
    return shipit.remote('cd /var/www/backend && npm install');
  });
  
  shipit.blTask('start', function () {
    return shipit.remote('cd /var/www/backend && npm run start-deamon');
  });
  
  
  shipit.task('deploy', function () {
    shipit.start('move');
    shipit.start('install');
    shipit.start('start');
  });
};