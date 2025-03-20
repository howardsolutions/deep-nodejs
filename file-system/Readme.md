# File System Notes

- Want to Read a file? => 1) Open the file => 2) Read or write

- File Handler 

```js
   const commandFileHandler = fs.open('./command.txt', 'r');
```

When you OPEN the file, you're NOT REALLY READING A FILE, you just SAVING A NUMBER call File Descriptor to your memory.

-  When you OPEN a file, it's really IMPORTANT that you CLOSE it at the end when you're done

- Because you occupied your memory, if you forget, you'll maybe run into some memory issue.