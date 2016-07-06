# Refraction Player

[![Travis](https://img.shields.io/travis/mbasso/refraction-player.svg?maxAge=2592000)](https://travis-ci.org/mbasso/refraction-player)
[![npm version](https://img.shields.io/npm/v/refraction-player.svg)](https://www.npmjs.com/package/refraction-player)
[![npm downloads](https://img.shields.io/npm/dm/refraction-player.svg?maxAge=2592000)](https://www.npmjs.com/package/refraction-player)
[![Coveralls](https://img.shields.io/coveralls/mbasso/refraction-player.svg?maxAge=2592000)](https://coveralls.io/github/mbasso/refraction-player)

> An events player for refraction

Refraction Player is a small library that allow you to play a list of events with refraction. [Here](https://mbasso.github.com/refraction/docs/basics/Replay.html) you can see its idea. Refraction Player can be used to automate some process, testing and debugging. If we want to test something we can prepare a series of events and use Refraction Player to play them in order to see how our application react to these events. If we want to find a bug after an application crash, we can send Refraction history to our server and replay events to identify the problem. Finally if we want to automate some process, we can prepare a list of events and play them to achieve this result.
For example, we can create an automatic tutorial for application using this tool.

## Installation

You can install Refraction Player using [npm](https://www.npmjs.com/package/refraction-player):

```bash
npm install --save refraction-player
```

If you aren't using npm in your project, you can include RefractionPlayer using UMD build in the dist folder with `<script>` tag.

## Usage

Refraction Player export only one function to achieve its purpose. You can import it in this way:

```js
import play from 'refraction-player';
```

At this point `play` is a function that returns nothing and accept an object with these properties as parameter:

|Property   |Type   |Default   |Description   |
|-----------|-------|----------|--------------|
| refraction | Refraction |  | Refraction instance that refraction-player uses to publish events |
| track | Array of `{ channel: String, time: number(ms), param: any }` | [] | Array of objects that specify on which channel publish the payload. `time` property indicate the timestap of the event, time between two events is calulated as follow: secondTime - firstTime = delay |
| exclude | Array of channels | [] | Array of channels that will be ignored |
| delay | number (milliseconds) | 200 | Constant number of milliseconds that will pass between two publications. This is used only if `ignoreTime` is true or `time` property is null or undefined |
| ignoreTime | boolean | false | Indicate if refraction-player must use `delay` or not. If false refraction-player will use `time` property in payload |

**N.B.** When you use this function you have to pay attention at middlewares. Consider that middlewares will be applied to your messages, so, if you get them from history, you have to be sure that middlewares have some checks that avoid unwanted transformations.

## Examples

You can find an example of Refraction Player in Refraction repository [here](). Alternatively, you can check [awesome-refraction](https://github.com/mbasso/awesome-refraction).

If you want to run examples, check out the instruction [here](https://mbasso.github.com/refraction/docs/introduction/Examples.html).

## Change Log

This project adheres to [Semantic Versioning](http://semver.org/).  
Every release, along with the migration instructions, is documented on the Github [Releases](https://github.com/mbasso/refraction-player/releases) page.

## Authors
**Matteo Basso**
- [github/mbasso](https://github.com/mbasso)
- [@Teo_Basso](https://twitter.com/Teo_Basso)

**Adriano Buscema**
- [github/adribusc](https://github.com/adribusc)

## Copyright and License
Copyright (c) 2016, Matteo Basso.

refraction-player source code is licensed under the [MIT License](https://github.com/mbasso/refraction-player/blob/master/LICENSE.md).
