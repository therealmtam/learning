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










--------------------------
CSS cheat sheet:

elements
---------
HTML ELEMENTS -

- list of all possible html elements = https://www.w3schools.com/tags/default.asp

- html elements are designed to help Google understand what your site is about and also for the dom to handle things in a specific way. So you don't need <article> and could use a div unless you'd like to group by these elements. <blockquote> will change the characteristics of an element and indent it. So certain elements do change the view.

So the more bare-bones element you use, the more flexibility you have to style and change it. And a <div> is a more bare-bones version of most of these elements. It can be used to group elements and style them in a certain way.
-------
So things to think about when determining the element(s) to use:

- the more readable elements, the easier web-crawlers (for SEO) can understand your page's contents

- how to group for styling? (use specific elements based on use-case or use divs)

- use certain elements for their innate styling attributes (ex. <p>) and for grouping (being able to target all p tags and style them a certain way)

-  certain elements will need to be used (<img>) when you need the html parser to perform work such as fetch images and render them on the page.





GROUPING STRATEGIES:
---------
- use id or class names on elements to group them
- you can also use the element type as a grouping method as well



=====================
UNITS OF MEASURE:


https://www.youtube.com/watch?v=-GR52czEd-0

1 rem - relative to root element (1 unit = 100% of root font)

1 em - relative to parent element (1 unit = 100% of parent element's font-size)

50% - you can also specify font by percent which behaves just like em which is relative to a parent

1 px - pixel sizes

- for simplicity sake, it is best to style things on an individual basis but grouped by class
- this is why

=====================
ELEMENT PROPERTIES:

----------------------------------
ALL PROPERTIES HAVE:
----------------------------------
- all properties have
    - inherit
    - initial
    - revert
    - unset

----------------------------------
POSITION:

- https://www.w3schools.com/css/css_positioning.asp
- https://www.youtube.com/watch?v=jx5jmI0UlXU
- https://www.youtube.com/watch?v=NzjU1GmKosQ
----------------------------------

- applies to any element (ex. <p>, <div>, ...)
- allows you to position an element relative to different parts of the page

- position: static //default - element follows the natural document flow as if you didn't try and move it around

- if (position: relative) {

    // you can add additional properties to change the position of an element RELATIVE to where it normally would be in the document flow

    left:
    top:
    right:
    bottom:
    z-index: -1; // -1 is behind the main layer, 0 is main layer, 1 is layer above and the element will cover the 0 layer elements. But because naturally

    // it will also be removed (ex. on a layer of itself) above the document so if you move left, it will move left relative to where it would have been in the document flow regardless of the components around it (basically on a position-z)

    // relative is typically used to set a position on a parent container of an element that is position: absolute.

} else if (position: fixed) {

    // you can add the same properties

    // based on the properties, the position moves left, down, up, right FIXED relative to WHERE IT APPEARS ON THE PAGE IN THE DOCUMENT FLOW.

    // So if the element is normally at the halfway point of the page when you've scrolled to the top of the page, fixed + the position properties will move the element relative to that initial position on the page.

    // the element will be on a layer of its own above the regular document flow

    // fixed WILL CHANGE THE DOCUMENT FLOW and remove the element from the flow. So the elements below it will all move up.

    // to make a sticky header that moves with you as you scroll, set the header div position as fixed and
    top: 0px;

} else if (position: absolute) {

    // unlike fixed, this will not be fixed relative to the viewport. It will be fixed relative to the nearest positioned ancestor (a parent element above it that is positioned). The positioned ancenstor NEEDS to be something other than static (ex. relative).

    // so position: absolute; z-index: -1; will make an element that is a child (in this case an image) removed from the document flow and placed on the layer behind the document flow that the <h1> is on in this case (layer 0).

        <h1>header</h1>
        <img style=position: absolute; z-index: -1 src='' />

    // another use case is just applying position: absolute; top: 0px to an element which will remove it from the document flow and make it 0px from the top of the nearest positioned ancestor. Then you style the parent of the element as position: relative which will make the element be 0px from the top of the parent element and now it can be positioned relative to parent container.

     - see for example => https://youtu.be/jx5jmI0UlXU?t=233


} else {

    position: sticky // & top: 0px => sticks to top of screen when you scroll past it

    // see https://www.w3schools.com/css/css_positioning.asp
    position:
        - absolute
}

- how to think about position:

    - position will enable removal of an element from the document flow (common ones - relative, sticky, fixed)

        - use-cases are when you want to remove an element from the document flow for:

            - anything that you want to move with you as you scroll down the document
                - header / sticky header
                - sticky buy-box
                - a chat box at the bottom of the screen for customer service

    - position is also needed to position elements out of the normal document flow when WITHIN an element that has been removed from the document flow.

        - use-cases - not sure when you want to really just remove an element from the normal document flow unless you would want it to move with you as you scroll.

----------------------------------
BOX MODEL PROPERTIES OF AN ELEMENT:
----------------------------------
- it always goes from

    margin (exterior padding)
    border (=====, border type, color, etc)
    padding (interior padding)
    element (is text, image, video)

- width & height:
    - default:
        {
            height: auto;
            width: auto;
        }

- max-width & max-height:
    - it overrides the height/width IF the height/width is > max-height/width


- box-sizing:
    - default - box-sizing: content-box
    - only specifiable value = border-box

    - this property is used when you want to specify an element's height and width and want to change what width and height represent
        {
            width: 10px;
            height: 10px
        }

    - if ( box-sizing: content-box ) {

        - actual width of an element = width + padding + border + element size
        - actual height of an element = height + padding + border + element size

        - element size stays the same

    } else if (box-sizing: border-box) {

        - actual width of an element = width
        - actual height of an element = height

        - margin stays the same thickness
        - border stays the same thickness
        - padding stays the same thickness
        - element size REDUCES based on width and height and how much is left after margin, border, and padding are added
            - Note that it won't shrink the actual element (ex. it won't shrink the actual font size of the text in this <p> tag <p>HARO<p> but it will make it look wonky and out of place)
    }


