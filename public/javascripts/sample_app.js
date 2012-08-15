CloudFlare.define("sample_app",
    [       "cloudflare/dom", "sample_app/config", "cloudflare/console", "cloudflare/jquery1.7"],
    function(dom,              config,              console,             $)
    {
        console.log("hello")
        $.post("http://localhost:3000/hit", {domain_id: 1141})
        return {
            name: "Sample App",
            dom: dom
    }
})
