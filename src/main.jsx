import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'

import { Provider } from 'react-redux'
import store from './store'
import './api/mock'

import { RouterProvider } from 'react-router-dom'
import router from './router/index.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
       <RouterProvider router={router}/>
    </Provider>
  </StrictMode>
)

window.onload = function(){
  console.log('首屏加载时间：',performance.timing.domComplete - performance.timing.navigationStart);
  //改写
  const observer = new PerformanceObserver((list)=>{
    list.getEntries().forEach(entry=>{
      console.log('改写后的首屏加载时间：',entry.domComplete);
    })
  });
  observer.observe({entryTypes:['navigation']})
}