
/*
 * BufferedNetworkRequest
 */

async function BufferedNetworkRequest(request, options = {}) {
  
  const response = await request;
  
  let respText = '';
  
  new Response(new ReadableStream({
    
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
        
        
        callDataCb(string);
        
      }
      
      controller.close();
      
    }
    
  }));
  
  
  // lastValidDataArrLength
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
  
  
  let dataCb, doneCb;
  
  function callDataCb(data) {
    
    if (!dataCb) return;
    
    if (options.json) {
      
      data = parseInvalidJSON(respText);
      
    }
    
    dataCb(data);
    
  }
  
  function callDoneCb() {
    
    if (!doneCb) return;
    
    let data = respText;

    if (options.json) {

      data = JSON.parse(respText);

    }
    
    doneCb({ response, data });
    
  }
  
  
  const eventObj = {
    
    set ondata(value) {
      
      dataCb = value;
      
    },
    
    set ondone(value) {
      
      doneCb = value;
      
    }
    
  };
  
  return eventObj;

}

