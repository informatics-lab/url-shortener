# url-shortener
A MEAN url shortener.

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

This requires `mongo` and `node` (and optionally `nodemon`) to be installed already on your platform.

```Shell
git clone https://github.com/met-office-lab/url-shortener.git
cd url-shortener
npm install
node src/index.js # Or `nodemon src/index.js` for auto restarts on code changes
```

## Usage

The simplest way to create a short url is using the web interface. Just visit the address for the node server you are running.

That might be `http://localhost:3000/` when developing locally or `http://domain.tld/` once you have it running on a server and DNS entries in place.

You can then generate new short codes using the form.

Once a short code has been created just visit `http://domain.tld/:short` and you will be redirected to the specified url.

Example `http://domain.tld/ueKZ8y2` might redirect to `http://www.example.com/my/very/long/url/which/is/too/long/for/easy/sharing.html`

You can also use the API directly or to create other clients for creating short urls.

## API

### `POST` `http://domain.tld/api/create`
Request:

| Parameter | Description |
| --------- | ----------- |
| `url`     | url to be shortened. |
| `short`   | _(optional)_ short code to use. If not set one will be generated for you. |

Response `result` object:

| Property | Description |
| --------- | ----------- |
| `url`     | the url which has been shortened. |
| `short`   | the short code used. |
| `baseurl`   | the base url of the server. |

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
| `url`     | the url which has been shortened. |
| `short`   | the short code used. |
| `baseurl`   | the base url of the server. |

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
| `short`   | the generated short code. |
| `baseurl`   | the base url of the server. |

#### Example

```
$ curl http://domain.tld/api/genshort
{"status":200,"message":"Generated","result":{"short":"h1ZCaYw","baseurl":"http://domain.tld"}}
```

## Runtime environment variables

To configure your server you must set some environment variables before starting the node application. If you're using docker simply pass the variables in the run command with `-e VAR=value`, otherwise set them with `export VAR=value` within your bash environment.

| Variable | Description | Default |
| -------- | ----------- | ------- |
| DOMAIN | The domain name your server is running on. | `localhost` |
| PORT | The port to run your node express server on. | `3000` |
| DB_HOST | The hostname of your mongodb server. | `mongo` |
| DB_PORT | The port of your mongodb server. | `27017` |
| DB_NAME | The database name to use. | `urlshort` |
| SHORT_LENGTH | The length of a randomly generated short code | `7` |
| ROOT_REDIRECT | The url to redirect to from  `http://domain.tld:port/`. | `/web/index.html` |

## Contributing
Pull requests are appreciated

## License
GPLv3
