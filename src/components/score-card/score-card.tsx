import {Component, h, Prop } from '@stencil/core';

/**
 * @slot title - first line header
 * @slot subtitle - second line header
 * @slot info - third line header
 * @slot body - custom content
 */
@Component({
  tag: 'pxb-score-card',
  styleUrl: './score-card.css',
  shadow: false,
})
export class ScoreCard {

  _styleOverrides: {
    container?: any;
    header?: any;
    title?: any;
    subtitle?: any;
    info?: any;
    body?: any;
  }

  /**
   * class overrides
   */
  @Prop() styles: string;

  componentWillLoad() {
    if (this.styles) {
      this._styleOverrides = JSON.parse(this.styles);
    }
  }

  render() {
    return (
      <div class='pxb-container' style={this._styleOverrides?.container}>
        <div class='pxb-header'  style={this._styleOverrides?.header}>
          <div class='pxb-title'  style={this._styleOverrides?.title}>
            <slot name='pxb-title' />
          </div>
          <div class='pxb-subtitle'  style={this._styleOverrides?.subtitle}>
            <slot name='pxb-subtitle'/>
          </div>
          <div class='pxb-info'  style={this._styleOverrides?.info}>
            <slot name='pxb-info'/>
          </div>
        </div>
        <div class='pxb-body'  style={this._styleOverrides?.body}>
          <slot name='pxb-body' />
        </div>
      </div>
    );
  }
}
