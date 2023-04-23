const {PHASE_DEVELOPMENT_SERVER,PHASE_PRODUCTION_BUILD} =require('next/constants')
/** @type {import('next').NextConfig} */

const nextConfig =(phase)=> {
  const isDev=phase===PHASE_DEVELOPMENT_SERVER;
  const isProd=phase===PHASE_PRODUCTION_BUILD && process.env.stagging==='1';
  const isStagging=phase===PHASE_PRODUCTION_BUILD && process.env.stagging==='1'
const env={
          // sourceApi:"https://ideal.notessansar.com/api/",
          sourceApi:"https://api.idealcourier.com.np/api/",
          // sourceApi:"http://127.0.0.1:8000/api/",
}
const rewrites=async()=>{
  return[
    {
      source:'/cat',
      destination:"https://www.google.com"
    }
  ]
}

  return{reactStrictMode: true,rewrites,env}
}

module.exports= nextConfig
