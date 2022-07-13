// change url backend login api (on heroku)
// for now it is set to the IP address of my machine (192.168.1.100) to test it on yours replace it with your IP

const HOST_IP_ADDRESS = '192.168.1.114';
const PORT_NR = '3000';

const BACKEND_ENDPOINT_USERS    =   'http://' + HOST_IP_ADDRESS + ':' + PORT_NR + '/api/users/';
const BACKEND_ENDPOINT_TOILETS  =   'http://' + HOST_IP_ADDRESS + ':' + PORT_NR + '/api/toilets/';
const BACKEND_ENDPOINT_REVIEWS  =   'http://' + HOST_IP_ADDRESS + ':' + PORT_NR + '/api/reviews/';
const BACKEND_ENDPOINT_REPORTS  =   'http://' + HOST_IP_ADDRESS + ':' + PORT_NR + '/api/reports/';
const BACKEND_ENDPOINT_IMAGES   =   'http://' + HOST_IP_ADDRESS + ':' + PORT_NR + '/api/images/';


module.exports = { 
    BACKEND_ENDPOINT_USERS, 
    BACKEND_ENDPOINT_TOILETS, 
    BACKEND_ENDPOINT_REVIEWS, 
    BACKEND_ENDPOINT_REPORTS, 
    BACKEND_ENDPOINT_IMAGES 
};