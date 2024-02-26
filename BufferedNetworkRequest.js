
async function BufferedNetworkRequest(request, options = {}) {
  
  const response = await request;
  
  let respText = '';
  
  const res = new Response(new ReadableStream({
    
    async start(controller) {
      
      const reader = response.body.getReader();
      
      for (;;) {
        
        const {done, value} = await reader.read();
        
        
        if (done) {
          
          callDoneCb();
          
          break;
          
        }
        
        
        const string = new TextDecoder().decode(value);
        
        respText += string;
        
        
        callUpdateCb(string);
        
      }
      
      controller.close();
      
    }
    
  }));
  
  
  let lastDataLen = 0;
  
  function parseInvalidJSON(data) {
    
    const parser = BufferedNetworkRequest.InvalidJSONParser;
    
    data = parser.parse(respText);
    
    
    const dataLen = data.length;
    
    // remove already-received data
    // from array
    data = data.slice(lastDataLen);
    
    lastDataLen = dataLen;
    
    
    return data;
    
  }
  
  
  let updateCb, doneCb;
  
  function callUpdateCb(data) {
    
    if (!updateCb) return;
    
    if (options.json) {
      
      return parseInvalidJSON(respText);
      
    }
    
    return data;
    
  }
  
  function callDoneCb() {
    
    if (!doneCb) return;
    
    if (options.json) {
      
      return JSON.parse(respText);
      
    }
    
    return respText;
    
  }
  
  
  return {
    
    set onupdate(value) {
      
      updateCb = value;
      
    },
    
    set ondone(value) {
      
      doneCb = value;
      
    }
    
  };

}

