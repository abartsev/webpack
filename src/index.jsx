import * as $ from 'jquery';
import React from 'react';
import {render} from 'react-dom';
import Post from '@models/Post';
import json from './assets/json';
import Img from './assets/cat.png'
import './styles/style.css';
import './styles/style.less';
import './babel';

const post = new Post('Webpack Post Title', Img);
$('pre').html(post.toString());
console.log(post.toString());
console.log(json);

const App = () => {
    return (
        <div>
            Hello, I'm react jsx
        </div>
    )
}

render(<App />, document.getElementById('app'))
