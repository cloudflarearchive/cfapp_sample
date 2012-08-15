CloudFlare.define("countersback",
    [       "cloudflare/dom", "sample_app/config", "cloudflare/console", "cloudflare/jquery1.7"],
    function(dom,              config,              console,             $)
    {
        $.post("http://countersback.heroke.com/hit", {domain_id: config.domain_id})
        return {
            name: "Counters Back",
            dom: dom
    }
})
