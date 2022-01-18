import { render } from '@testing-library/react';
import { Component } from 'react';
import './Counter.css'
import PropTypes from 'prop-types';


class Counter extends Component {

     //Define the initial state in a constructor
    //state => counter 0
    constructor() {
        super();

        this.state = {
            counter : 0
       }

       this.increment=this.increment.bind(this); // Need this binding to change state directly. You can change it with adding = () => to the function definition
       this.decrement=this.decrement.bind(this);
       this.reset=this.reset.bind(this);
    }
    render() {
    return (
        <div className="App">
          <CounterButton by={1} incrementMethod={this.increment} decrementMethod={this.decrement}/>
          <CounterButton by={5} incrementMethod={this.increment} decrementMethod={this.decrement}/>
          <CounterButton by={10} incrementMethod={this.increment} decrementMethod={this.decrement}/>
          <span className="count">{this.state.counter}</span>
          <div><button className="reset" onClick={this.reset}>Reset</button></div>
        </div>
      );
}

reset(){
    this.setState(
        (prevState) => {
        return {counter: 0}
    });
}
//increment = () => {
    increment(by) {
        //console.log(`Increment from Child - ${by}`);
        //this.setState({
        //    counter: this.state.counter + by
        //});
        this.setState(
            (prevState) => {
            return {counter: prevState.counter + by}
        });
      }

      decrement(by) {
        //console.log(`Increment from Child - ${by}`);
        //this.setState({
        //    counter: this.state.counter + by
        //});
        this.setState(
            (prevState) => {
            return {counter: prevState.counter - by}
        });
      }
}

class CounterButton extends Component{

    //Define the initial state in a constructor
    //state => counter 0
    constructor() {
        super();
    }
    render() {
        const style= {fontSize: "50px", padding: "15px 30px"}; //let is Block Scoped variables
        return (
            <div className="counter">
            <button onClick={() => this.props.incrementMethod(this.props.by)}>+{this.props.by}</button>
            <button onClick={() => this.props.decrementMethod(this.props.by)}>-{this.props.by}</button>
            {/*<span className="count" style={style}>{this.state.counter}</span>*/}
            </div>
        );
  }
}

CounterButton.defaultProps = {
    by : 1
}

CounterButton.propTypes = {
 by: PropTypes.number

}
export default Counter;