const async = require('async')
const unirest = require('unirest')
var express = require('express')
var app = express()
var path = require('path')

const PORT = process.env.PORT || 8080
const MAX_DEPOSIT = 16000
const MAX_RENT = 20

// http://localhost:8080
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
})

app.get('/soffi', function(req, res) {
    res.sendFile(path.join(__dirname + '/soffi.html'));
})

app.get('/sone', function(req, res) {
    res.sendFile(path.join(__dirname + '/sone.html'));
})

var server = app.listen(PORT, function () {
    console.log("server running on http://localhost:" + server.address().port)
});

app.get('/dabang', function(req, res) {
    const base = 'https://www.dabangapp.com/api/2/room/list/search'
    const filters = {
        "deposit-range":[0,MAX_DEPOSIT],
        "price-range":[0,MAX_RENT],
        "room-type":[0,1,2,3,4,5],
        "deal-type":[0,1],
        "location":[
            [127.09585130767823,37.50389472095907],
            [127.11224496917725,37.514788407888894]
        ],
        "room-size":[23,999],
        "room-floor":[1,999]
    }
    const fetchUrl = `${base}?page=1&filters=${encodeURI(JSON.stringify(filters))}&_=${(new Date).getTime()}`
    const headers = {
        "Accept": "application/json, text/javascript, */*; q=0.01",
        "Accept-Encoding": "gzip, deflate, br",
        "Host": "www.dabangapp.com",
        "Referer": "https://www.dabangapp.com/search",
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3390.0 Safari/537.36",
        "X-Requested-With": "XMLHttpRequest"
    }
    unirest.get(fetchUrl).header(headers).end(function(response) {
        if (response.code !== 200) {
            console.error('api error>', response.body)
            res.status(400).send({ message: response.body })
        } else {
            const body = response.body
            console.log('dabang>', new Date(), body.total)
            const rooms = body.rooms.sort(function(a,b) {
                return new Date(b.saved_time) - new Date(a.saved_time)
            })
            const results = {
                total: body.total,
                rooms: body.rooms
            }
            res.status(200).send(results)
        }
    })
})

app.get('/dabang-sone', function(req, res) {
    //lat_south=&lat_north=&lng_west=&lng_east=
    const base = 'https://www.dabangapp.com/api/2/room/list/search'
    const filters = {
        "deposit-range":[0,MAX_DEPOSIT],
        "price-range":[0,MAX_RENT],
        "room-type":[0,1,2,3,4,5],
        "deal-type":[0,1],
        "location":[
            [127.04857162767398,37.499439288297225],
            [127.08659319361766,37.51999647657648]
        ],
        "room-size":[23,999],
        "room-floor":[1,999]
    }
    const fetchUrl = `${base}?page=1&filters=${encodeURI(JSON.stringify(filters))}&_=${(new Date).getTime()}`
    const headers = {
        "Accept": "application/json, text/javascript, */*; q=0.01",
        "Accept-Encoding": "gzip, deflate, br",
        "Host": "www.dabangapp.com",
        "Referer": "https://www.dabangapp.com/search",
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3390.0 Safari/537.36",
        "X-Requested-With": "XMLHttpRequest"
    }
    unirest.get(fetchUrl).header(headers).end(function(response) {
        if (response.code !== 200) {
            console.error('api error>', response.body)
            res.status(400).send({ message: response.body })
        } else {
            const body = response.body
            console.log('dabang>', new Date(), body.total)
            const rooms = body.rooms.sort(function(a,b) {
                return new Date(b.saved_time) - new Date(a.saved_time)
            })
            const results = {
                total: body.total,
                rooms: body.rooms
            }
            res.status(200).send(results)
        }
    })
})

