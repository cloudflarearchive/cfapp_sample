describe(["sample_app"], function(sample){
    it("should have a name", function(){
        expect(sample.name).toEqual("Sample App");
    })
})

describe(["app_json"], function(json){
    it("should have a name", function(){
        expect(json.name).toEqual("Sample App")
    })
})
