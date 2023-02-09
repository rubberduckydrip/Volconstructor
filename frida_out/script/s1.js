Java.perform(function(){
    var DexClassLoader;
    console.log("Finding DexClassLoader");
    DexClassLoader = Java.choose("dalvik.system.DexClassLoader");
    var classInMemory = null;
    Java.enumerateLoadedClassesSync({
        onMatch: function(className) {
            if (className === myClass.className) {
                classInMemory = Java.use(className);
                return "stop";
            }
        },
        onComplete: function() {}
    });                                                                                                                                                                                                                                                                

    var constructor = classInMemory.$init.overloads[0];
    var constructorParams = constructor.parameterTypes;
    console.log("Constructor parameters: " + constructorParams.map(function(x) { return x.className; }));
})