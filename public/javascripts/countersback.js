CloudFlare.define("countersback",
    [       "cloudflare/dom", "countersback/config", "cloudflare/jquery1.7"],
    function(dom,              config,                $)
    {
        console.log(arguments)
        $.getJSON(
            "http://countersback.herokuapp.com/hit?callback=?",
            {domain_id: config && config.domain_id},
            function(data){
                console.log(this, arguments)
            }
        )
    }
)
