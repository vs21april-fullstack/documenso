const n=(e,a)=>({name:e,value:`v=DKIM1; k=rsa; p=${a}`,type:"TXT"}),r={name:"@",value:"v=spf1 include:amazonses.com -all",type:"TXT"},t=(e,a)=>[n(e,a),r];export{t as g};
