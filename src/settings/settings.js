// Default settings which can be overidden with environment variables
module.exports = {
  port: process.env.PORT || 3000,
  dbhost: process.env.DB_HOST || "localhost",
  dbport: process.env.DB_PORT || 27017,
  dbname: process.env.DB_NAME || "urlshort",
  domain: process.env.DOMAIN || "localhost",
  shortlength: process.env.SHORT_LENGTH || 7,
  rootredirect: process.env.ROOT_REDIRECT || "/web/index.html",

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
