// Default settings which can be overidden with environment variables
module.exports = {
  port: process.env.PORT || 3000,
  dbhost: process.env.DB_HOST || "localhost",
  dbname: process.env.DB_NAME || "urlshort",
  domain: process.env.DOMAIN || "localhost",

  getBaseURL: function(){
    if(this.port == 80){
      return "http://" + this.domain
    } else if (this.port == 443){
      return "https://" + this.domain
    } else {
      return "http://" + this.domain + ":" + this.port
    }
  }
}
