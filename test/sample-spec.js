describe(["sample_app"], function(sample){
    it("should have a name", function(){
        expect(sample.name).toEqual("Sample App");
    })
    it("should tell you if you won", function(){
        expect(window.lotteryWinner).toBe(false)
    })
})

describe(["app_json"], function(json){
    it("should have a name", function(){
        expect(json.name.length).toBeGreaterThan(0)
    })
    it("should have a descrition", function(){
        expect(json.description.length).toBeGreaterThan(0)
    })
    it("should have a version", function(){
        expect(json.version.length).toBeGreaterThan(0)
    })

    describe("config", function(){
        it("should have details", function(){
            expect(json.config.details.Price.length).toBeGreaterThan(0)
        })
        it("should only have allowed details", function(){
            var allowed = [
                "Category",
                "Language",
                "Price",
                "Restrictions",
                "Supporting"
            ]
            for (detail in json.config.details) {
                expect(allowed).toContain(detail)
            }
        })
        describe("interface", function(){
            describe("select", function(){
                beforeEach(function(){
                    this.select = json.config.interface[0]
                })
                it("should have an id", function(){
                    expect(this.select.id).toEqual("lottery")
                })
                it("should have a name and description", function(){
                    expect(this.select.name).toBeDefined()
                    expect(this.select.description).toBeDefined()
                })
                it("should claim to be a select", function(){
                    expect(this.select.type).toEqual("select")
                })
                it("should have a default option", function(){
                    var option = this.select.options[0]
                    expect(option.label).toBeDefined()
                    expect(option.value).toBeDefined()
                })

            })
        })
    })

})
