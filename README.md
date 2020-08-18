# Rating Application front-end
Rating Application is project about creating an app that empowers the costumers and give management a simple insight into the satisfaction of costumers by creating a emoticon based satisfaction system and automatically creates graphical representation of said reactions.

## Getting Started
After cloning repository you will need to install all node modules.
```
npm install
```
npm installation is finished? You are ready to run your app.

```
npm run serve
```

## Structure of front-end
Front-end is made out of two parts.
- First is front-end that will be showed to clients of companies.
- Second is fronted that is made for companies.

### First part: Clients front-end 
Clients front-end is made out of three main segments:

- #### `/` 
Default page where user will need to enter username and password.
After logging in it will get token from back-end. Token is saved in local storage and used in communication with back-end.

- #### `/user` 
Reacting page is main page of clients front-end. After loading this page, GUI settings are fetched and shown to clients. When client clicks on emoticon, it automatically re-directs to Thanks page.

- #### `/thanks` 
Thanks page is simple page that shows **AdminMessage** set by company in Admin panel and it is timed with **AdminDurationMessage** localstorage state. After time is up, page will re-direct back to Reacting page.


### Second part: Admins front-end
Admins front-end is made out of one main page but it is divided into four tabs:

- #### `/admin` - Today tab
First tab of four of them, basically it shows today's reaction statistics. It has implemented socket service that communicates with back-end in real-time.

- #### `/admin` - Report tab
As the name says, it is search tab where Admin is able to load old data from database vie date-picker. Report's tab shows less details than Today's tab.

- #### `/admin` - Settings tab 
Settings tab is tab where all magic happens. This tab is used for updating GUI settings of client's front-end **Reacting page**, but also it has slack setter if company wants to connects application with slack. This feature allows back-end to send message to companies slack if rating ratio is bad.

- #### `/admin` - Users tab 
Finally, Users tab is tab where new users are being created. Level three administrator can create companies. Level two admin is able to create only level 1 users.

## Tools used in front-end

Tools that helped us in accomplishing our goal. Table underneath show dependency names and it's purpose in this project.

Name | Purpose
------------ | -------------
vue | Progressive javascript framework
vuex | Local storage
vue router | Vue routing between pages
vue-page-transition | A lean Vue.js plugin for page / route transitions
chart.js | Drawing charts
hchs-vue-charts | Base on Vue2, wrapper for ChartJs
vue-socket.io-extended | Vue socket-io implementation
socket.io-client |  “slight” wrapper around the WebSocket API

## Team behind this master-piece

Official name of our team is Team One. We are first team of Maglaj's Nsoft Devhive program. We are counting three members:

1. Mirza Ramović
2. Ahmed Cvrčak
3. Fadil Šestan
