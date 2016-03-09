require 'net/http'

# Homepage (Root path)
get '/' do
  erb :app
end

# proxy our call to translink
get '/proxy/buses' do
  apikey = "xxx"
  url = URI.parse("http://api.translink.ca/rttiapi/v1/buses?apikey=#{apikey}")
  req = Net::HTTP::Get.new(url.to_s)
  req['Accept'] = "application/json"
  res = Net::HTTP.start(url.host, url.port) {|http|
    http.request(req)
  }
  headers["content-type"] = "application/json"
  res.body
end
