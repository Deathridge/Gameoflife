import React from 'react';
import ReactDOM from 'react-dom';
import {render} from 'react-dom';
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import Game from './components/Game.jsx';
require('../stylesheets/main.scss');

ReactDOM.render(<Game/>, document.getElementById('app') );

