# Rick and Morty Character Explorer

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

Welcome to the Rick and Morty Character Explorer! This React-based frontend project allows you to browse and explore character data from the popular TV show "Rick and Morty" using the [Rick and Morty API](https://rickandmortyapi.com/).

## Table of Contents

- [Live Demo](#live-demo)
- [Features](#features)
- [Installation](#installation)

## Live Demo

Check out the live demo of the Rick and Morty Character Explorer [here](https://lovecamilletw.github.io/rick-and-morty/).

## Features

### Infinite Scrolling

- Implements infinite scrolling using React Query and Intersection Observer.
- Load more character data as you scroll down, providing a seamless browsing experience.

### Search Functionality with Debounce

- Implements a search feature that allows users to search for characters.
- Utilizes the debounce technique to delay the search API requests until the user finishes typing, reducing unnecessary server calls and improving performance.

## Installation

```shell
git clone https://github.com/loveCamilleTW/rick-and-morty.git
cd rick-and-morty
npm install && npm run dev
```
