
async function bufferedNetworkRequest(request, updateCallback) {
  
  const response = await request;
  
  let respText = '';
  
  const res = new Response(new ReadableStream({
    
    start: async (controller) => {
      
      const reader = response.body.getReader();
      
      for (;;) {
        
        const {done, value} = await reader.read();
        
        if (!done) {
          
          const string = new TextDecoder().decode(value);
          
          respText += string;
          
          
          debugger;
          
          const validData = this.InvalidJSONParser.parse(respText);
          
          updateCallback(validData);
          
        } else {
          
          updateCallback(null, done);
          
          break;
          
        }
        
      }
      
      controller.close();
      
    }
    
  }));

}

