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
    -Bug fix : auto feed update 
    -BUG : pagination (beckend BUG)


    <!--DevTinder Season 03 -->
    -signUp on aws
    -lauch aws instance 
    -ssh -i "DevTinder_Secret.pem" ubuntu@ec2-13-60-186-25.eu-north-1.compute.amazonaws.com   -> yes
    -install node version and sudo apt update && sudo apt install -y libatomic1
    -git clone both F and B
        -Fontend

            -npm i and npm run build
            -sudo apt update
            -sudo apt install nginx
            -sudo systemctl start nginx
            -sudo systemctl enable nginx
            -copy code from dist to /var/www/html  
            -ubuntu@ip-172-31-46-27:~/DevTinder_F$ 
            sudo scp -r dist/* /var/www/html/
            -Enable port 80 on our instance
            - sec -> sec grp -> inbound rul -> port 80 and allow 00000 

        -Beckend    
            -whitelist the ip of aws engine in db -> public ipv4
            -npm i pm2 -g  ( in aws server)
            -pm2 start npm --name "<name>" -- start
            -pm2 logs 
            -pm2 list, pm2 flush <name>, pm2 stop <name>, pm2 delete <name>
            -config nginx -/etc/nginx/sites-avialable/defalut
            sudo nano /etc/nginx/sites-available/default
            -restart nginx -> sudo systemctl restart nginx
            -Modify the base url 
            -push to github 
            -in devTinder_F 0f awsServer pull it and create new build 
            - copy again sudo scp -r dist/* /var/www/html
            - DONE


        -Connecting Frontend and beckend 
            -frontend -> http://13.60.186.25/
            -beckend -> http://13.60.186.25:7777
            server_name 13.60.186.25;
            location /api/ {
                proxy_pass http://localhost:7777/;
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection 'upgrade';
                proxy_set_header Host $host;
                proxy_cache_bypass $http_upgrade;
        }

# Adding a custom domain name

    -purchase domain
    -signup cloudflare & add a new domain name
    -change the nameserver on .name and point it out to cloudflare
    -wait for sometime till your nameserver are updated 15 min 
    -DNS recordd : a devtinder.in ipaddress 
    -enable ssl for website

# 4.Sending a eamils vis ses

    -create a IAM user
    -give acccess to amazon full access
    -create an sandbox -> crate an identity -> verify your identity -> verify dns -> verify identity email.
    -Install AWS sdk -v3
    -setup sesClient 
    -access credentials should be created in IAM under security credentials tab 
    -Add the credentials  to the env file
    -write code for sesClient
    -make the email dynamic by passing more parameter

# 6 Scheduling Cron jobs in NOdeJs
    -Installing node -cron
    -Learning about cron expressions syntax -crontab.guru
    -schedule a job 
    -date-fns
    -find all the unique email id who have got connection request in previous day
    -Send Email (if production approved)
    -Explore queue mechanism to send bulk emails (beeque , bull amazon bulk)
    -Make sendEmail function