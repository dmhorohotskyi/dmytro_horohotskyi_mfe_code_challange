export default class EventHandler {
    static events = {}

    static subscribeToEvent(event, callback) {
        if(!EventHandler.events[event]) {
            EventHandler.events[event] = []
        }
        EventHandler.events[event].push(callback)
    }

    static triggerEvent(event, params) {
        if(!EventHandler.events[event]) return;
        EventHandler.events[event].forEach(callback => {
            if(callback) {
                callback(event, params)
            }
        })
    }
}