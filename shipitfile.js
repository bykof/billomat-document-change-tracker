module.exports = function (shipit) {
  shipit.initConfig({
    staging: {
      servers: '35.190.196.235',
      workspace: '/var/www/backend'
    }
  });
  
  shipit.blTask('compile', function () {
    return shipit.local('babel app -d dist');
  });
  
  shipit.blTask('move', function () {
    return shipit.remoteCopy('./', '/var/www/backend');
  });
  
  shipit.blTask('install', function () {
    return shipit.remote('npm install', {cwd: '/var/www/backend'});
  });
  
  shipit.blTask('restart', function () {
    return shipit.remote('sudo systemctl restart backend');
  });
  
  
  shipit.task('deploy', function () {
    shipit.start(['compile', 'move', 'install', 'restart']);
  });
};