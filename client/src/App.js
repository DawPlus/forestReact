import axios from "axios";
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './layout/Header';
import Main from './layout/Main';
import Product from './layout/Product';
const App = ()=>{


  useEffect(()=>{
    axios.get("/api/select").then(r=> console.log(r))

  },[])
   
  return (
    <div className="App">
      <BrowserRouter>
            <Header />
            <Routes>
              <Route path="/" element={<Main />}></Route>
              <Route path="/product/*" element={<Product />}></Route>
              {/* 상단에 위치하는 라우트들의 규칙을 모두 확인, 일치하는 라우트가 없는경우 처리 */}              
            </Routes>
          </BrowserRouter>
    </div>
  );
}

export default App;
