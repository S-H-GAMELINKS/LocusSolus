#include <iostream>
#include <httplib.h>
#include <fstream>
#include <sstream>
#include <string>
#include <array>

const std::string load_assets(const std::string& path) {

    std::ifstream file(path.c_str(), std::ios::in);

    std::stringstream stream;

    stream << file.rdbuf();

    file.close();

    std::string assets(stream.str());

    return assets;
}

int main() {

    httplib::Server svr;

    std::string body = load_assets("./assets/index.html");

    std::string indexjs = load_assets("./assets/index.js");

    std::array<std::string, 4> routes = { "/", "/about", "/contact", "/chat"};

    std::array<std::string, 2> javascripts = { "/index.js", "/chat/index.js" };

    for(auto&& r : routes) {
        svr.Get(r.c_str(), [&](const httplib::Request& req, httplib::Response& res) {
            res.set_content(body, "text/html");
        });
    }

    svr.Get("/chat/\\d+", [&](const httplib::Request& req, httplib::Response& res) {
        res.set_content(body, "text/html");
    });

    for (auto&& j : javascripts){ 
        svr.Get(j.c_str(), [&](const httplib::Request& req, httplib::Response& res) {
            res.set_content(indexjs, "text/javascript");
        });
    }

    svr.listen("localhost", 3000);

    return 0;
}