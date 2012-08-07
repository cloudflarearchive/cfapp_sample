CloudFlare.define("sample_app",
    [       "cloudflare/dom", "sample_app/config", "cloudflare/console"],
    function(dom,              config,              console)
    {
        console.log("stuff");
        return {
            name: "Sample App",
            dom: dom
    }
})
