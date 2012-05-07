CloudFlare.define( "sample_app", ["cloudflare/dom", "sample_app/config"], function(dom, config){
    window.lotteryWinner = false
    return {
        name: "Sample App",
        dom: dom
    }
})
