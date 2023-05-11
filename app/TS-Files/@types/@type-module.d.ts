// @Type attachment to remove ts errors on the window object for bridge between preload and renderer
// https://www.youtube.com/watch?v=2gNc_3YyYqk&ab_channel=tylerlaceby
// TODO, find a way to place the d.ts file in a dedicated folder.
import {API} from "../backend/preload"

declare global  {
    interface Window {API: typeof API}
}