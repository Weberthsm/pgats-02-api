# banco-api-performance
Realiza teste de performance em API utilizando K6

Teste getTransfers:


Teste login:

Teste usersRegister: 
K6_WEB_DASHBOARD=true K6_WEB_DASHBOARD_EXPORT=html-report.html k6 run tests/usersRegister.test.js

K6_WEB_DASHBOARD=true K6_WEB_DASHBOARD_EXPORT=html-report.html k6 run tests/login.test.js

Teste transfers post:
K6_WEB_DASHBOARD=true K6_WEB_DASHBOARD_EXPORT=html-report.html k6 run tests/transfers.test.js

teste getTransfers:
K6_WEB_DASHBOARD=true K6_WEB_DASHBOARD_EXPORT=html-report.html k6 run tests/getTransfers.test.js

Teste  getUsers:
K6_WEB_DASHBOARD=true K6_WEB_DASHBOARD_EXPORT=html-report.html k6 run tests/getUsers.test.js