import './App.css'

function App() {
  

  return (
    <div className='ctn'>
      <div className='head'>
        <div className='headSection'>search</div>
        <div className='headSection'>icono</div>
        <div className='headSection'>15 grados</div>
        <div className='headSection'>tiempo</div>
        <div className='headSection'>fecha</div>
        <div className='headSection'>lugar</div>
      </div>
      <div className='main'>
        <div className='mainUp'>
          <div className='mainUp1'>C° F°</div>
          <div className='mainUp2'>
            <div className='bloque'>Tomorrow</div>
            <div className='bloque'>Sun, 7 Jun</div>
            <div className='bloque'>Mon, 8 Jun</div>
            <div className='bloque'>Tue, 9 Jun</div>
            <div className='bloque'>Wed, 10 Jun</div>
          </div>
        </div>
        <div className='mainDown'>
          <h1>Today’s Hightlights</h1>
          <div className='mainDownBloques'>
            <div className='bloque1'>Wind status</div>
            <div className='bloque1'>Humudity</div>
            <div className='bloque2'>Visibility</div>
            <div className='bloque2'>Air Pressure</div>
          </div>
        </div>
        <div className='mainFoter'>usermane</div>
      </div>
    </div>
  )
}

export default App