app.get('/dabang-offi', function(req, res) {
    const base = 'https://www.dabangapp.com/api/2/room/list/search'
    const filters = {
        "deposit-range":[0,MAX_DEPOSIT],
        "price-range":[0,MAX_RENT],
        "room-type":[3],
        "deal-type":[0,1],
        "location":[
            [127.05497444229127,37.50483095962115],
            [127.06860006408692,37.51295020972669]
        ],
        "room-size":[23,999],
        "room-floor":[1,999]
    }
    const fetchUrl = `${base}?page=1&filters=${encodeURI(JSON.stringify(filters))}&_=${(new Date).getTime()}`
    const headers = {
        "Accept": "application/json, text/javascript, */*; q=0.01",
        "Accept-Encoding": "gzip, deflate, br",
        "Host": "www.dabangapp.com",
        "Referer": "https://www.dabangapp.com/search",
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3390.0 Safari/537.36",
        "X-Requested-With": "XMLHttpRequest"
    }
    unirest.get(fetchUrl).header(headers).end(function(response) {
        if (response.code !== 200) {
            console.error('api error>', response.body)
            res.status(400).send({ message: response.body })
        } else {
            const body = response.body
            console.log('dabang>', new Date(), body.total)
            const rooms = body.rooms.sort(function(a,b) {
                return new Date(b.saved_time) - new Date(a.saved_time)
            })
            const results = {
                total: body.total,
                rooms: body.rooms
            }
            res.status(200).send(results)
        }
    })
})

app.get('/zigbang', function(req, res) {
    async.auto({
        ids: (cb) => {
            const zIdsUrl = `https://api.zigbang.com/v3/items2?lat_south=37.504446328097764&lat_north=37.5155858571876&lng_west=127.09668603866952&lng_east=127.11344114492195&room=[01,02,03,04,05]&deposit_e=${MAX_DEPOSIT}&rent_e=${MAX_RENT}`
            unirest.get(zIdsUrl).header({
                "Accept": "application/json, text/javascript, */*; q=0.01",
                "Accept-Encoding": "gzip, deflate, br",
                "Accept-Language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7",
                "Host": "api.zigbang.com",
                "Referer": "https://www.zigbang.com/search/map",
                "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3390.0 Safari/537.36"
            }).end(function(response) {
                if (response.code !== 200) {
                    console.log('z1 error>', response.code, response.body)
                    cb('z1api error')
                } else {
                    cb(null, response.body)
                }
            })
        },
        details: ['ids', (results, cb) => {
            // console.log(results.ids)
            const ids = results.ids.list_items.map(i => i.simple_item.item_id)
            const zDetailsUrl = `https://api.zigbang.com/v3/items?detail=true&item_ids=[${ids}]`
            unirest.get(zDetailsUrl).header({
                "Accept": "*/*",
                "Accept-Encoding": "gzip, deflate, br",
                "Accept-Language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7",
                "Host": "api.zigbang.com",
                "Referer": "https://www.zigbang.com/search/map",
                "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3390.0 Safari/537.36"
            }).end(function(response) {
                if (response.code !== 200) {
                    console.log('z2 error>', response.code, response.body)
                    cb('z2zpi error')
                } else {
                    cb(null, response.body)
                }
            })
        }]
    }, (err, results) => {
        if (err) {
            res.status(400).send({ message: err });
        } else {
            const roomList = results.details.items.filter(function(r) {
                const f = r.item.floor
                return f.indexOf('반지하') >= 0 ? false : true
            })

            const total = roomList.length
            const rooms = roomList.sort(function(a,b) {
                return new Date(b.item.updated_at2) - new Date(a.item.updated_at2)
            })
            const result = {
                total,
                rooms,
            }
            res.status(200).send(result)
        }
    })
})

app.get('/zigbang-sone', function(req, res) {
    async.auto({
        ids: (cb) => {
            const zIdsUrl = `https://api.zigbang.com/v3/items2?lat_south=37.499439288297225&lat_north=37.51999647657648&lng_west=127.04857162767398&lng_east=127.08659319361766&room=[01,02,03,04,05]&deposit_s=7000&deposit_e=${MAX_DEPOSIT}&rent_e=${MAX_RENT}`
            unirest.get(zIdsUrl).header({
                "Accept": "application/json, text/javascript, */*; q=0.01",
                "Accept-Encoding": "gzip, deflate, br",
                "Accept-Language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7",
                "Host": "api.zigbang.com",
                "Referer": "https://www.zigbang.com/search/map",
                "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3390.0 Safari/537.36"
            }).end(function(response) {
                if (response.code !== 200) {
                    console.log('z1 error>', response.code, response.body)
                    cb('z1api error')
                } else {
                    cb(null, response.body)
                }
            })
        },
        details: ['ids', (results, cb) => {
            // console.log(results.ids)
            const ids = results.ids.list_items.map(i => i.simple_item.item_id)
            const zDetailsUrl = `https://api.zigbang.com/v3/items?detail=true&item_ids=[${ids}]`
            unirest.get(zDetailsUrl).header({
                "Accept": "*/*",
                "Accept-Encoding": "gzip, deflate, br",
                "Accept-Language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7",
                "Host": "api.zigbang.com",
                "Referer": "https://www.zigbang.com/search/map",
                "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3390.0 Safari/537.36"
            }).end(function(response) {
                if (response.code !== 200) {
                    console.log('z2 error>', response.code, response.body)
                    cb('z2zpi error')
                } else {
                    cb(null, response.body)
                }
            })
        }]
    }, (err, results) => {
        if (err) {
            res.status(400).send({ message: err });
        } else {
            const roomList = results.details.items.filter(function(r) {
                const f = r.item.floor
                return f.indexOf('반지하') >= 0 ? false : true
            })

            const total = roomList.length
            const rooms = roomList.sort(function(a,b) {
                return new Date(b.item.updated_at2) - new Date(a.item.updated_at2)
            })
            const result = {
                total,
                rooms,
            }
            res.status(200).send(result)
        }
    })
})

