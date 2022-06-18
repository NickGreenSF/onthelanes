import { GameProps } from "../types"

export default function GameChart(props: {game: GameProps}){
    return <div>{props.game.score}</div>
}