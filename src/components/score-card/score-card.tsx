import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'pxb-scorecard',
  shadow: false,
})
export class Scorecard {
  /**
   * The first name
   */
  @Prop() firstProp: string;

  render() {
    return <div style={{ width: '400px', height: '400px', background: 'red'}}>
      Scorecarsd {this.firstProp}
    </div>;
  }
}
