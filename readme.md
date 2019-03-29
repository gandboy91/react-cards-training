## react-training

#### cards app 

* `npm run start` to run dev mode 
* `npm run build` will build project to `/build`   
(then u can serve it with any server u want) 

*Uses webpack with a bunch of plugins and separate dev/prod configs*  
*for prod creates minify hash-named files*  
*for dev starts dev-server on `localhost:3030`*

**made with react-router, react-hooks and a bit of react-context**       

App uses local storage. Writes to storage when leaving page.  
Root component (`<App />`) manages all state data and provides callbacks to change it 