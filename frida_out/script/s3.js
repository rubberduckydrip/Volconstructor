// Original source: https://gist.github.com/eybisi/abb844ebde00e6c0d5f6896d61dae911

Java.perform(function(){
    let ThreadDef = Java.use('java.lang.Thread');
    let ThreadObj = ThreadDef.$new();
    function stackTrace() {
                console.log('------------START STACK---------------')
                let stack = ThreadObj.currentThread().getStackTrace();
                for (let i = 0; i < stack.length; i++) {
                                console.log(i + ' => ' + stack[i].toString());
                            }
                console.log('------------END STACK---------------');
            }
    function bytes2string(array) {
                array = Java.array('byte',array)
                let result = '';
                for (let i = 0; i < array.length; ++i)
                        result += (String.fromCharCode(array[i]))
                return result;
            };
    function bytes2hex(array) {
                array = Java.array('byte',array)
                let result = '';
                for (let i = 0; i < array.length; ++i)
                        result += ('0' + (array[i] & 0xFF).toString(16)).slice(-2);
                return result;
            };
    function pad(num, size) {
                let s = num + '';
                while (s.length < size) s = '0' + s;
                return s;
            }
    let Color = {
                Reset: '\x1b[39;49;00m',
                Black: '\x1b[30;01m', Blue: '\x1b[34;01m', Cyan: '\x1b[36;01m', Gray: '\x1b[37;11m',
                Green: '\x1b[32;01m', Purple: '\x1b[35;01m', Red: '\x1b[31;01m', Yellow: '\x1b[33;01m',
                Light: {
                                Black: '\x1b[30;11m', Blue: '\x1b[34;11m', Cyan: '\x1b[36;11m', Gray: '\x1b[37;01m',
                                Green: '\x1b[32;11m', Purple: '\x1b[35;11m', Red: '\x1b[31;11m', Yellow: '\x1b[33;11m'
                            }
            };
    function getContext() {
                return Java.use('android.app.ActivityThread').currentApplication().getApplicationContext()
            }
    let dalvik = Java.use("dalvik.system.DexFile")
    let dalvik2 = Java.use("dalvik.system.DexClassLoader")
    let dexclassLoader = Java.use("dalvik.system.DexClassLoader");
    console.log(Color.Green+"[+] Hooking DexFile.loadDex",Color.Reset)
    dexclassLoader.$init.implementation = function(a,b,c,d){
        console.log(Color.Green+"\n[+] DexClassLoader $init called !\n Hooking classes from file ",a,Color.Reset)
        this.$init(a,b,c,d)
        console.log(Color.Green+"[+] DexClassLoader $init finished !",Color.Reset)
        send(a);
    }
    function hookloadedfunctions(dexclassloader){

            Java.classFactory.loader = dexclassloader 
            let target_class = "com.example.test.a"
            try{
                let res = dexclassloader.findClass(target_class);
            }
            catch(e){
                console.log(Color.Red+e,Color.Reset)
                return
            }
            
            //Class found, you can hook with Java.use since current loader is dexclassloader
            let class_ref = Java.use(target_class)
            console.log(Color.Green+"[+] Hooking : ",class_ref,Color.Reset)
            class_ref.Send.overload('java.lang.String').implementation = function(a){
                let retval = class_ref.Send(a)
                console.log(Color.Yellow+"Sending : ",a,Color.Reset)
                console.log(Color.Green+"Received :",retval,Color.Reset)
                return retval
            }
            // Java.classFactory.loader = oldloader

    }

    //hook loadClass method
    

})

input()
