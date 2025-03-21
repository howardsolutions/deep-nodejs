# File System Notes

- Want to Read a file? => 1) Open the file => 2) Read or write

- File Handler 

```js
   const commandFileHandler = fs.open('./command.txt', 'r');
```

When you OPEN the file, you're NOT REALLY READING A FILE, you just SAVING A NUMBER call File Descriptor to your memory.

-  When you OPEN a file, it's really IMPORTANT that you CLOSE it at the end when you're done

- Because you occupied your memory, if you forget, you'll maybe run into some memory issue.

## Allocate buffer with just the right size

- Don't allocate a Buffer that's too large => You're wasting your memory 

- Don't allocate a Buffer that's too small => You're Losing your data characters

## Note on method `filehandle.read(buffer, offset, length, position)`

- buffer: A buffer that will be filled with the file data read.

- offset: The location in the buffer at which to START filling 

- length : The numer of bytes to read.

- position: default set to NULL. the location where to begin reading from thefile.

If `null` data will be read from the current file position AND the position will be UPDATED. 

If postion is an INTEGER (0,1,2...) the current file position will remain unchanged.