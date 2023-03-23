# Text Truncate Scroll ✨

<a href="https://www.npmjs.com/package/text-truncate-scroll" rel="nofollow"><img src="https://img.shields.io/npm/v/text-truncate-scroll" alt="npm"></a>
<a href="https://opensource.org/licenses/MIT" rel="nofollow"><img src="https://img.shields.io/github/license/jayli3n/text-truncate-scroll" alt="License"></a>
<a href="https://github.com/jayli3n" rel="nofollow"><img src="https://img.shields.io/badge/created%20by-%40jayli3n-598fe5" alt="Created by James Li"></a>

A light-weight js utility that truncates overflowing text in a container with ellipsis, and shows the text content on hover with a scroll effect.

* Works with any front-end framework (React, VueJS, Angular, Svelte etc.)
* Works in typescript
* Works on mobile / touch
* Simple and light-weight (~5 kb)
* Install with NPM or CDN

**P.S.** It's fine to call `activateTextTruncateScroll()` multiple times because it will not re-apply text truncate to elements that has already been applied.

**🔗 DEMO:** https://jayli3n.github.io/text-truncate-scroll/

![Animation](https://user-images.githubusercontent.com/44139980/222964502-739b1397-addd-4ae3-bf57-1d5d77a19452.gif)


## Installation

### NPM
```
npm i text-truncate-scroll
```

### CDN
```
<script src="https://unpkg.com/text-truncate-scroll/lib/index.js"></script>
```

## Usage

1. Render a DOM element with text content

```html
<p class="text-truncate-scroll">
	Imagine you don't know how long this text label will be, that's a responsiveness headache 😭
</p>
```

2. Once the DOM element is rendered, you simply call the setup function
```ts
import { activateTextTruncateScroll } from "text-truncate-scroll"

// In the onmount life-cycle hook of your UI framework...
activateTextTruncateScroll()
```

## API

### `activateTextTruncateScroll(options: {...})`

#### Parameters

`options` *optional*

|Property|Type|Default|Description|
|------|----|-------|-----------|
|className|string|text-truncate-scroll|The class name to search for and to apply the text truncate logic.|
|scrollSpeed|number|60|This is the speed of the text scroll. Play around with different values for what you're after.|
|timeoutBeforeInit|number|90|The amount of time to wait before running the setup logic. This is recommended because sometimes DOM elements may take time to completely mount, so it's good idea to give a small wait.|

## Some examples with UI frameworks

### React

```ts
import { activateTextTruncateScroll } from "text-truncate-scroll"

const App = () => {
	useEffect(() => {
		activateTextTruncateScroll()
	}, [])

	return {
		<div>
			<p class="text-truncate-scroll">Some really long text</p>
		</div>
	}
}
```

### VueJS

```html
<script setup lang="ts">
import { onMounted } from "vue"
import { activateTextTruncateScroll } from "text-truncate-scroll"

onMounted(() => {
	activateTextTruncateScroll()
})
</script>

<template>
	<div>
		<p class="text-truncate-scroll">Some really long text</p>
	</div>
</template>
```

### Angular

```ts
import { Component } from '@angular/core';
import { activateTextTruncateScroll } from "text-truncate-scroll"

@Component({
  selector: 'app',
  template: `
	<div>
		<p class="text-truncate-scroll">Some really long text</p>
	</div>
   `
})

export class App {
   constructor() {
      activateTextTruncateScroll()
   }
}
```

### Svelte

```html
<script>
import { onMount } from 'svelte';
import { activateTextTruncateScroll } from "text-truncate-scroll"

onMount(() => {
	activateTextTruncateScroll()
})
</script>

<div>
   <p class="text-truncate-scroll">Some really long text</p>
</div>
```

# Contribution

Pull requests are welcomed! 😄
<br />
If you have any problems or questions, [open an issue](https://github.com/jayli3n/text-truncate-scroll/issues).
