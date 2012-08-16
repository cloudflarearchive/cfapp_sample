CloudFlare.define("countersback",
    [       "countersback/config", "cloudflare/jquery1.7"],
    function(config,                $)
    {
        function addBadge(count){
            var cdnPath = "//ajax.cloudflare.com/cdn-cgi/nexp/apps/countersback/";
            $("<img>",{
                src: cdnPath + "images/badge.png",
                "class": "countersback"
            }).appendTo("body");
        }
        $.getJSON(
            "http://countersback.herokuapp.com/hit?callback=?",
            {domain_id: config && config.domain_id},
            function(data){
                if (this.data.count){
                    addBadge(this.data.count);
                }
            }
        )
    }
)
