console.log("Hello World!");

// Printing all classes loaded by the app
// setTimeout(function() {
//   Java.enumerateLoadedClasses({
//     onMatch: function(className) {
//       console.log(className);
//     },
//     onComplete: function() {
//       console.log("Class enumeration complete");
//     }
//   });
// }, 5000);

// Find class and use it
setTimeout(function() {
  var className = "com.example.dynamiccodeloadingexample.StringFns";
  console.log("Finding class");

  var classFactory;
  const classLoaders = Java.enumerateClassLoadersSync();
  for (const classLoader in classLoaders) {
    try {
      console.log( classLoaders[classLoader]);
      classLoaders[classLoader].findClass(className);
      classFactory=Java.ClassFactory.get( classLoaders[classLoader]);
      console.log("Class found in class loader");
      break;
    } catch (e) {
      console.log("Class not found in class loader");
      continue;
    }
  }

  var classToDump= classFactory.use(className);

  var classLoader = Java.use(className).classLoader;
  var classLoaderClass = Java.use("java.lang.ClassLoader");
  var classToDump = Java.cast(classLoaderClass.loadClass.overload('java.lang.String').call(classLoader, className), Java.use(className));

  // Find the memory range where the class is loaded
  var classPtr = classToDump.$staticClass.$handle;
  var classSize = Memory.readU32(classPtr.add(Process.pointerSize));
  var classMemory = Memory.scanSync(classPtr, classSize, "r--")[0];

  // Read the contents of the memory range into a byte array
  var classBytes = Memory.readByteArray(classMemory.address, classMemory.size);

  // Write the byte array to a file
  var filename = className.replace(/\./g, "_") + ".class";
  var file = new File(filename, "wb");
  file.write(classBytes);
  file.flush();
  file.close();

  console.log("Class dumped to " + filename);
  
}, 5000);



// // Read the memory of the class
// console.log("Reading memory of class");
// var memArray = classToDump.class.getData().data.readByteArray(memRange);

// // Write the memory to a file
// console.log("Writing memory to file");
// var file = new File("com.example.dynamiccodeloadingexample.MainActivity.bin", "wb");
// file.write(memArray);
// file.flush();
// file.close();
