# url-shortener
A node url shortener.

## Running

### Docker

```Shell
git clone https://github.com/met-office-lab/url-shortener.git
cd url-shortener
docker build -t url-shortener .
docker run --name mongo mongo:3
docker run -e DB_HOST=mongo -e DOMAIN=domain.tld --link mongo url-shortener
```

### Classic

This requires `mongo` and `node` to be installed already on your platform.

```Shell
git clone https://github.com/met-office-lab/url-shortener.git
cd url-shortener
npm install
node src/index.js # Or `nodemon src/index.js` for auto restarts on code changes
```

## Usage
Once a short code has been created just visit http://domain.tld/:short and you will be redirected to the specified url.

## API

### `POST` `http://domain.tld/api/create`
Request:

| Parameter | Description |
| --------- | ----------- |
| `url`     | url to be shortened |
| `short`   | _(optional)_ short code to use |

Response `result` object:

| Property | Description |
| --------- | ----------- |
| `url`     | the url which has been shortened |
| `short`   | the short code used |
| `baseurl`   | the base url of the server |

#### Example

```
$ curl -d url=http://www.informaticslab.co.uk/ http://domain.tld/api/create
{"status":201,"message":"Success, short created!","result":{"url":"http://www.informaticslab.co.uk/","short":"nUAm7HC","baseurl":"http://domain.tld"}}
```

### `GET` `http://domain.tld/api/check/:short`

Returns whether a short code exists. Will return 404 if it doesn't exist.

Response `result` object:

| Property | Description |
| --------- | ----------- |
| `url`     | the url which has been shortened |
| `short`   | the short code used |
| `baseurl`   | the base url of the server |

#### Example

```
$ curl http://domain.tld/api/check/nUAm7HC
{"status":200,"message":"Short exists","result":{"url":"http://www.informaticslab.co.uk/","short":"nUAm7HC","baseurl":"http://domain.tld"}}

$ curl http://domain.tld/api/check/h8Jk0sl
{"status":404,"message":"Short not found","result":null}
```

### `GET` `http://domain.tld/api/genshort`

Returns a random string to use as a short.

Response `result` object:

| Property | Description |
| --------- | ----------- |
| `short`   | the generated short code |
| `baseurl`   | the base url of the server |

#### Example

```
$ curl http://domain.tld/api/genshort
{"status":200,"message":"Generated","result":{"short":"h1ZCaYw","baseurl":"http://domain.tld"}}
```

## Contributing
Pull requests are appreciated

## License
GPLv3
