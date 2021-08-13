/*
HTML CSS
----------

CSS:
-----
css is all about:
- font


---------------
CSS Units:
https://www.youtube.com/watch?v=-GR52czEd-0

1 rem - relative to root element (1 unit = 100% of root font)
1 em - relative to parent element (1 unit = 100% of parent element's font-size)
50% - you can also specify font by percent which behaves just like em which is relative to a parent




- boxes

- Borders and padding and margin play in to the relative sizing of child elements. So a child element that is 100% width (is 100% of the parent's width) may overflow if the parent has padding, margin, border in the mix.

- boxes as they relate to layout

- levels (floating or fixed)

---------------
Positions:
https://www.youtube.com/watch?v=jx5jmI0UlXU

position: static <= by default. This means children will be within a parent element and inheirit their properties.

position: relative <= left, right, top, bottom allow you to adjust the position of an element where it would natrually be if it were position=static.

    - relative is not a good one to use because it takes it out of the document flow and the element is by itself on it's own layer and only connected to the parent element and where it would naturally be relative to the parent element

    - the element will be removed from the document flow

position: absolute <= this is where the element would be statically but all the other elements connected to it layout as if this element didn't exist.

    - absolute can have a top, bottom, right, left params but it will adjust the position to the nearest parent element that is position relative. If the parent is not position relative, the top-bottom-right-left will be relative to the html document itself. Therefore, the most common use-case for position relative is a parent element of an item that will have position absolute.

position: fixed <= they stay in the same position on the screen. And they also stay in the same position as you scroll.

    - the difference between fixed and absolute is that fixed is fixed relative to the screen. Absolute stays at a position on the page and you can scroll past it.

position: sticky <= think sticky buy box and how it is relative until you scroll, then it becomes stuck at a certain position

----------
it always goes from

margin (exterior)
border =====
padding (interior)
element text

----------
Flexbox:
https://www.youtube.com/watch?v=fYq5PXgSsbE

define main axis direction
----------
flex-direction: row | column

justify content along main axis
----------
justify-content: flex-start | center | space-evenly (evenly divides white space) | space-between (takes up space of entire box) | space-around

justify content along cross-axis
----------
align-items: (default) stretch | flex-start (keeps items their same size but at top of row or at left of column) | center (centers items along the axis)

multi-line flexbox that wraps (doesn't smash when you resize the window)
----------
flex-wrap: wrap;

multi-line align content (like justify-content)
----------
align-content: flex-start | flex-end | space-between | space-evenly

aligns the items either at top or bottom of the container that is now multi-line


--------
border-box


---------
display properties

https://www.youtube.com/watch?v=Qf-wVa9y9V4

display: block - full width
display: inline - inline
display: inline-block - same as inline but you can control the element height and width

div - are display block as default (takes up entire width)
span


---------
Box model

https://www.youtube.com/watch?v=rIO5326FgPE

width
padding
border
margin
box-sizing: border-box <= enables border and padding to be considered in the height and width of an element.


--------
Grid
https://www.youtube.com/watch?v=9zBsdzdE4sM


*/