app.get('/zigbang-offi', function(req, res) {
    async.auto({
        ids: (cb) => {
            const zIdsUrl = `https://api.zigbang.com/v2/officetels/items?lat_south=37.50483095962115&lat_north=37.51295020972669&lng_west=127.05497444229127&lng_east=127.06860006408692&room=01;02;03;04;05&deposit_e=${MAX_DEPOSIT}&rent_e=${MAX_RENT}`
            unirest.get(zIdsUrl).header({
                "Accept": "application/json, text/javascript, */*; q=0.01",
                "Accept-Encoding": "gzip, deflate, br",
                "Accept-Language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7",
                "Host": "api.zigbang.com",
                "Referer": "https://www.zigbang.com/search/map",
                "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3390.0 Safari/537.36"
            }).end(function(response) {
                if (response.code !== 200) {
                    console.log('z1 error>', response.code, response.body)
                    cb('z1api error')
                } else {
                    cb(null, response.body)
                }
            })
        },
        details: ['ids', (results, cb) => {
            // console.log(results.ids)
            const ids = results.ids.list_items.map(i => i.simple_item.item_id)
            const zDetailsUrl = `https://api.zigbang.com/v3/items?detail=true&item_ids=[${ids}]`
            unirest.get(zDetailsUrl).header({
                "Accept": "*/*",
                "Accept-Encoding": "gzip, deflate, br",
                "Accept-Language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7",
                "Host": "api.zigbang.com",
                "Referer": "https://www.zigbang.com/search/map",
                "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3390.0 Safari/537.36"
            }).end(function(response) {
                if (response.code !== 200) {
                    console.log('z2 error>', response.code, response.body)
                    cb('z2zpi error')
                } else {
                    cb(null, response.body)
                }
            })
        }]
    }, (err, results) => {
        if (err) {
            res.status(400).send({ message: err });
        } else {
            const total = results.details.items.length
            const rooms = results.details.items.sort(function(a,b) {
                return new Date(b.item.updated_at2) - new Date(a.item.updated_at2)
            })
            const result = {
                total,
                rooms,
            }
            res.status(200).send(result)
        }
    })
})

app.get('/naver', function(req, res) {
    const nUrl = `https://new.land.naver.com/api/articles?cortarNo=1168000000&order=rank&realEstateType=OPST&tradeType=B1&tag=COMPLETION25UNDER%3A%3A%3A%3A%3A%3A%3A%3A&rentPriceMin=0&rentPriceMax=900000000&priceMin=7000&priceMax=16000&areaMin=23.1&areaMax=75.9&sameAddressGroup=false&page=1&articleState`
    unirest.get(nUrl).header({
        "Accept": "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7",
        "Host": "new.land.naver.com",
        "Referer": "https://new.land.naver.com/articles",
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3395.0 Safari/537.36"
    }).end(function(response) {
        if (response.code !== 200) {
            console.log('naver error>', response.code, response.body)
            res.status(400).send({ message: response.body })
        } else {
            const body = response.body
            const total = body.articleList.length
            const rooms = body.articleList.sort(function(a,b) {
                return parseInt(b.articleConfirmYmd) - parseInt(a.articleConfirmYmd)
            })
            const results = {
                total,
                rooms
            }
            res.status(200).send(results)
        }
    })
})