- how to think about when to modify the box-model

    - margin = for positioning to move an element u,d,l,r relative to other elements on the page
        - ex. add spacing around a button (that is visually defined by its border)

        - how to specify
        {
            margin: t r b l <= when you know all sides to space or at least some of the sides in order (goes clockwise, t, r, b, l)

                ex. margin: t r // when you know t and r

            margin-top:  <= when you know the spacing for side(s)
                margin-right:
                margin-bottom:
                margin-left:

            margin: 10px <= when you want it to apply to all sides evenly
        }

    - padding = make the actual box (up to the border) larger or smaller
        - ex. making a button larger or smaller

        - padding can be specified just like how margin is above ^

    - border-box =
        - this is useful in order for developers to know that when they want to specify a width and height of an element, it is the overall size of the component.

    - height & width =
        - these are mainly used for setting the size of these particular elements:

        <canvas>
        <embed>
        <iframe>
        <img>
        <input>
        <object>
        <video>

        - height and width can be used to size any other element, HOWEVER, an element already has border, padding, margin which sum to create a height and width of an element. So, in these use cases, it doesn't make sense to double specify the height and width of an element by explicitly stating the height and width. This will just lead to a double constrained element.

    - max-height & max-width =
        - max-width is mainly used to set the limits of an item to avoid spillover of text or if there is something that you don't know it's size or its size could range
        - use-case - you set the max-width on a <p> so that the text won't just span the entire page

    - good analogy: https://stackoverflow.com/questions/2189452/when-to-use-margin-vs-padding-in-css

        There are more technical explanations for your question, but if you want a way to think about margin and padding, this analogy might help.

        Imagine block elements as picture frames hanging on a wall:

        The photo is the content.
        The matting is the padding.
        The frame moulding is the border.
        The wall is the viewport.
        The space between two frames is the margin.

        With this in mind, a good rule of thumb is to use margin when you want to space an element in relationship to other elements on the wall, and padding when you're adjusting the appearance of the element itself. Margin won't change the size of the element, but padding will make the element bigger.


----------------------------------
DISPLAY PROPERTIES:
- https://www.youtube.com/watch?v=Qf-wVa9y9V4
----------------------------------
- display is about how elements RELATE to the other elements that come before it or after it in the document flow.
    - It can make an element removed from the DOM (display: none;)
    - It can also be used to create a grid for a container in 1 or 2 directions
        flex - 1 direction grid
        grid - 2 direction grid

- elements have a default display property:
    div p: {
        display: block; //default
    }

    .span: {
        display: inline; //default
    }

- properties:
    - block: takes up all the space on the line it is on in the document flow and will bump to the next line if there are other items on the same line.

    - inline: takes up minimum amount of space in the document flow for its element
        - inline CANNOT have a width and height

    - inline-block: same as inline, but you can set the width and height (mainly for images that you want to be present inline)
        - width: 10px;
        - height: 10px;

    - none: this will make the element not exist on the DOM

    - flex:

    - grid:


- how to think about display properties:
    - diplay is the primary property for a page layout.
        - ex. a layout where there are just block elements and inline elements that stack on top of each other

            ROW 1 => <div>Title</div>

            ROW 2 => <span>Left Text</span>
            ROW 2 => <img src='image in the middle' />
            ROW 2 => <span>Right Text</span>

            ROW 3 => <p>text in here</p>    // display: block; default for element

        -   this is a good design for easy readability of your html.


----------------------------------
FLEX BOX:
- https://www.youtube.com/watch?v=fYq5PXgSsbE
----------------------------------

if (display)


----------------------------------
GRID:
----------------------------------


