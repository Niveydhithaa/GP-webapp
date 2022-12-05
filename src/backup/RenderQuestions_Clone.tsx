import React, { Component } from 'react';
import { render } from 'react-dom';
import siteJson from "data/sites_master_mod.json"
import {Box, Button, TextField} from "@mui/material"
interface IProps {
    id: string
  }
  
  interface IState {
    object: Object
    state_name: string
    state_val: any
  }

export default class RenderQuestions_Clone extends Component<IProps, IState> {
    counter: number;
    constructor(props: IProps) {
    super(props);
    this.state = {
      object: {},
      state_name: "",
      state_val: null
    };
    this.update = this.update.bind(this);
    this.counter = 1;
  }
  update() {
    if ((this.refs.input as any).value.trim() != '') {
      const object = (this.state as any).object;
      object['field' + this.counter++] = (this.refs.input as any).value;
      this.setState({ object });
      (this.refs.input as any).select();
    }
  }
  updateStateNames(newState: string) {
        const object = (this.state as any).object;
        object[newState] = "samplevalue";
        this.setState({ object });    
  }
  render() {
    return (
      <div>
        {JSON.stringify((this.state as any).object)}
        <br />
        <br />
        <input ref="input" placeholder="Type some text..." />
        <Button onClick={this.update}>UPDATE</Button>
        <br />
        <br />
        <h2>For our usecase</h2>
        <>
        {
            siteJson[0].screens[0].state_variables?.map((item) => {
                this.updateStateNames(item)
            })
        }
        </>
        <ul>
          {/* {Object.values((this.state as any).object).map(v => (
            // <li>{v}</li>
          ))} */}
        </ul>
      </div>
    );
  }
  componentDidMount() {
    // this.refs.input.focus();
  }
}