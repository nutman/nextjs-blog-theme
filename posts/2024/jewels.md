---
title: "Create a match 3 game in 300 lines"
date: "2022-03-25"
author: "Volodymyr Loban"
---

Some time ago I started to create a popular match 3 game. It was very exiting because of very begging of my career, that I have made a pause for long time and now I decided to check how it works and share my experience. So we will need 5 steps for it:

## Setup the Game Canvas and Grid:
I pick CreateJS library to save some space and focus on developing game and not fighting with Canvas. We will create canvas and game field with grid. I managed grid with CSS.

```css
#fieldGrid {
    display: block;
    margin: auto;
    background-image: url('../img/bg.png');
}
```
![Setup grid](/assets/jewels/field.png)

## Generate and Render Initial Level:
Pretty easy, we will need an initial jewel generator:

```typescript
function GenerateNewJewel(i, j) {
  const r = Math.floor(Math.random() * INDEX_RANDOM) % images.length;
  const bitmap = new createjs.Bitmap(loader.getResult(images[r].id));
  const hit = new createjs.Shape();

  hit.graphics.beginFill(COLOR_BLACK).drawRect(0, 0, bitmap.getBounds().width, bitmap.getBounds().height);

  [bitmap.x, bitmap.y] = [j * 100 | 0, i * 100 | 0];
  [bitmap.CoordinateX, bitmap.CoordinateY] = [j, i];

  bitmap.hitArea = hit;
  bitmap.name = images[r].id;
  bitmap.cursor = "pointer";
  bitmap.addEventListener('click', jewelClick);

  return bitmap;
}
```
and fill the level:
```typescript
function fillLevel() {
  for (let i = 0; i < 8; i++) {
    const container = new createjs.Container();
    for (let j = 0; j < 8; j++) {
      container.addChild(new GenerateNewJewel(i, j));
    }
    stage.addChild(container);
  }
}

```
![Application Architecture](/assets/jewels/fill-level.png)

## Implement User Interaction:
It is a little bit more complex because of data manipulation and data manipulation. We will need to switch element in our elements in matrix and handle animation effect:

```typescript
function replaceJewels(target, select) {
  const selectedCoordinateX = select[0].CoordinateX;
  const selectedCoordinateY = select[0].CoordinateY;
  const targetCoordinateX = target.CoordinateX;
  const targetCoordinateY = target.CoordinateY;

  createjs.Tween.get(select[0], {loop: false}, true)
    .to({x: targetCoordinateX * 100, y: targetCoordinateY * 100}, JEM_SWITCH_TIME, createjs.Ease.Ease);

  createjs.Tween.get(target, {loop: false}, true)
    .to({x: selectedCoordinateX * 100, y: selectedCoordinateY * 100}, JEM_SWITCH_TIME, createjs.Ease.Ease)
    .call(function () {
      select[0].CoordinateX = targetCoordinateX;
      select[0].CoordinateY = targetCoordinateY;
      target.CoordinateX = selectedCoordinateX;
      target.CoordinateY = selectedCoordinateY;

      stage.children[target.CoordinateY].children[target.CoordinateX] = target;
      stage.children[select[0].CoordinateY].children[select[0].CoordinateX] = select[0];

      if (!checkStage()) {
        setTimeout(() => {
          replaceJewelsBack(target, select, targetCoordinateX, targetCoordinateY, selectedCoordinateX, selectedCoordinateY);
        }, JEM_SWITCH_TIMEOUT);
      }
    });
}
```
I use timeouts for better user experience, you can successfully remove them, nothing will brake.

![Application Architecture](/assets/jewels/replace-jewels.gif)

## Match Detection and Jewel Removal:

This is one of the most interesting parts, we need to scan matrix for more match 3. Implement logic to detect matches of three or more identical jewels in a row or column. Remove matched jewels from the grid. Update the grid accordingly (e.g., shift jewels down to fill empty spaces).

```typescript

function checkStage() {
  const result = [];
  if (!stage?.children) return;
  checkRowsAndCols(stage, result)

  if (result.length !== 0) {
    score += new Set(result.flat()).size;
    updateScore(score)

    slideDownJewels(result);
    setTimeout(() => {
      stage.addEventListener("tick", checkStage);
    }, TIMEOUT)

    return true;
  }

  stage.removeEventListener("tick", checkStage);

  return false;
}

```

![Application Architecture](/assets/jewels/slide-jewels.png)

## Score Tracking and Game Loop:
Implement score tracking logic based on the number of jewels removed in each move is pretty simple. Check for available moves or grid states that allow moves is the most interesting part and has a lot of options.

![Application Architecture](/assets/jewels/score.png)
If no moves are possible, end the game or shuffle the grid to create new matches (Game Over for this example).
Feel free to mplement a game loop to continuously update the game state and render changes.

Remember, this is a simplified overview, and building a full-fledged Bejeweled game can involve more complex features like special jewel types, animations, sound effects, levels, and more. Additionally, you'll need to consider performance optimizations, user interface design, and cross-browser compatibility if you're building for the web.

The full code can be found [here](https://github.com/nutman/jewels)

Play the game you can [here](https://htmlpreview.github.io/?https://github.com/nutman/jewels/blob/master/index.html)
