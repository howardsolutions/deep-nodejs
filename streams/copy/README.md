## FIRST APPROACH to copy a file

NOT really practial at all. If you're dealing with very TINY file, it's OK

But it's problematic with BIG file. Because Buffer can't allocate a giant file in memory.

Using Stream is way way way better

```js
const sourceFileContent = await fs.readFile('text.txt');
const destinationFile = await fs.open('text-copy.txt', 'w');

await destinationFile.write(sourceFileContent);
```

With the first approach `fs.readFile` - `sourceFileContent` return the whole content file in ONE BUFFER, if it's more than 2GB, it's not going to work


## 2nd approach

With the 2nd approach, no matter how big the file is, it always return chunks of data, the buffers are just 16KB

We read and write data in chunks stored in buffer.

We need to write multiple times, rather than read one big chunk of data which took a large memory usage and WRITE ONLY ONCE time like approach #1

That's why approach 2 - is much much more memory efficient.

But approach 2 is slower

In constrast, approach #1 is FASTER, but took much more memory. COuld be memory crash with giant file