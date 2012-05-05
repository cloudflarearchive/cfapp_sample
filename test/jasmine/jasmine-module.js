jasmine.VERBOSE = true
jasmine.Env.prototype.describe = function(_description, _definitions) {
    var self = this;
    var targetSuite = self.currentSuite || self.currentRunner_;
    var fun = function (suite, specDefinitions, suiteArgs){

        var parentSuite = self.currentSuite;
        targetSuite.add(suite);

        self.currentSuite = suite;

        var declarationError = null;
        try {
            specDefinitions.apply(suite, suiteArgs);
        } catch(e) {
            declarationError = e;
        }

        if (declarationError) {
            self.it("encountered a declaration exception", function() {
                throw declarationError;
            });
        }

        self.currentSuite = parentSuite;

        return suite;
    }
    if (typeof(_description) == "object") {
        var suite = new jasmine.Suite(self, _description.toString(), _definitions, self.currentSuite);
        if ( jasmine.getGlobal().define && jasmine.getGlobal().define.amd) {
            targetSuite.env.moduleCount = targetSuite.env.moduleCount ?
                targetSuite.env.moduleCount + 1 : 1;
            targetSuite.env.modulesReady = targetSuite.env.modulesReady || 0;
            jasmine.getGlobal().require(_description, function(){
                targetSuite.env.modulesReady ++;
                return fun(suite, _definitions, arguments)
            });
        } else {
            throw "You can't test a module without define.AMD set on the global object";
        }
    } else{
        var suite = new jasmine.Suite(self, _description, _definitions, self.currentSuite);
        return fun(suite, _definitions)
    }

};
