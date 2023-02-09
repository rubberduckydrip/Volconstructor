Java.perform(function(){
    let dexclassLoader = Java.use("dalvik.system.DexClassLoader");
    console.log("[+] Hooking DexFile.loadDex")
    dexclassLoader.$init.implementation = function(a,b,c,d){
        console.log("[+] DexClassLoader $init called !\n Hooking classes from file ",a)
        this.$init(a,b,c,d)
        console.log("[+] DexClassLoader $init finished !")
        send(a);
    }
})