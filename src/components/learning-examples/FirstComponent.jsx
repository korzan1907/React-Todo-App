import { Component } from 'react';

export default function FirstComponent() {
    return (
      <div className="firstComponent">
        First Component
      </div>
    );
  }

  export class ThirdComponent extends Component{
    render() {
    return (
      <div className="thirdComponent">
        ThirdComponent
      </div>
    );
  }
  }