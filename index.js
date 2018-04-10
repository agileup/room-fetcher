// const async = require('async')
const unirest = require('unirest')
var express = require('express')
var app = express()
var path = require('path')

// http://localhost:8080
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
})

var server = app.listen(8080, function () {
    console.log("server running on http://localhost:" + server.address().port)
});

const base = 'https://www.dabangapp.com/api/2/room/list/search'
const filters = {
    "deposit-range":[0,15000],
    "price-range":[0,10],
    "room-type":[0,1,2,3,4,5],
    "deal-type":[0,1],
    "location":[
        [127.09585130767823,37.50389472095907],
        [127.11224496917725,37.514788407888894]
    ],
    "room-size":[23,999],
    "room-floor":[1,10]
}
const fetchUrl = `${base}?page=1&filters=${encodeURI(JSON.stringify(filters))}&_=${(new Date).getTime()}`
const fetchReq = unirest.get(fetchUrl)
const headers = {
    "Accept": "application/json, text/javascript, */*; q=0.01",
    "Accept-Encoding": "gzip, deflate, br",
    "Host": "www.dabangapp.com",
    "Referer": "https://www.dabangapp.com/search",
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3390.0 Safari/537.36",
    "X-Requested-With": "XMLHttpRequest"
}

// console.log('path>', path)

// const interval = 1 * 10 * 1000 // 1m
// const loop = setInterval(function() {
    
// }, interval) // 1m

app.get('/fetch', function(req, res) {
    fetchReq.header(headers).end(function (response) {
        // console.log('response>', response.code)
        if (response.code !== 200) {
            console.error('api error>', response.body)
            res.status(400).send({ message: response.body });
        } else {
            const body = response.body
            console.log('total>', body.total)
            const rooms = body.rooms.sort(function(a,b) {
                return new Date(b.saved_time) - new Date(a.saved_time);
            })
            const results = {
                total: body.total,
                rooms: body.rooms
            }
            res.status(200).send(results);
        }
    })
})
