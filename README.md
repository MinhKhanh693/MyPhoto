# Mini project

react-router-dom

/login
/admin : layout

/admin/\*
feature : /admin/dashboard
feature : /admin/students

auth / authentication
-login
-sign up / register
-forget password


CLick login
- Call api to login 
- Success -> redirect ADMIn 
- FAILED -> Show ERROR

login 
logout

authSaga
- if logged in , watch LOGOUT
- else watch LOGIN

LOGIN
- call login Api to get token + user info
- set token to local storage
- redirect to admin page
LOGOUT
- clear token from local storage
- redirect to login page

auth slice 
auth Saga
"# MyPhoto" 
