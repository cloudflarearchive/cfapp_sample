CloudFlare.define("countersback",
    [       "countersback/config", "cloudflare/jquery1.7"],
    function(config,                $)
    {
        function addBadge(count){
            var cdnPath = "//ajax.cloudflare.com/cdn-cgi/nexp/apps/countersback/";
            var div = $("<div>")
            $("<img>",{
                src: cdnPath + "images/counter.png",
                "class": "countersback"
            }).appendTo(div);
            $("<span>", {"style": "position:relative; top:-20px; left:-50px;")
                .text(count).appendTo(div)
            div.appendTo("body")
        }
        $.getJSON(
            "http://countersback.herokuapp.com/hit?callback=?",
            {domain_id: config && config.domain_id},
            function(data){
                if (this.data.count){
                    addBadge(this.data.count)
                }
            }
        )
    }
)
