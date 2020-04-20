# ESLint Config

This is my personal ESLint config, describing the code style I use for my personal projects. This style is based on the popular [airbnb](https://github.com/airbnb/javascript) code style, with some additions and tweaks.

## Usage

### Installation

To use this in a project, do the following:

```
npm install --save-dev "@maienm/eslint-config"
```

Then make your `.eslintrc.json` extend from this config:

``` json
{
	"extends": "@maienm/eslint-config"
}
```

## Deviations from airbnb

### Group shorthand properties <a name="airbnb-grouped-shorthand" href="#airbnb-grouped-shorthand" style="font-size: 60%;">`airbnb-grouped-shorthand`</a>

This rule overrides [airbnb](https://github.com/airbnb/javascript#objects--grouped-shorthand).

It is not required to group shorthand properties at the beginning of your object declaration.

> Why? Because sometimes it makes sense to group things together in a certain way, and this meaning of the variable is more important than the way it is defined.

### Multiline comments <a name="airbnb-comments-multiline" href="#airbnb-comments-multiline" style="font-size: 60%;">`airbnb-comments-multiline`</a>

This rule overrides [airbnb](https://github.com/airbnb/javascript#comments--multiline).

Use multiline comments (`/** ... */`) only for JSDoc comments. Use single-line comments (`// ...`) for all other comments. Don't wrap either of these at the line length.

> Why? Because there is no need for multiline comments outside of JSDoc if you [don't wrap text](#maienm-dont-wrap-text).

### Indents <a name="airbnb-indent" href="#airbnb-indent" style="font-size: 60%;">`airbnb-indent`</a>

This rule overrides [airbnb](https://github.com/airbnb/javascript#whitespace--spaces).

Use hard tabs (`\t`). For line length purposes, these will count as 4 characters.

> Why? Enables each developer to use the indentation width of their own preference.

### Max line length <a name="airbnb-max-len" href="#airbnb-max-len" style="font-size: 60%;">`airbnb-max-len`</a>

This rule overrides [airbnb](https://github.com/airbnb/javascript#whitespace--max-len).

Set the max line length to 120. Tabs will be counted as 4 characters. Comments, markdown, and long text are excluded from this because you should [not wrap text](#maienm-dont-wrap-text) if you can help it.

> Why? Avoiding long lines aids readability. 100 is somewhat low, 120 works fine, and still allows two side-by-side files in most cases.

### Allow using UPPERCASE_VARIABLES for non-exports <a name="airbnb-shout-case" href="#airbnb-shout-case" style="font-size: 60%;">`airbnb-shout-case`</a>

This rule overrides [airbnb](https://github.com/airbnb/javascript#naming--uppercase).

It is common to use `SHOUT_CASE` for constants that are defined once and then never changed. Usually these would be compile-time constants; in JavaScript no such thing exists, but this naming scheme is a useful reminder that they should be treated as such.

The other points outlines in the airbnb guide stand, so:

1. The variable must be a const.
2. The variable and its nested properties must *never* be changed. Treat it as if it were a compile-time constant.

> Why? By following these rules it becomes immediately apparant that a variable is a constant, and that you can trust it (and its properties) to never change during runtime.

## Additional rules

### Don't wrap text <a name="maienm-dont-wrap-text" href="#maienm-dont-wrap-text" style="font-size: 60%;">`maienm-dont-wrap-text`</a>

Don't wrap comments and markdown text at the max line length, but let your editor soft-wrap this.

> Why? People are (generally) better a wrapping code in a readable manner than most editors, but the same cannot be said for text. Hard-wrapping text has the same result as letting the editor handle this, with the downside of having to reflow the paragraph if you change it, and more messy diffs.

### Empty lines <a name="maienm-empty-lines" href="#maienm-empty-lines" style="font-size: 60%;">`maienm-empty-lines`</a>

Don't allow multiple empty lines in a row.

> Why? If you feel like you need this for readability, you should probably be adding more comments instead.

``` javascript
/* bad */
const thing = hello
	.do()
	.a()
	.thing();


const anotherThing = hello
	.do()
	.a()
	.thing();

/* good */
// Comment describing the purpose of thing.
const thing = hello
	.do()
	.a()
	.thing();

// Comment describing the purpose of anotherThing.
const anotherThing = hello
	.do()
	.a()
	.thing();
```

### Require JSDoc <a name="maienm-require-jsdoc" href="#maienm-require-jsdoc" style="font-size: 60%;">`maienm-require-jsdoc`</a>

All non-anonymous functions need to have a JSDoc comment describing their purpose, parameters and return value.

See the [JSDoc guidelines](docs/jsdoc.md) for more details on how to write docs.

> Why? Because reading a comment is easier than reading code. Additionally, the JSDoc describes the intent, while the code only describes the behavior. Knowing the intent can be useful when a function is misbehaving or when something is being refactored.

### Comments format <a name="maienm-comment-format" href="#maienm-comment-format" style="font-size: 60%;">`maienm-comment-format`</a>

A comment should be a proper sentence, starting with a capital letter, and ending with punctuation.

> Why?  Making sure to use proper capitalization and punctuation helps to keep things readable. This might feel fuperfluous for short comments, but it's good to keep these consistent, too. Additionally, comments should generally only be left in places where the code isn't obvious enough by itself, and in such cases it is usually best to err on the side of being a bit more verbose.

``` javascript
/* bad */
// this is a comment
// This is a comment
// this is a comment. This is another comment.

/* good */
// This is a comment.
// This is a comment. This is another comment.
```

### Import order <a name="maienm-import-order" href="#maienm-import-order" style="font-size: 60%;">`maienm-import-order`</a>

These rules come from a fork of [eslint-plugin-import](https://github.com/MaienM/eslint-plugin-import).

Enforce a consistent import order:

- Imports from modules, sorted alphabetally by module name.
- Imports from parent directories. The higher up the tree, the higher up the import. Within that, sorted alphabetically on file name.
- Imports from the current directory, sorted alphabetically on file name.

> Why? This makes it easier to see the dependencies of a file (both external and internal). Alphabetical sort prevents an identical set of dependencies being in a different order in different files, for consistency.

``` javascript
// bad
import _ from 'lodash';
import GrandParent from '../../GrandParent';
import React from 'react';
import Sibling from './Sibling';
import PropTypes from 'prop-types';
import Parent from '../Parent';
import { Table } from 'material-ui';

// good
import _ from 'lodash';
import { Table } from 'material-ui';
import PropTypes from 'prop-types';
import React from 'react';
import GrandParent from '../../GrandParent';
import Parent from '../Parent';
import Sibling from './Sibling';
```

## React

### Callback and handler names <a name="maienm-react-callback-names" href="#maienm-react-callback-names" style="font-size: 60%;">`maienm-react-callback-names`</a>

Enforce consistent names for callbacks in props (`on*`) and in methods that are passed as props to other components (`handle*`).

> Why? By using these conventions you signal your intent clearly.

### Conditional JSX <a name="maienm-react-conditional-jsx" href="#maienm-react-conditional-jsx" style="font-size: 60%;">`maienm-react-conditional-jsx`</a>

Conditional JSX should be similar to normal JSX in style. That is, multiline components in parenthesis and on their own
lines. Use ternary only if both branches are used, and use `&&` otherwise, making sure to cast truthy values to
booleans.

> Why? The regular JSX style is chosen for readability, and there's no reason for conditional JSX to be different.
 
``` javascript
const doRender = truthyValue;

// bad
const a = (
	<div>
		{doRender ? <span
			class="text"
		/> : null}
	</div>
)

// good
const b = (
	<div>
		{!!doRender && <span class="text" />}
	</div>
)

// also good, if the inner component needs to be multiline
const c = (
	<div>
		{!!doRender && (
			<div>
				<span>Here be dragons.</span>
			</div>
		)}
	</div>
)

// also good, if there's something for both branches
const d = (
	<div>
		{doRender ? (
			<span>Here be dragons.</span>
		) : (
			<span class="dead-dragons">Here used to be dragons, long ago.</span>
		)}
	</div>
)
```

### JSDoc in React <a name="maienm-react-jsdoc" href="#maienm-react-jsdoc" style="font-size: 60%;">`maienm-react-jsdoc`</a>

These are additions to the regular [JSDoc require rules](#maienm-require-jsdoc).

#### PropTypes

The propTypes are an important part of the interface of a component, and should therefore be documented. This means that all propTypes should have a JSDoc block. For all built-in types the type is clear and can be skipped, for custom types/validators it should be specified.

#### Not all methods are created equally

In general, JSDoc is required for _all_ methods. There are some methods in React components that this is not particularly valuable for, mostly because the purpose of the method is clear (and documented by React), and the actions it performs in detail are an irrelevant implementation detail, leaving little to comment on. For these the documentation requirement is lifted.

- Subclasses of `React.Component`
	- `constructor`
	- `render`
	- `componentDidCatch`
	- `componentDidMount`
	- `componentDidUpdate`
	- `componentWillUnmount`
	- `getDerivedStateFromError`
	- `getDerivedStateFromProps`
	- `getSnapshotBeforeUpdate`
	- `shouldComponentUpdate`

NOTE: The `UNSAFE_*` methods are not in the list above, and this is intentional. These should be avoided, but if they are needed anyway for some reason this should _definitely_ be documented.

> Why? Because if there's nothing useful to say about a method, just don't say anything.

### Destructure state <a name="maienm-react-destructure-state" href="#maienm-react-destructure-state" style="font-size: 60%;">`maienm-react-destructure-state`</a>

Always destructure `context`, `props`, and `state` at the start of methods in which these are used, in that order.

> Why? To avoid the verbosity and useless repetition of `this.context`, `this.props` and `this.state`, and to make it immediately clear what data is used in a method.
```