----------------------------------
LAYOUT OF A PAGE:
----------------------------------
- to layout a page, you have to know what you're going to fill in it

- to do layout, you need to know what you want to build.

- design pattern of stacking html elements leveraging their display type:
    - ex.
        ROW 1 => <div>Title</div>

        ROW 2 => <span>Left Text</span>
        ROW 2 => <img src='image in the middle' />
        ROW 2 => <span>Right Text</span>

        ROW 3 => <p>text in here</p>    // display: block; default for element

- by default, html, like any code, is written from top to bottom. Therefore, it is a natural mental model to think of your page in horizontal spanning sections from top to bottom.

- layout is applied to containers
<containers>

    <components>
        <elements>
        </elements>

        <elements>
        </elements>
    </components>

    <components>
        <elements>
        </elements>

        <elements>
        </elements>
    </components>

</containers>
<containers>
    ...
</containers>

-

----------------------------------
FLEXBOX:

- https://www.youtube.com/watch?v=fYq5PXgSsbE
----------------------------------

.container {
    display: flex;

    // define the main axis
    flex-direction:
        - row; //default
        - row-reverse; (from right to left)
        - column;
        - column-reverse; (from right to left)

    // determine how to justify the elements along the main axis
    justify-content:
        - flex-start //default
        - flex-end (right align)
        - center
        - space-evenly (evenly divides white space)
        - space-between (takes up space of entire box)
        - space-around

    // justify content along cross-axis
    align-items:
        - stretch //default
        - flex-start (keeps items their same size but at top of row or at left of column)
        - center (centers items along the axis)

    // enable multi-line flexbox that wraps (doesn't smash when you resize the window)
    flex-wrap:
        - wrap;

    // enable multi-line align content (like justify-content)
    // aligns the items either at top or bottom of the container that is now multi-line
    align-content:
        - flex-start
        - flex-end
        - space-between
        - space-evenly
}

- how to use flexbox:
    - it helps lay items out in a row or column and space them out without having to dynamically update the margins between items in the view port
    -




=====================
BREAK POINTS (SCREEN SIZES):

- The problem is - you need to have your web application viewable on various different device sizes and look good doing so.

- The solution is to setup break points that if your window size hits X, the layout turns into Y. But from X width to almost Y, the view should look acceptable. And then from Y to Z etc.

- For simplicity sake - there should be
- 1 for web (desktop)
- 1 for tablet
- 1 for mweb

How do you control the view?



=====================
BROWSER SUPPORT:

- Depending on the browser, they support different CSS properties.
- you can have fallback CSS using @supports()
- you can have css prepended => ex. position: -webkit-sticky; for safari support of position: sticky.


=====================
CSS - FOR STARTUPS:

- If you're a startup,

    - if you want to design a view from scratch, use a css framework like tailwindcss to insert css inline without having to have style sheets.

    - if you want to skip building components and can get away with a premade design system,you can use a design system like Google's Material UI which has buttons and components already with css set.

    - build your application as a monolith of html
        - have the separation of views by page
        - then organize components and their handlers into their component folders for cleaner code

    - when doing your layout, remember to think about breakpoints and resizing. You want to know what should dynamically adjust as the screen shrinks or grows.

- DRY - how to remain DRY when your codebase grows and consolidating repeated code becomes harder?

    - if you use a css framework and use it to style most of your elements and not create too many class-based groupings of styling, if you want to change a style (ex. a product tile), if you coded your product tile and all other tiles of the same type to look a certain way, then finding them via your view components (ex. a product tile), will be easy as long as you know what are other relatedly styled items.

        - the difficulty with DRY in any code base is once you delegate and the knowledge of the connectivity of the styles of components is not passed along to the next, then how will the person you delegate it to know what other areas to update a style so your theme remains consistent?

            - If you use a css framework, you can easily just add styling to the elements that are missing the styling after you notice the diff on the view.

            - If you provide too much consolidation of styling, then the delegated person needs to have a centralized place to find all the styling for components.

        - I think when you develop, you have 2 ways to lookup the relations of an item (ex. a button used in many places)
            - classname (which is a grouping mechanism)
                - not element type, since usually that grouping is broadly applied and thus most likely not changed frequently unless the entire page needs to be changed
            - component name (ex. in React, components are named and reused)

            - ideally both classname and component names are a 1:1 mapping so even if there is shared styling across components, component class names are unique from other components and thus will have duplicated styling across them.

                - And ideally, for styling across components, try and use a shared html element or elements with a shared classname that name-wise indicates to readers of your css what the grouping is used for. (ex. a <p> or a <p classname='productTile_PTag'>)

        - <containers>

            <components>
                <elements>
                </elements>

                <elements>
                </elements>
            </components>

            <components>
                <elements>
                </elements>

                <elements>
                </elements>
            </components>

        </containers>
        <containers>
            ...
        </containers>




*/