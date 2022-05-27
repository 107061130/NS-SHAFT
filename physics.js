import Matter from "matter-js";
import { getRandom } from "./utils/random";
import { Dimensions } from 'react-native'


const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width

const Physics = (entities, { touches, time, dispatch }) => {
    let engine = entities.physics.engine

    // move right and left
    touches.filter(t => t.type === 'press')
        .forEach(t => {
            if (t.event.pageX < windowWidth * 0.45) {
                Matter.Body.translate(entities.Bird.body, {
                    x: -windowWidth * 0.05,
                    y: 0
                })
            }
            if (t.event.pageX > windowWidth * 0.55) {
                Matter.Body.translate(entities.Bird.body, {
                    x: windowWidth * 0.05,
                    y: 0
                })
            }
        })
    
    Matter.Engine.update(engine, time.delta)

    for (let index = 1; index <= 8; index++) {
        if (entities[`Obstacle${index}`].body.bounds.min.y <= windowHeight * 0.1) {
            const pipe_xPos = getRandom(windowWidth * 0.1, windowWidth * 0.9);
            Matter.Body.setPosition(entities[`Obstacle${index}`].body, { x: pipe_xPos, y: windowHeight * 0.95 })
            dispatch({ type: 'new_point' })
            //Matter.World.remove(engine.world, 'Obstacle${index}')
        }
        Matter.Body.translate(entities[`Obstacle${index}`].body, { x: 0, y: -2 })
    }

    // don't exceed x border
    if (entities[`Bird`].body.bounds.min.x < 0) {
        Matter.Body.translate(entities[`Bird`].body, { x: windowWidth * 0.05, y: 0 })
    }
    if (entities[`Bird`].body.bounds.max.x > windowWidth) {
        Matter.Body.translate(entities[`Bird`].body, { x: -windowWidth * 0.05, y: 0 })
    }

    var previous = null;
    
    Matter.Events.on(engine, 'collisionStart', (event) => {
        var pairs = event.pairs;

        var objA = pairs[0].bodyA.label;
        var objB = pairs[0].bodyB.label;

        // game over
        if (objA === "Bird" && objB === "Floor") {
            dispatch({ type: "game_over" })
        }
        // bounce
        if (objA === "Bird" && objB === "Obstacle3" || objA === "Bird" && objB === "Obstacle7") {
            Matter.Body.setVelocity(entities.Bird.body, {
                x: 0,
                y: -7
            })
        }
        /*
        if (objA === "Bird" && previous != objB) {
            dispatch({ type: 'new_point' })
        }
        previous = objB;
        */
    })
    
    

    return entities;
}
export default Physics