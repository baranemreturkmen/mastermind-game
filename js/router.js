/*
    Simple Router solution for the SPA
    @author Binnur Kurt <binnur.kurt@gmail.com>
 */
export class Router {
    constructor(routing) {
        this.routing = routing;
    }

    route = (next) => {
        window.location.href = this.routing[next];
    }
}