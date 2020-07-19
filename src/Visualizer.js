import React from 'react';
import logo from './logo.svg';
import './App.css';
import './visualizer.css'
import ReactDOM from 'react-dom';
import BarCompomnemt from './barComponent'

 export default class Visualizer extends React.Component {


  constructor(props) {
    super(props);

    this.state = { 
      arr : [],
      animations : [],
      bars  : document.getElementsByClassName('bars')
    }


    for (let index = 0; index <100; index++) {
      
      let val =  Math.random() * (920 - 100) + 100;
      this.state.arr.push(val);

      
    }
  }


   clearInterval(){
    clearInterval(this.timerID);
  }


  swapBars(a, b){
   
   // setTimeout(function(){ document.getElementById(a).style.height =  this.state.arr[b];  document.getElementById(b).style.height =  this.state.arr[a]; this.forceUpdate() }.bind(this), 2000);
   debugger;
   let tmp = this.state.bars[a].style.height
   //this.state.bars[a].style.height = this.state.bars[b].style.height;
   let bar1  =  this.state.bars[a];
   let bar2 =  this.state.bars[b];
   this.setState( bar1 , this.state.bars[b].style.height);
   this.setState(bar2 ,tmp);
  } 

    sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }

    bubbleSort(){

  debugger;
      for(let i=0;i<=this.state.arr.length;i++){
        for(let j=0;j<=this.state.arr.length-i;j++){
        if(this.state.arr[j]> this.state.arr[j+1])
        {
          this.state.animations.push({a: j, b:j+1, val1: this.state.arr[j], val2: this.state.arr[j+1]})
          let tmp  = this.state.arr[j] 
 
          let curr =  this.state.arr[j];
          let curr1 =  this.state.arr[j+1];
        //  this.setState({curr: this.state.arr[j+1]});
         // this.setState({curr1 :tmp });

           this.state.arr[j] = this.state.arr[j+1]
           this.state.arr[j+1] = tmp
         // this.swapBars(j,j+1)
      //    let arr1 = this.state.arr; 
      //  this.setState({arr : arr1})
          
         // this.swapBars(j, j+1)
        //  await new Promise(r => setTimeout(()=>{ let arr1 = this.state.arr; this.setState({arr : arr1})},500));
      
       
        }
      }

      }
    this.animate();
      
  }

animate(){
  debugger;

  const bars = document.getElementsByClassName('bars')

 let idex = 0
    for (let animation of this.state.animations) {
      idex+=1;
    debugger;
      window.setTimeout(() => {
      
        bars[animation.a].style.backgroundColor = 'LightGreen'
        bars[animation.b].style.backgroundColor  = 'LightGreen'
        
        bars[animation.a].style.height = animation.val2 + 'px'
        bars[animation.b].style.height = animation.val1 + 'px'
        
        document.getElementById(`spacer_${animation.a}`).style.gridTemplateRows =  (window.innerHeight -100 - parseInt(bars[animation.a].style.height)) + 'px';
        document.getElementById(`spacer_${animation.b}`).style.gridTemplateRows =  (window.innerHeight - 100  - parseInt(bars[animation.b].style.height)) + 'px';
        window.setTimeout(() => {
          bars[animation.a].style.backgroundColor = 'green'
        bars[animation.b].style.backgroundColor  = 'green'
        }, 100);
    
      }, 100*idex);
     
      
    }

}

  componentDidMount() {
    debugger;
    this.timerID = setTimeout(
      () => this.bubbleSort(),
      500
    );
  }

 render() {
    var element =  (

        <div className="App">
            <div style={{position: "relative"}}>

            {/* {this.state.arr.map((val, idx)=>(
                <BarCompomnemt barHeight={val} id={idx}></BarCompomnemt>
              ))} */}

              
              {this.state.arr.map((val, idx)=>(
             <div id={`spacer_${idx}`}  style={{float:'left', width:'20px', display: 'grid','grid-template-rows': `${window.innerHeight - 100 - val}px`}}>   
              <div style={{backgroundColor:'white'}}></div>
              <div id={idx}   style={{
                left :`${idx*100}`,
                height: `${val}px`,
                position: 'relative', 
                bottom : '0px',
                border: '1px solid white'
               
              }} className='bars'></div></div>
              ))}
        
        </div>
           <input type="button" onClick={this.clearInterval} value="clear" />
        </div>
      );
    
     
      return element;
  }
}
