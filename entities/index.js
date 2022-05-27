import Matter from "matter-js"
import Bird from "../components/Bird";
import Floor from "../components/Floor";
import Obstacle from "../components/Obstacle";
import LeftButton from "../components/LeftButton";
import RightButton from "../components/RightButton";
import Ceiling from "../components/Ceiling";

import { Dimensions } from 'react-native'
import { getRandom } from "../utils/random";

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width


export default restart => {
    let engine = Matter.Engine.create({ enableSleeping: false })

    let world = engine.world

    world.gravity.y = 1;

    const pipe1_xPos = getRandom(windowWidth * 0.1, windowWidth * 0.9)
    const pipe2_xPos = getRandom(windowWidth * 0.1, windowWidth * 0.9)
    const pipe3_xPos = getRandom(windowWidth * 0.1, windowWidth * 0.9)
    const pipe4_xPos = getRandom(windowWidth * 0.1, windowWidth * 0.9)
    const pipe5_xPos = getRandom(windowWidth * 0.1, windowWidth * 0.9)
    const pipe6_xPos = getRandom(windowWidth * 0.1, windowWidth * 0.9)
    const pipe7_xPos = getRandom(windowWidth * 0.1, windowWidth * 0.9)
    const pipe8_xPos = getRandom(windowWidth * 0.1, windowWidth * 0.9)

    return {
        physics: { engine, world },

        Bird: Bird(world, 'green', { x: windowWidth / 2, y: windowHeight * 0.18 }, { height: windowHeight * 0.05, width: windowHeight * 0.05 }),
        //LeftButton: LeftButton(world, { x: windowWidth * 0.4, y: windowHeight * 0.95}, { height: 60, width: 60 }),
        //RightButton: RightButton(world, { x: windowWidth * 0.6, y: windowHeight * 0.95 }, { height: 60, width: 60 }),
        Ceiling: Ceiling(world, { x: windowWidth / 2, y: windowHeight * 0.05 }, { height: windowHeight * 0.1, width: windowWidth }),
        Obstacle1: Obstacle(world, 'Obstacle1', 'blue', { x: pipe1_xPos, y: windowHeight * 0.25 }, { height: 15, width: windowWidth * 0.2 }),
        Obstacle2: Obstacle(world, 'Obstacle2', 'red', { x: pipe2_xPos, y: windowHeight * 0.35 }, { height: 15, width: windowWidth * 0.2 }),
        Obstacle3: Obstacle(world, 'Obstacle3', 'green', { x: pipe3_xPos, y: windowHeight * 0.45 }, { height: 15, width: windowWidth * 0.2 }),
        Obstacle4: Obstacle(world, 'Obstacle4', 'blue', { x: pipe4_xPos, y: windowHeight * 0.55 }, { height: 15, width: windowWidth * 0.2 }),
        Obstacle5: Obstacle(world, 'Obstacle5', 'red', { x: pipe5_xPos, y: windowHeight * 0.65 }, { height: 15, width: windowWidth * 0.2 }),
        Obstacle6: Obstacle(world, 'Obstacle6', 'blue', { x: pipe6_xPos, y: windowHeight * 0.75 }, { height: 15, width: windowWidth * 0.2 }),
        Obstacle7: Obstacle(world, 'Obstacle7', 'green', { x: pipe7_xPos, y: windowHeight * 0.85 }, { height: 15, width: windowWidth * 0.2 }),
        Obstacle8: Obstacle(world, 'Obstacle8', 'blue', { x: pipe8_xPos, y: windowHeight * 0.95 }, { height: 15, width: windowWidth * 0.2 }),
        Floor: Floor(world, 'black', { x: windowWidth / 2, y: windowHeight * 0.95 }, { height: windowHeight * 0.1, width: windowWidth })
        
    }
}