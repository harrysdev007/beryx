import readline from 'node:readline';
import {handle} from './api.mjs';
try{process.loadEnvFile()}catch{}
for await(const line of readline.createInterface({input:process.stdin,crlfDelay:Infinity})){if(!line.trim())continue;try{const res=await handle(new Request('http://localhost/api/mcp',{method:'POST',headers:{'Content-Type':'application/json',...(process.env.MCP_KEY?{Authorization:'Bearer '+process.env.MCP_KEY}:{})},body:line}),process.env);const text=await res.text();if(text)process.stdout.write(text+'\n')}catch{process.stdout.write(JSON.stringify({jsonrpc:'2.0',id:null,error:{code:-32700,message:'Invalid JSON-RPC message'}})+'\n')}}
