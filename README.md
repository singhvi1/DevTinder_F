# 1.DEVTINDER  

    -create a vite + React application
    -Remove uneccssary code
    -Installed Tailwind and DaisyUi
    -Add NavBar footer components rend in Body -> body in app.jsx
    -Install React-router dom
    -Create BrowserRouter > routes >route=/body >routeChildren
    -create outlet in our body for children
    -create a footer
    

    <!-- DevTinder part 2 -->
    
    -Create a loginPage 
    -Install Axios
    -Install CORS in beckend => add middleWare with configuration :origin, credentials(?)
    -whenevre we are calling api call set cred..:true(?) -> axios(..,{credential:true (?)})
    -Install npm install @reduxjs/toolkit react-redux
    -create store(configureStore)=> provider=> userSlice(createSlice)=>add reducer to store-> user:userReducer
    - useDispatch and dispatch(addUser(..))
    -NavBar should update as soon as user login
    -navigate as login to / as / render feedComponent


    <!--DevTinder part 3 -->
    -we should not access other routes without login
    -if token is not present, redirect user to login page
    -logout  feature 
    -get the feed and add the feed in the store 
    -build the user card on feed  user[0]
    -Edit Profile feature
    -show Toast Message on save of profile
    -New Page -See all my connections
    -New page -See all my conections request pending
    -Feature -Accept/Reject Connection Request
    -send request :interested or :ignored 
    -Signup form 
    -BUG : feed data when user changes 
    -feed filter silce : update feedSlice to update after action
    -Fix signup too after signUp token genrated auto for login
    -Bug fix : when no user / to /login and { replace: true } in navigate