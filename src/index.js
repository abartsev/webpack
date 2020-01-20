import Post from './Post';
import json from './assets/json';
import Img from './assets/cat.png'
import './styles/style.css';

const post = new Post('Webpack Post Title', Img);
console.log(post.toString());
console.log(json);

