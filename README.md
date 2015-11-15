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
node index.js
```

## Usage
Once a short code has been created just visit http://domain.tld/<short> and you will be redirected to the specified url.

## API

### http://domain.tld/api/create
POST
Parameters
`url`: url to be shortened
`short`: (optional) extention to use 

### http://domain.tld/api/check/<short>
GET
Returns whether a short code exists

## Contributing
Pull requests are appreciated

## License
GPLv3
